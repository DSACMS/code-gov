<!--- # NOTE: Modify sections marked with `TODO` -->

# How to Contribute

<!-- Basic instructions about where to send patches, check out source code, and get development support.-->

We're so thankful you're considering contributing to an [open source project of
the U.S. government](https://code.gov/)! If you're unsure about anything, just
ask -- or submit the issue or pull request anyway. The worst that can happen is
you'll be politely asked to change something. We appreciate all friendly
contributions.

We encourage you to read this project's CONTRIBUTING policy (you are here), its
[LICENSE](LICENSE.md), and its [README](README.md).

## Getting Started

<!--- TODO: If you have 'good-first-issue' or 'easy' labels for newcomers, mention them here.-->

### Team Specific Guidelines

<!-- TODO: This section helps contributors understand any team structure in the project (formal or informal.) Encouraged to point towards the MAINTAINERS.md file for further details.-->
This repository is maintained by the [Digital Services at CMS (DSACMS)](https://github.com/dsacms).  
For details on contributors, see [COMMUNITY.md](COMMUNITY.md).

### Building dependencies

<!--- TODO: This step is often skipped, so don't forget to include the steps needed to install on your platform. If you project can be multi-platform, this is an excellent place for first time contributors to send patches!-->
To install dependencies:

```bash
git clone https://github.com/dsacms/code-gov.git
cd code-gov
npm install
```

### Building the Project

<!--- TODO: Be sure to include build scripts and instructions, not just the source code itself! -->
To build locally:
```bash
npm run build
```

For local development with hot reload:
```bash
npm start
```

### Workflow and Branching

We follow the [GitHub Flow Workflow](https://guides.github.com/introduction/flow/)

1.  Fork the project
2.  Check out the `main` branch
3.  Create a feature branch
4.  Write code and tests for your change
5.  From your branch, make a pull request against `dsacms/code-gov/main`
6.  Work with repo maintainers to get your change reviewed
7.  Wait for your change to be pulled into `dsacms/code-gov/main`
8.  Delete your feature branch

<!--- TODO
### Testing Conventions

 TODO: Discuss where tests can be found, how they are run, and what kind of tests/coverage strategy and goals the project has. -->

### Coding Style and Linters

We enforce consistent coding style with automated tools:

1. Code must follow [Prettier](https://prettier.io/) formatting
2. Linting is enforced with [ESLint](https://eslint.org/)
3. Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Before submitting run:

```bash
npm run lint
npm run format
```

### Writing Issues

When creating an issue, please use the format providede with our issue templates.

### Writing Pull Requests

Pull requests should:

Be filed against the main branch.

Include a clear description of the problem, solution, and result.

Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines noted above.

See our [pull request template](.github/PULL_REQUEST_TEMPLATE.md) for more

## Reviewing Pull Requests

Pull requests are reviewed by the maintainers listed in [COMMUNITY.md](./COMMUNITY.md).
Reviews may include feedback on style, functionality, security, and documentation.

<!--
## Shipping Releases

Our general policy for shipping releases can be found in our [MAINTAINERS.md](./MAINTAINERS.md) file. We adhere to semantic versioning and automatic generation of changelogs as described in this file.

<!-- TODO: What cadence does your project ship new releases? (e.g. one-time, ad-hoc, periodically, upon merge of new patches) Who does so?
-->

## Documentation


We also welcome improvements to the project documentation or to the existing
docs. Please file an [issue](https://github.com/DSACMS/code-gov/issues).


## Policies

### Open Source Policy

We adhere to the [CMS Open Source
Policy](https://github.com/CMSGov/cms-open-source-policy). If you have any
questions, just [shoot us an email](mailto:opensource@cms.hhs.gov).

### Security and Responsible Disclosure Policy

_Submit a vulnerability:_ Vulnerability reports can be submitted through [Bugcrowd](https://bugcrowd.com/cms-vdp). Reports may be submitted anonymously. If you share contact information, we will acknowledge receipt of your report within 3 business days.

For more information about our Security, Vulnerability, and Responsible Disclosure Policies, see [SECURITY.md](SECURITY.md).

## Public domain

This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0 dedication. By submitting a pull request or issue, you are agreeing to comply with this waiver of copyright interest.
