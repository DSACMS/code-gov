const codegov = require('../codegov.json');

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
                vcs: release.vcs,
                repositoryType: release.repositoryType,
                repositoryHost: release.repositoryHost,
                platforms: release.platforms || [],
                categories: release.categories || [],
                languages: release.languages || [],
                tags: release.tags || [],
                softwareType: release.softwareType,
                license: {
                    name: release.permissions?.license?.[0]?.name,
                    url: release.permissions?.license?.[0]?.URL
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
                projectType: release.projectType
            });
        });
    });

    return {
        agencies,
        projects,
        filters: {
            organizations: Array.from(organizations).sort(),
            categories: Array.from(allCategories).sort(),
            languages: Array.from(allLanguages).sort(),
            platforms: Array.from(allPlatforms).sort(),
            tags: Array.from(allTags).sort(),
            statuses: ['Production', 'Development', 'Archival'],
            fismaLevels: ['Low', 'Moderate', 'High'],
            usageTypes: ['openSource'],
            maturityTiers: [0, 1, 2, 3, 4]
        }
    }
};
