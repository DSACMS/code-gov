const fs = require("fs").promises
const path = require('path')

const CONFIG = {
  agencyDirectory: path.resolve(__dirname, "../agency-indexes"),
  outputFile: path.resolve(__dirname, "../codegov.json"),
}


async function getLegacyJSONs() {
  // we dont have acccess to pull the data from the API so i think the best way to do this
  // is to put all the legacy-index.jsons into one and then have it live within this repo
  // we then pull the data from that and merge the two with the function below
  // doesnt make sense to web scrape a thing we'll technically need to read only once
}

async function mergeJSONs() {

}

// updateCodeGov() was made pretty non modular but this could be changed at a later time. 
// focused on the fact that the agencyDirectory will always contain jsons with the same name convention 

// updates the codegov.json file with new data found from ./agency-indexes
async function updateCodeGov() {
  try {
    let updatedJSON = {}
    let legacyJSON = {}
    let finalJSON = {}

    // read all files in the directory
    const allFiles = await fs.readdir(CONFIG.agencyDirectory, { withFileTypes: true })
    const filenames = allFiles.filter(file => file.isFile()).map(file => file.name)
    
    // we know that the directory will only contain json files so dont need to check for non jsons
    for (const file of filenames) {
      const filePath = path.join( CONFIG.agencyDirectory, file)
      
      try {
        const content = await fs.readFile(filePath, "utf-8")
        const jsonData = JSON.parse(content)
        
        // store the agency name only for readability in codegov.json 
        const agencyName = file.split("_")[0]

        updatedJSON[agencyName] = jsonData
        console.log(`✅ Successfully processed: ${file}`)
      } catch (error) {
        console.error(`❌ Error processing file: ${file}`, error)
      }
    }
    
    legacyJSON = getLegacyJSONs()
    finalJSON = mergeJSONs()

    // actually update the codegov.json file
    const jsonString = JSON.stringify(updatedJSON, null, 2) 
    await fs.writeFile(CONFIG.outputFile, jsonString)
    
    return finalJSON 
  } catch (error) {
    console.error("❌ Failed to update codegov.json:", error)
  }
}

updateCodeGov()

// we store the two piles of agency-index.jsons into sepereate categories, legacy and updated 
// we already have the functioanlity to store the updated, we need to get a way to store the legacy via API
// once we retireved the legacy age agency-index.jsons, we put it into its own json, the legacy-codegov.json
// we now have two codegov.jsons, legacy- and updated-
// we now need to merge these two jsons in a way where there are no duplicate repos or agencies 
// not sure if a shallow merge will even work because of the duplication handling 