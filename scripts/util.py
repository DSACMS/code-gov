import json
from datetime import datetime

def merge_indexes(data,existing_file):
    try:
        with open(existing_file, 'r', encoding='utf-8') as file:
            existing_data = json.load(file)
        
        existing_releases = existing_data.get('releases', [])
        new_releases = data.get('releases', [])
        
        existing_repos = set()
        unique_new_releases = []

        for release in existing_releases:
            repo_url = release.get('repositoryURL')
            if repo_url:
                existing_repos.add(repo_url)

        for release in new_releases:
            repo_url = release.get('repositoryURL')
            if repo_url not in existing_repos:
                unique_new_releases.append(release)
        
        merged_releases = existing_releases + unique_new_releases
        data['releases'] = merged_releases
        
    except Exception as e:
        print(f"Failed to read existing file: {e}")
        raise e


def which_code_json_is_most_up_to_date(*args):

    sorted_code_json_list = sorted(
        args,
        key=lambda d : datetime.strptime(
            d['date']['metadataLastUpdated'],'%Y-%m-%d'
            ),
        reverse=True)
    return sorted_code_json_list[0]