from .pull_legacy_assets import agencies_links, headers, add_directories_to_directory, add_indexes_to_directory
from .pull_legacy_assets import main as legacy_pull_function
from .pull_public_assets import main as public_pull_function

def main():
    legacy_pull_function()
    public_pull_function()


if __name__ == "__main__":
    main()
    