const fs = require('fs')
const path = require('path')
const codegov = require('../codegov.json');
// const { measureMemory } = require('vm');
// const { release, platform } = require('os');

module.exports = function() {
    const initialData = Object.values(codegov)
    const agencyData = initialData.map(agency => {
        return {
            agency: agency.agency,
            // orgs: agency.orgs,
            version: agency.version,
            measurementType: agency.measurementType.method,
            releases: agency.releases.map(release => {
                return {
                    organization: release.organization,
                    name: release.name,
                    description: release.description,
                    longDescription: release.longDescription,
                    status: release.status,
                    licenseName: release.permissions.license[0].name,
                    licenseURL: release.permissions.license[0].URL,
                    usageType: release.permissions.usageType,
                    exemptionText: release.permissions.exemptionText,
                    repositoryURL: release.repositoryURL,
                    vcs: release.vcs,
                    laborHours: release.laborHours,
                    platforms: release.platforms.map(platform => platform),
                    categories: release.categories.map(category => category),
                    softwareType: release.softwareType,
                    languages: release.languages.map(language => language),
                    maintenance: release.maintenance,
                    dateCreated: release.date.created,
                    dateLastModified: release.date.lastModified,
                    dateMetaLastUpdated: release.date.metaDataLastUpdated,
                    tags: release.tags.map(tag => tag),
                    contactEmail: release.contact.email,
                    contactName: release.contact.name,
                    localisation: release.localisation,
                    repositoryType: release.repositoryType,
                    userInput: release.userInput,
                    fismaLevel: release.fismaLevel,
                    group: release.group,
                    subsetInGovernment: release.subsetInGovernment,
                    userType: release.usageType,
                    repositoryHost: release.repositoryHost,
                    maturityModelTier: release.maturityModelTier,
                    projectType: release.projectType
                }
            
            })
        }
    })

   return agencyData
};