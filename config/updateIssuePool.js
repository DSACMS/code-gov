const fs = require('fs').promises
const path = require('path')

const CONFIG = {
    repoFilePath: path.resolve(__dirname, '../codegov.json'),
    issueFilePath: path.resolve(__dirname, '../issue-pool.json'),
    regex: /https?:\/\/github\.com\/([^/]+)\/([^/]+)/,
    githubToken: process.env.GITHUB_TOKEN,
    requiredLabel: 'code-gov',
    concurrentRepos: 6,  // processing 6 repos at once but need to find the sweetspot because at this rate, it takes 18 minutes for the entire script to run through codegov.json. the "bathtub curve" is what we have here and what we need to experiment with and solve 👀
    rateLimitRemaining: 5000,
    rateLimitReset: Date.now
}

// #region - Helper Functions
const getHeaders = () => {
    const HEADERS = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CodeGov-Issue-Pool-Updater',
        'Authorization': `token ${CONFIG.githubToken}`
    }
    return HEADERS
}

async function fetchWithRateLimit(url, options = {}) {
    if (CONFIG.rateLimitRemaining <= 10 && Date.now() < CONFIG.rateLimitReset) {
        const waitTime = CONFIG.rateLimitReset - Date.now() + 1000 // add 1 second buffer
        console.log(`Rate limit low (${CONFIG.rateLimitRemaining} remaining). Waiting ${Math.round(waitTime/1000)}s...`)
        await new Promise((resolve) => {
            setTimeout(resolve, waitTime)
        })
    }

    const response = await fetch(url, options)
    
    const remainingHeader = response.headers.get('X-RateLimit-Remaining')
    const resetHeader = response.headers.get('X-RateLimit-Reset')
    
    if (remainingHeader) CONFIG.rateLimitRemaining = parseInt(remainingHeader, 10)
    if (resetHeader) CONFIG.rateLimitReset = parseInt(resetHeader, 10) * 1000
    
    return response
}

async function getRepoInfo() { // dont know how i feel about this double loop setup...
    const repoInfo = []

    try {
        const content = await fs.readFile(CONFIG.repoFilePath, 'utf-8') 
        const jsonData = JSON.parse(content)

        Object.values(jsonData).forEach((agency) => {
            if (!agency.releases) {
                return
            }

            agency.releases.forEach((organization) => {
                if (!organization.repositoryURL) {
                    return
                }

                const match = organization.repositoryURL.match(CONFIG.regex)

                if (match) {
                    const [, owner, repo] = match

                    repoInfo.push({
                        ownerName: owner,
                        repoName: repo
                    })
                } else {
                    console.warn(`No match found for URL: ${organization.repositoryURL}`)
                }
            })
        })
    } catch (error) {
        console.error('Error in getting repo information:', error)
    }

    // console.log(repoInfo)
    return repoInfo
}

