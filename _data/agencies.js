const data = require('./mockData.json');

module.exports = function() {
    return Object.values(data).map((agency) => ({
        name: agency.agency,
        version: agency.version,
        projects: agency.releases.map(release => ({
            organization: release.organization,
            name: release.name,
            description: release.description,
            longDescription: release.description,
            status: release.status,
            repositoryURL: release.repositoryURL
        }))
    }))
}