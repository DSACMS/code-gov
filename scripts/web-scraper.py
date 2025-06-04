import requests
import json

agencies_links = {
    "Department of Agriculture": "https://usda.gov/code.json",
    # "Department of Commerce": "https://www.commerce.gov/code.json",
    "Department of Defense": "https://www.code.mil/code.json",
    # "Department of Education": "https://ed.gov/code.json",
    "Department of Energy": "https://www.energy.gov/code.json",
    "Department of Health and Human Services": "https://www.hhs.gov/code.json",
    # "Department of Housing and Urban Development": "https://www.hud.gov/code.json",
    "Department of Homeland Security": "https://www.dhs.gov/code.json",
    # "Department of Justice": "https://www.justice.gov/d9/code.json",
    # "Department of Labor": "https://www.dol.gov/code.json",
    # "Department of Transportation": "https://www.transportation.gov/code.json",
    "Department of Treasury": "https://www.treasury.gov/code.json",
    "Department of Veterans Affairs": "https://www.va.gov/code.json",
    "Environmental Protection Agency": "https://www.epa.gov/code.json",
    # "National Aeronautics and Space Administration": "https://code.nasa.gov/code.json",
    # "Agency for International Development": "https://www.usaid.gov/code.json",
    # "General Services Administration": "https://www.gsa.gov/code.json",
    "National Science Foundation": "https://www.nsf.gov/code.json",
    # "Office of Personnel Management": "https://www.opm.gov/code.json",
    # "Small Business Administration": "https://www.sba.gov/code.json",
    "Social Security Administration": "https://www.ssa.gov/code.json",
    "Federal Election Commission": "https://www.fec.gov/code.json"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json, text/plain, */*',
}

file_path = "../legacy-codegov.json"
legacy_codegov = {}

try:
    for agency, link in agencies_links.items():
        response = requests.get(link, headers = headers)
    
        print(agency)
        print(f"Status code: {response.status_code}")
    
        if response.status_code == 200:
            print("Data received:", len(response.text))
            data = response.json()
            legacy_codegov[agency] = data["releases"]
        else:
            print("Error message from API:", response.text)

        print("\n")
        
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")

try:
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(legacy_codegov, file, indent=4, ensure_ascii=False)
except Exception as e: 
    print(f"Failed to save JSON file: {e}")

print(legacy_codegov)