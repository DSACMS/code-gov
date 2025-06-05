import requests
import json
import os
from util import merge_indexes

# the commented out links are not valid or cant be found
agencies_links = {
    "DoA": "https://usda.gov/code.json",
    # "Department of Commerce": "https://www.commerce.gov/code.json",
    "DoD": "https://www.code.mil/code.json",
    # "Department of Education": "https://ed.gov/code.json",
    "DoE": "https://www.energy.gov/code.json",
    "HHS": "https://www.hhs.gov/code.json",
    # "Department of Housing and Urban Development": "https://www.hud.gov/code.json",
    "DHS": "https://www.dhs.gov/code.json",
    # "Department of Justice": "https://www.justice.gov/d9/code.json",
    # "Department of Labor": "https://www.dol.gov/code.json",
    # "Department of Transportation": "https://www.transportation.gov/code.json",
    "DoT": "https://www.treasury.gov/code.json",
    "VA": "https://www.va.gov/code.json",
    "EPA": "https://www.epa.gov/code.json",
    # "National Aeronautics and Space Administration": "https://code.nasa.gov/code.json",
    # "Agency for International Development": "https://www.usaid.gov/code.json",
    # "General Services Administration": "https://www.gsa.gov/code.json",
    "NSF": "https://www.nsf.gov/code.json",
    # "Office of Personnel Management": "https://www.opm.gov/code.json",
    # "Small Business Administration": "https://www.sba.gov/code.json",
    "SSA": "https://www.ssa.gov/code.json",
    "FEC": "https://www.fec.gov/code.json"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json, text/plain, */*',
}

def add_directories_to_directory(data, agency_name):
    directory_name = f"agency-indexes/{agency_name}"

    try:
        if not os.path.exists(directory_name):
            os.mkdir(directory_name)
        else:
            print("Directory already exists!")
    except Exception as e:
        print(f"Failed to create directory for {agency_name}: {e}")

    try:
        for item in data:
            safe_name = item['name'].replace('/', '_').replace('(', '_').replace(')', '_').replace(' ', '_')
            file_path = os.path.join(directory_name, f"{safe_name}.json")

            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(item, file, indent = 4)
    except Exception as e:
        print(f"Failed to add files to {agency_name} directory: {e}")


def add_indexes_to_directory(data, agency_name):
    file_name = f"agency-indexes/{agency_name}-index.json"

    if os.path.exists(file_name):
        try:
            merge_indexes(data,file_name)
        except Exception as e:
            print("Failed to merge existing file with new data!")
            print(e)

    try:
        with open(file_name, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent = 4)
    except Exception as e: 
        print(f"Failed to save JSON file: {e}")

def main():
    try:
        for agency, link in agencies_links.items():
            response = requests.get(link, headers = headers)
    
            # print(agency)
            # print(f"Status code: {response.status_code}")
    
            if response.status_code == 200:
                # print("Data received:", len(response.text))
                data = response.json()

                add_indexes_to_directory(data, agency)
                add_directories_to_directory(data["releases"], agency)
            else:
                print("Error message from API:", response.text)

            # print("\n")
        
    except Exception as e:
        print(f"Function failed: {e}")
        return

if __name__ == "__main__":
    main()

# merging logic
# once we have the legacy files pulled, they need to be stored in three places
# 1. the agency-index file as a whole lives in the agency-index directory
# 2. a directory with the agency name that contains all the repos from the agency index
# 3. within the codegov.json where they will be merged all together 



