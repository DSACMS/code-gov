import json
import os

from codejson_index_generator import IndexGenerator
from util import merge_indexes, which_code_json_is_most_up_to_date

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

                    print(repo.split("github.com/")[1])
                    try:
                        repo_obj = indexGen.github.get_repo(repo.split("github.com/")[1])
                        
                    except:
                        print("Could not retrieve Repo with API query")
                        continue

                    repoPath = os.path.join(agency_subdir, (repo_obj.name + '.json'))

                    code_json = indexGen.get_code_json(repo_obj)


                    if code_json:
                        print(f"✅ Found code.json in {repo}")

                        if os.path.exists(repoPath):
                            try:
                                with open(repoPath, 'r', encoding='utf-8') as file:
                                    existing_code_json = json.load(file)
                                
                                code_json = which_code_json_is_most_up_to_date(code_json,existing_code_json)
                            except Exception:
                                print("could not open existing codejson File!")

                        with open(repoPath, 'w') as f:
                            json.dump(code_json,f,indent=2)

                        indexGen.update_index(indexGen.index,code_json,repo_obj.organization, repo_obj.name)
                    else:
                        print(f"❌ No code.json found in {repo}")
            except Exception as e:
                print(e)


            path_to_save = os.path.join(AGENCY_CODEJSON_DIR, agency + "-index.json")

            #Merge with existing data.
            if os.path.exists(path_to_save):
                merge_indexes(indexGen.index,path_to_save)
            
            indexGen.save_index(path_to_save)
            print(f"\nIndexing complete. Results saved to {AGENCY_CODEJSON_DIR}")
        
    except Exception as e:
        print(f"Error: {e}")
        return

if __name__ == "__main__":
    main()