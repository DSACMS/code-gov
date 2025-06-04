import json
import os

from codejson_index_generator import IndexGenerator

AGENCY_CODEJSON_DIR = "agency-indexes"
VERSION = '0.0.1'

def main():
    

    with open('repo-manifest.json','r') as file:
        codegovDict = json.load(file)

    github_key = os.getenv("GITHUB_TOKEN")

    try:
        os.mkdir(AGENCY_CODEJSON_DIR)
    except FileExistsError:
        print(f"File already exists: {AGENCY_CODEJSON_DIR}")

    try:
        for agency in codegovDict.keys():

            
            indexGen = IndexGenerator(
                agency = agency,
                verison = VERSION, 
                token = github_key
            )

            agency_subdir = os.path.join(AGENCY_CODEJSON_DIR,agency)

            try:
                os.mkdir(agency_subdir)
            except FileExistsError:
                print(f"File already exists: {agency_subdir}")

            #orgs = codegovDict[agency]["orgs"]
            #for org in orgs:
            #    org = org.strip()
            #    indexGen.process_organization(org,add_to_index=True,codeJSONPath=agency_subdir)

            try:
                for id,repo in enumerate(codegovDict[agency],1):
                    print(f"\nChecking {repo} [{id}/{len(codegovDict[agency])}]")

                    repoPath = os.path.join(agency_subdir, (repo + '.json'))
                    repo_obj = indexGen.github.get_repo(repo.split("github.com/")[1])
                    code_json = indexGen.save_code_json(repo_obj)

                    if code_json:
                        print(f"✅ Found code.json in {repo}")
                        indexGen.update_index(indexGen.index,code_json,repo_obj.organization, repo_obj.name)
                    else:
                        print(f"❌ No code.json found in {repo}")
            except Exception as e:
                print(e)


            indexGen.save_index(os.path.join(AGENCY_CODEJSON_DIR, agency + "_index.json"))
            print(f"\nIndexing complete. Results saved to {AGENCY_CODEJSON_DIR}")
        
    except Exception as e:
        print(f"Error: {e}")
        return

if __name__ == "__main__":
    main()