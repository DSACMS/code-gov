const codegov = require('../codegov.json');
const legacyCodegov = require('../legacy-codegov.json')

module.exports = function() {
    const agencies = [];
    const projects = [];
    const organizations = new Set();
    const allCategories = new Set();
    const allLanguages = new Set();
    const allPlatforms = new Set();
    const allTags = new Set();

    Object.entries(codegov).forEach(([agencyCode, agencyData]) => {
        const agencyOrgs = [...new Set(agencyData.releases.map(release => release.organization))];
        
        agencies.push({
            code: agencyCode,
            name: agencyData.agency,
            version: agencyData.version,
            measurementType: agencyData.measurementType.method,
            organizations: agencyOrgs,
            projectCount: agencyData.releases.length,
            totalLaborHours: agencyData.releases.reduce((acc, curr) => acc + (curr.laborHours  || 0), 0)
        });

        agencyData.releases.forEach(release => {
            organizations.add(release.organization);
            release.categories?.forEach(category => allCategories.add(category));
            release.languages?.forEach(language => allLanguages.add(language));
            release.platforms?.forEach(platform => allPlatforms.add(platform));
            release.tags?.forEach(tag => allTags.add(tag));

            projects.push({
                agencyCode,
                agencyName: agencyData.agency,
                organization: release.organization,
                name: release.name,
                description: release.description,
                longDescription: release.longDescription,
                status: release.status,
                repositoryURL: release.repositoryURL,
                homepageURL: release.homepageURL || null,
                vcs: release.vcs,
                repositoryType: release.repositoryType,
                repositoryHost: release.repositoryHost,
                platforms: release.platforms || [],
                categories: release.categories || [],
                languages: release.languages || [],
                tags: release.tags || [],
                softwareType: release.softwareType,
                license: {
                    name: release.permissions?.license?.[0]?.name || release.permissions?.licenses?.[0]?.name,
                    url: release.permissions?.license?.[0]?.URL || release.permissions?.licenses?.[0]?.URL
                },
                usageType: release.permissions?.usageType,
                exemptionText: release.permissions?.exemptionText,
                laborHours: release.laborHours || 0,
                dates: {
                    created: release.date?.created,
                    lastModified: release.date?.lastModified,
                    metaDataLastUpdated: release.date?.metaDataLastUpdated
                },
                contact: {
                    email: release.contact?.email,
                    name: release.contact?.name
                },
                maintenance: release.maintenance,
                localisation: release.localisation,
                userInput: release.userInput,
                fismaLevel: release.fismaLevel,
                group: release.group,
                subsetInGovernment: release.subsetInGovernment,
                userType: release.usageType,
                maturityModelTier: release.maturityModelTier,
                projectType: release.projectType,
                relatedCode: release.relatedCode || [],
                downloadURL: release.downloadURL || null
            });
        });
    });

    Object.entries(legacyCodegov).forEach(([agencyName, releases]) => {
        const agencyOrgs = [...new Set(releases.map(release => release.organization))];

        const existingAgency = agencies.find(agency => agency.name === agencyName);
        if (!existingAgency) {
            agencies.push({
                code: agencyName,
                name: agencyName,
                version: "1.0.0",
                measurementType: "Projects",
                organizations: agencyOrgs,
                projectCount: releases.length,
                totalLaborHours: releases.reduce((acc, curr) => acc + (curr.laborHours  || 0), 0)
            });
        }

        releases.forEach(release => {
            organizations.add(release.organization);
            release.categories?.forEach(category => allCategories.add(category));
            release.platforms?.forEach(platform => allPlatforms.add(platform));
            release.tags?.forEach(tag => allTags.add(tag));
            
            if (release.languages) {
                if (Array.isArray(release.languages)) {
                    release.languages?.forEach(language => language && allLanguages.add(language));
                } else if (typeof release.language === 'string') {
                    allLanguages.add(release.languages)
                }
            }


            projects.push({
                agencyCode: agencyName,
                agencyName: agencyName,
                organization: release.organization,
                name: release.name,
                description: release.description,
                longDescription: release.longDescription || release.description,
                status: release.status,
                repositoryURL: release.repositoryURL,
                homepageURL: release.homepageURL || null,
                vcs: release.vcs,
                repositoryType: release.repositoryType || null,
                repositoryHost: release.repositoryHost || null,
                platforms: release.platforms || [],
                categories: release.categories || [],
                languages: release.languages || [],
                tags: release.tags || [],
                softwareType: release.softwareType || null,
                license: {
                    name: release.permissions?.licenses?.[0]?.name || release.permissions?.license?.[0]?.name,
                    url: release.permissions?.licenses?.[0]?.URL || release.permissions?.license?.[0]?.URL
                },
                usageType: release.permissions?.usageType,
                exemptionText: release.permissions?.exemptionText || null,
                laborHours: release.laborHours || 0,
                dates: {
                    created: release.date?.created,
                    lastModified: release.date?.lastModified,
                    metaDataLastUpdated: release.date?.metaDataLastUpdated
                },
                contact: {
                    email: release.contact?.email,
                    name: release.contact?.name
                },
                maintenance: release.maintenance || null,
                localisation: release.localisation || null,
                userInput: release.userInput || null,
                fismaLevel: release.fismaLevel || null,
                group: release.group || null,
                subsetInGovernment: release.subsetInGovernment || null,
                userType: release.usageType || null,
                maturityModelTier: release.maturityModelTier || null,
                projectType: release.projectType || null,
                relatedCode: release.relatedCode || [],
                downloadURL: release.downloadURL || null
            });
        });
    })
    
    return {
        agencies,
        projects,
        filters: {
            organizations: Array.from(organizations).sort(),
            categories: Array.from(allCategories).sort(),
            languages: Array.from(allLanguages).sort(),
            platforms: Array.from(allPlatforms).sort(),
            tags: Array.from(allTags).sort(),
            statuses: ['Production', 'Development', 'Archival', 'Beta', 'Ideation',
                'Release Candidate', 'Alpha v0.11 (Prototype)'],
            fismaLevels: ['Low', 'Moderate', 'High'],
            usageTypes: ['openSource', 'exemptByLaw', 'exemptByAgencySystem', 'exemptByAgencyMission',
                'governmentWideReuse', 'exemptByNationalSecurity', ],
            maturityTiers: [0, 1, 2, 3, 4]
        }
    }
};
