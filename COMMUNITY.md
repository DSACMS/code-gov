# COMMUNITY.md

<!-- TODO: Who are the points of contact in your project who are responsible/accountable for the project? This can often be an engineering or design manager or leader, who may or may not be the primary maintainers of the project.

Roles to include, but not limited to: Project Owner, Technical Lead, Developers/Contributors, Community Manager, Security Team, Policy Advisor, Contracting Officer's Representative, Compliance Officer, Procurement Officer -->

ospo-guide is supported by a dedicated team of individuals fulfilling various roles to ensure its success, security, and alignment with government standards and agency goals.

| Role              | Name              | Affiliation                                    |
| :---------------- | :---------------- | :--------------------------------------------- |
| Open Source Lead  | Remy DeCausemaker | OSPO, Digital Service at CMS                   |
| Software Engineer | Natalia Luzuriaga | OSPO, Digital Service at CMS, US Digital Corps |
| Software Engineer | Isaac Milarsky    | OSPO, Digital Service at CMS, US Digital Corps |
| Software Engineer | Dinne Kopelevich  | OSPO, Digital Service at CMS, US Digital Corps |
| Software Engineer | Sachin Panayil    | OSPO, Digital Service at CMS, US Digital Corps |

<!-- TODO: A CODEOWNERS.md file is available in .github to define individuals responsible for specific parts of the codebase. Provide a reference to this file if used:

See [CODEOWNERS.md](.github/CODEOWNERS.md) for a list of those responsible for the code and documentation in this repository.
-->

See [Community Guidelines](#ospo-guide-open-source-community-guidelines) on principles and guidelines for participating in this open source project.

## Roles & Responsibilities

The members of ospo-guide community are responsible for guiding its development, ensuring quality standards, and fostering a collaborative environment. They play a vital role in making decisions about code contributions, handling releases, and ensuring the project meets its goals and objectives. Below is a list of the key members and their specific roles and responsibilities.

### Maintainers:

- @natalialuzuriaga
- @decause-gov

### Approvers:

- @natalialuzuriaga
- @decause-gov

### Reviewers:

- @IsaacMilarky
- @DinneK
- @sachin-panayil

| Roles      | Responsibilities                               | Requirements                                                                      | Defined by                                                |
| ---------- | :--------------------------------------------- | :-------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| member     | active contributor in the community            | multiple contributions to the project.                                            | PROJECT GitHub org Committer Team                         |
| reviewer   | review contributions from other members        | history of review and authorship in a sub-project                                 | COMMUNITY file reviewer entry, and GitHub Org Triage Team |
| approver   | approve accepting contributions                | highly experienced and active reviewer + contributor to a sub-project             | COMMUNITY file approver entry and GitHub Triage Team      |
| maintainer | set direction and priorities for a sub-project | demonstrated responsibility and excellent technical judgement for the sub-project | COMMUNITY file owner entry and GitHub Org Admin Team      |

<!-- TODO: If the repository's release process is outlined in CONTRIBUTING.md, provide a reference to it:

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details on the release process.
-->

## Contributors

<!-- TODO: A list of CONTRIBUTORS is generated below using contributors.yml located in the workflows directory. In order to automatically update the COMMUNITY.md, you must enter a secret into your Secrets and Variables under Actions within your repository settings. The name of the secret must be PUSH_TO_PROTECTED_BRANCH and the value must be a Personal Access Token with specific permissions. Please follow [this link](https://github.com/CasperWA/push-protected?tab=readme-ov-file#notes-on-token-and-user-permissions) for more information. -->

Total number of contributors: <!--CONTRIBUTOR COUNT START--> 8 <!--CONTRIBUTOR COUNT END-->

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/natalialuzuriaga">
                    <img src="https://avatars.githubusercontent.com/u/29980737?v=4" width="100;" alt="natalialuzuriaga"/>
                    <br />
                    <sub><b>Natalia Luzuriaga</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/IsaacMilarky">
                    <img src="https://avatars.githubusercontent.com/u/24639268?v=4" width="100;" alt="IsaacMilarky"/>
                    <br />
                    <sub><b>Isaac Milarsky</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/DinneK">
                    <img src="https://avatars.githubusercontent.com/u/63877492?v=4" width="100;" alt="DinneK"/>
                    <br />
                    <sub><b>Dinne Kopelevich</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/aayatsali">
                    <img src="https://avatars.githubusercontent.com/u/157442886?v=4" width="100;" alt="aayatsali"/>
                    <br />
                    <sub><b>Aayat</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/sachin-panayil">
                    <img src="https://avatars.githubusercontent.com/u/79382140?v=4" width="100;" alt="sachin-panayil"/>
                    <br />
                    <sub><b>Sachin Panayil</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/decause-gov">
                    <img src="https://avatars.githubusercontent.com/u/107957201?v=4" width="100;" alt="decause-gov"/>
                    <br />
                    <sub><b>decause-gov</b></sub>
                </a>
            </td>
		</tr>
		<tr>
            <td align="center">
                <a href="https://github.com/NoobNoob06">
                    <img src="https://avatars.githubusercontent.com/u/108984067?v=4" width="100;" alt="NoobNoob06"/>
                    <br />
                    <sub><b>Keni</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/cms-eo14168">
                    <img src="https://avatars.githubusercontent.com/u/197958188?v=4" width="100;" alt="cms-eo14168"/>
                    <br />
                    <sub><b>cms-eo14168</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->

### Alumni

We'd like to acknowledge the following individuals for their past contributions of this project:

- [Aayat Ali](https://github.com/aayatsali) for setting up the foundation of the ospo-guide

## ospo-guide Open Source Community Guidelines

This document contains principles and guidelines for participating in the {{ cookiecutter.project_name }} open source community.

### Principles

These principles guide our data, product, and process decisions, architecture, and approach.

- Open means transparent and participatory.
- We take a modular and modern approach to software development.
- We build open-source software and open-source process.
- We value ease of implementation.
- Fostering community includes building capacity and making our software and processes accessible to participants with diverse backgrounds and skillsets.
- Data (and data science) is as important as software and process. We build open data sets where possible.
- We strive for transparency for algorithms and places we might be introducing bias.

### Community Guidelines

All community members are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

Information on contributing to this repository is available in our [Contributing file](CONTRIBUTING.md).

When participating in ospo-guide open source community conversations and spaces, we ask individuals to follow the following guidelines:

- When joining a conversation for the first time, please introduce yourself by providing a brief intro that includes:
  - your related organization (if applicable)
  - your pronouns
  - your superpower, and how you hope to use it for ospo-guide
- Embrace a culture of learning, and educate each other. We are all entering this conversation from different starting points and with different backgrounds. There are no dumb questions.
- Take space and give space. We strive to create an equitable environment in which all are welcome and able to participate. We hope individuals feel comfortable voicing their opinions and providing contributions and will do our best to recognize and make space for individuals who may be struggling to find space here. Likewise, we expect individuals to recognize when they are taking up significant space and take a step back to allow room for others.
<!-- TODO: Add if your repo has a community chat - Be present when joining synchronous conversations such as our community chat. Why be here if you're not going to _be here_? -->
- Be respectful.
- Default to positive. Assume others' contributions are legitimate and valuable and that they are made with good intention.

### Acknowledgements

The Community Guidelines sections were originally forked from the [United States Digital Service](https://usds.gov) [Justice40](https://thejustice40.com) open source [repository](https://github.com/usds/justice40-tool), and we would like to acknowledge and thank the community for their contributions.
