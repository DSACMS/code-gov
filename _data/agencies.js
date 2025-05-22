const data = require('./mockData.json');
// const data = require('../code.json');

module.exports = function() {
    console.log({data})
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