function daysBetween(date1, date2) {
    const diffTime = Math.abs(date2 - date1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function checkLabelKeywords(labels, keywords) {
    return labels.some(label =>
        keywords.some(keyword =>
            label.name.toLowerCase().includes(keyword.toLowerCase())
        )
    )
}

function transformIssue(issue, repo, repoLanguage) {
    const now = new Date()
    const createdDate = new Date(issue.created_at)
    const updatedDate = new Date(issue.updated_at)

    const labelNames = issue.labels.map(label => label.name)

    return {
        id: String(issue.id),
        number: issue.number,
        url: issue.html_url,
        content_title: issue.title || '',
        content_description: issue.body || '',
        repo_name: repo.repoName,
        repo_url: `https://github.com/${repo.ownerName}/${repo.repoName}`,
        repo_language: repoLanguage || '',
        repo_owner: repo.ownerName,
        status_is_open: issue.state === 'open',
        status_has_assignee: issue.assignee !== null,
        status_is_locked: issue.locked,
        time_created_date: issue.created_at,
        time_last_updated: issue.updated_at,
        time_days_old: daysBetween(createdDate, now),
        time_last_activity_days_ago: daysBetween(updatedDate, now),
        people_author: issue.user?.login || '',
        people_assignee: issue.assignee?.login || null,
        people_author_type: issue.user?.type || '',
        labels_list: labelNames,
        labels_count: labelNames.length,
        labels_has_priority: checkLabelKeywords(issue.labels, ['priority', 'p0', 'p1', 'p2', 'urgent']),
        labels_has_difficulty: checkLabelKeywords(issue.labels, ['difficulty', 'easy', 'medium', 'hard', 'beginner']),
        engagement_comment_count: issue.comments || 0,
        engagement_reaction_count: issue.reactions?.total_count || 0,
        engagement_score: (issue.comments || 0) + (issue.reactions?.total_count || 0),
        flags_is_beginner_friendly: checkLabelKeywords(issue.labels, ['beginner', 'good first issue', 'easy', 'starter']),
        flags_needs_help: checkLabelKeywords(issue.labels, ['help wanted', 'needs help', 'assistance']),
        flags_is_bug: checkLabelKeywords(issue.labels, ['bug', 'defect', 'error']),
        flags_is_feature: checkLabelKeywords(issue.labels, ['feature', 'enhancement', 'feature request']),
        flags_is_stale: checkLabelKeywords(issue.labels, ['stale', 'wontfix', 'abandoned'])
    }
}

async function processSingleRepository(repo, headers) {
    const repoIssues = {}
    
    try {
        const repoUrl = `https://api.github.com/repos/${repo.ownerName}/${repo.repoName}`
        const repoResponse = await fetchWithRateLimit(repoUrl, { headers })

        if (!repoResponse.ok) {
            console.error(`Failed to fetch repo info for ${repo.ownerName}/${repo.repoName}: ${repoResponse.status}`)
            return repoIssues
        }

        const repoData = await repoResponse.json()
        const repoLanguage = repoData.language || ''

        const fetchIssuePage = async (page) => {
            const issuesUrl = `https://api.github.com/repos/${repo.ownerName}/${repo.repoName}/issues?page=${page}&per_page=100&state=open&labels=${CONFIG.requiredLabel}`
            const issuesResponse = await fetchWithRateLimit(issuesUrl, { headers })

            if (!issuesResponse.ok) {
                console.error(`Failed to fetch issues for ${repo.ownerName}/${repo.repoName}: ${issuesResponse.status}`)
                return
            }

            const issues = await issuesResponse.json()
            
            // endpoint always returns both issues and pull requests so we ignore the PRs
            issues.forEach((issue, index) => {
                if (issue.pull_request) {
                    return
                }

                const transformedIssue = transformIssue(issue, repo, repoLanguage)
                repoIssues[transformedIssue.id] = transformedIssue // is having the ID is the best key name?
                console.log(`✅ Processed ${index + 1}/${issues.length}: ${repo.ownerName}/${repo.repoName}`)
            })

            if (issues.length === 100) {
                await fetchIssuePage(page + 1)
            }
        }

        await fetchIssuePage(1)
    } catch (error) {
        console.error(`❌ Error processing ${repo.ownerName}/${repo.repoName}:`, error)
    }

    return repoIssues
}

// #region - Main Function
async function updateIssuePool() {
    const issuePool = {}
    const repoInfo = await getRepoInfo()
    const headers = getHeaders()

    // process repositories in chunks of 3 for parallel processing
    const chunkCount = Math.ceil(repoInfo.length / CONFIG.concurrentRepos)
    const chunks = Array.from({ length: chunkCount }, (_, index) => {
        const start = index * CONFIG.concurrentRepos
        return repoInfo.slice(start, start + CONFIG.concurrentRepos)
    })

    await chunks.reduce(async (previousChunk, chunk, index) => {
        await previousChunk
        console.log(`Processing chunk ${index + 1}/${chunks.length} (${chunk.length} repos)`)

        const chunkPromises = chunk.map((repo) => processSingleRepository(repo, headers))
        const chunkResults = await Promise.allSettled(chunkPromises)

        chunkResults.forEach((result, resultIndex) => {
            if (result.status === 'fulfilled') {
                Object.assign(issuePool, result.value)
            } else {
                console.error(`Failed ${chunk[resultIndex].ownerName}/${chunk[resultIndex].repoName}:`, result.reason)
            }
        })

        if (index + 1 < chunks.length) {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })
        }
    }, Promise.resolve())

    try {
        await fs.writeFile(CONFIG.issueFilePath, JSON.stringify(issuePool, null, 2))
        console.log('Successfully saved issues!')
    } catch (error) {
        console.error('Error saving issue pool:', error)
    }

    return issuePool
}

// getRepoInfo()
updateIssuePool()
