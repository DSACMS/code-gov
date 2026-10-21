const fs = require('fs').promises
const path = require('path')

const CONFIG = {
  codegovFile: path.resolve(__dirname, '../codegov.json'),
  legacyFile: path.resolve(__dirname, '../legacy-codegov.json'),
  outputFile: path.resolve(__dirname, '../gov-code.json')
}

// combines codegov.json and legacy-codegov.json into one dataset keyed by agency
// output follows the codegov.json shape: { [agency]: { agency, version, measurementType, releases } }
async function combineCodeGov() {
  try {
    const codegov = JSON.parse(await fs.readFile(CONFIG.codegovFile, 'utf-8'))
    const legacyCodegov = JSON.parse(await fs.readFile(CONFIG.legacyFile, 'utf-8'))

    const combinedJSON = {}

    Object.entries(codegov).forEach(([agencyCode, agencyData]) => {
      combinedJSON[agencyCode] = {
        ...agencyData,
        releases: [...(agencyData.releases || [])]
      }
    })

    // legacy data is { [agency]: releases[] }, so wrap it to match codegov.json
    Object.entries(legacyCodegov).forEach(([agencyName, releases]) => {
      if (!combinedJSON[agencyName]) {
        combinedJSON[agencyName] = {
          agency: agencyName,
          version: '1.0.0',
          measurementType: { method: 'projects' },
          releases: []
        }
      }

      // skip legacy releases already present in the scraped data
      const existingRepos = new Set(
        combinedJSON[agencyName].releases.map(release => release.repositoryURL).filter(Boolean)
      )

      releases.forEach(release => {
        if (!release.repositoryURL || !existingRepos.has(release.repositoryURL)) {
          combinedJSON[agencyName].releases.push(release)
        }
      })

      console.log(`✅ Successfully combined: ${agencyName}`)
    })

    const jsonString = JSON.stringify(combinedJSON, null, 2)
    await fs.writeFile(CONFIG.outputFile, jsonString)

    return combinedJSON
  } catch (error) {
    console.error('❌ Failed to create gov-code.json:', error)
    return null
  }
}

combineCodeGov()
