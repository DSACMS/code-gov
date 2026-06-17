# Code-gov

Code-gov replicates the functionality provided by code.gov. This site provides a software inventory and informational resource about  source code repositories throughout the federal government. 

This site is populated through GitHub actions and Python scripts that save data used by a staticly generated eleventy site. This strategy creates a responsive site that reduces costs while rebuilding a valuable resource on government source code, accomplished through extending the code.json metadata standard established by M-16-21. 


## What is Code-gov?

Code-gov is a github pages site that provides an inventory of federal government software projects. Similar to the previous iteration of code.gov developed and maintained by GSA. Unlike the previous version however this version is a static GitHub pages site populated by GitHub action workflows that call Python scripts. 


## What are the features of code-gov?

1. Open Source metadata

    Code-gov hosts open source metadata for projects at many agencies throughout the federal government. This metadata includes elements such as license information, labor hours worked, and the URL at which the project is primarily hosted. For a complete listing, see: https://github.com/DSACMS/gov-codejson/

2. Federal Source Code Policy Compliance 
    
    The site enables developers of Federal source code to abide by Federal policy regarding source code. Key policies includes [OMB Memorandum M-16-21](https://www.opm.gov/about-us/open-government/digital-government-strategy/fitara/memorandum-for-open-source-software-policy/) as well as the [SHARE IT Act](https://www.congress.gov/bill/118th-congress/house-bill/9566).

3. Searchable Catalog

    The site provides a searchable catalog and inventory of Federal source code, allowing users to locate existing projects for contributing, reuse, and market research for procurement. 

4. Encouraging Public Contributions

    The site helps public sector, private sector, and the general public to browse open issues present across all Federal repositories across the code-gov inventory. 

5. Supports Innovation

    Facilitates discovery and collaboration between government agencies and the civic tech community to improve and reuse public code.


## Who is code-gov for?

- Government Agencies complying with Federal Regulations
- Developers and Researchers
- Businesses and Startups
- Contracting Officers and Procurement Staff
- Eventually, Congressional Staffers measuring code reuse.

Code-gov is a comprehensive resource intended to promote open standards and software reuse, and a tool for government agencies and the developers that work with them. It provides a searchable catalog of existing projects, thus promoting interoperability, standards, and reuse throughout the federal government and beyond. 

# Development and Software Delivery Lifecycle

The following guide is for members of the project team who have access to the repository as well as code contributors. The main difference between internal and external contributions is that external contributors will need to fork the project and will not be able to merge their own pull requests. For more information on contributing, see: [CONTRIBUTING.md](./CONTRIBUTING.md).

## Local Development

The site uses 11ty. Ensure that you have the latest version of [Node](https://nodejs.org/en/download) installed.

To run the site locally:

1. Clone this repo
2. From the repo directory, run:
   ```sh
   npm install
   npm run dev
   ```
3. Open http://localhost:8080

## I’d like to make a contribution, how do I update this content?

We welcome contributions to be made to our resources. All are encouraged to suggest improvements that benefit the rest of the organization. To make a contribution to a document:

1. Find markdown file with document contents located in `/content`.
2. Make edits in a separate branch. Be sure to update `subnav` front matter if new sections are made.
3. Create a pull request with anyone in the OSPO team as reviewers as noted in [COMMUNITY.md](COMMUNITY.md).

## Coding Style and Linters

We use a github workflow in place that performs a number of tests on every pull request:

- Automated accessbility test with`pa11y-ci`
- Code linting with `eslint`
- HTML validation with `html-validate`
- Internal link checking with `check-html-links`

Additionally, we use `prettier` for code formatting.

## Branching Model

This project follows [trunk-based development](https://trunkbaseddevelopment.com/), which means:

- Make small changes in [short-lived feature branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/) and merge to `main` frequently.
- Be open to submitting multiple small pull requests for a single ticket (i.e. reference the same ticket across multiple pull requests).
- Treat each change you merge to `main` as immediately deployable to production. Do not merge changes that depend on subsequent changes you plan to make, even if you plan to make those changes shortly.
- Ticket any unfinished or partially finished work.
- Tests should be written for changes introduced, and adhere to the text percentage threshold determined by the project.

This project uses **continuous deployment** using [Github Actions](https://github.com/features/actions) which is configured in the [./github/workflows](.github/workflows) directory.

Pull-requests are merged to `main` and the changes are immediately deployed to the production environment.

# Digital Service at CMS (DSACMS)

We're a group of civic-minded technologists transforming how the federal government delivers healthcare to the American people. The Digital Service at CMS (DSAC) consists of engineers, designers, and product managers, serving our country by building and maintaining the technology underpinning our national health care programs.

# Centers for Medicare and Medicaid Services (CMS)

Every day, millions of people in this country interact with the healthcare system. We believe these interactions should be straightforward, transparent and seamless. Whether it's looking for health insurance, making sense of medical bills, or researching nursing homes, we are working to unlock medical information and empower people with health data.

- [76M people on Medicaid & CHIP](https://www.medicaid.gov/medicaid/program-information/medicaid-and-chip-enrollment-data/report-highlights/index.html) (2024)
- [67M people on Medicare](https://data.cms.gov/summary-statistics-on-beneficiary-enrollment/medicare-and-medicaid-reports/medicare-monthly-enrollment) (2024)
- [21M found insurance in ACA marketplace](https://www.cms.gov/newsroom/press-releases/historic-213-million-people-choose-aca-marketplace-coverage) (2024)

# What does the Digital Service at CMS do?

We work to transform the U.S. healthcare system by:

- Modernizing systems
- Improving the design of healthcare experiences
- Participating in policy development
- Delivering value to the government, healthcare providers, and patients

We accomplish these goals by bringing the best and brightest talent from industry and government to CMS for a "tour of duty." By collaborating closely with dedicated CMS career civil servants, our work includes everything from creating public websites to implementing new legislation in back-office systems. Learn more about our work [here.](https://www.cms.gov/digital-service)

# What does the Open Source Program Office (OSPO) at CMS do?

Establish and maintain guidance, policies, practices, and talent pipelines that advance equity, build trust, and amplify impact across CMS, HHS, and Federal Open Source Ecosystems by working and sharing openly.

## CMS OSPO in the News

### 2026
- [Punch Tape: Inside the Federal Government's First OSPO](https://youtu.be/ZETBjaiI12M?si=bFgWPDrisDMxgIVc)
- [GW Open Source Conference: It Is Time: Succession Planning, Shepherding, and Sunsetting Open Source Projects](https://ospo.gwu.edu/oscon-2026-details)
- [Open Source Summit North America: From Active To Archive: Shepherding Repositories Through Their Sunset](https://www.youtube.com/watch?v=T9DXykNLl3I)

### 2025
- [Sharing is Caring: How CMS is Leading on Federal Open Source Requirements: A FormFest 2025 Profile](https://digitalgovernmenthub.org/publications/sharing-is-caring-how-cms-is-leading-on-federal-open-source-requirements-a-formfest-2025-profile/)
- [GovCIO: Fed Efficiency Drive Includes Code-Sharing Law](https://govciomedia.com/fed-efficiency-drive-includes-code-sharing-law-metahumans/)
- [GovCIO: New SHARE IT Act Mandates Federal Code Sharing to Cut Software Costs](https://govciomedia.com/new-share-it-act-mandates-federal-code-sharing-to-cut-software-costs/)
- [FedScoop: Meet the Winners of the 2025 FedScoop50](https://fedscoop.com/fedscoop50/winners/)

### 2024
- [Health IT Leaders Receive Flywheel Awards from GovCIO Media & Research](https://govciomedia.com/health-it-leaders-receive-flywheel-awards-from-govcio-media-research/)
- [Feds Prioritize Open-Source Software Security Initiatives](https://govciomedia.com/feds-prioritize-open-source-so-ftware-security-initiatives/)
- [Nava Open-Source Summit: Modernizing Government with Code](https://ospo.gwu.edu/nava-open-source-summit-modernizing-government-code)
- [Highlighting Patient and Expert Interviews from the 2024 Health Datapalooza](https://academyhealth.org/blog/2024-10/highlighting-patient-and-expert-interviews-2024-health-datapalooza)
- [Establishing the First Open Source Program Office (OSPO) at a United States Federal Agency](https://insights.sei.cmu.edu/library/establishing-the-first-open-source-program-office-ospo-at-a-united-states-federal-agency/)
- [Exploring Digital Transformation at the Centers for Medicare & Medicaid Services](https://www.businessofgovernment.org/blog/exploring-digital-transformation-centers-medicare-medicaid-services)
- [PyCon May 2024](https://github.com/DSACMS/pycon-poster-2024/blob/main/repo-baselines.pdf)
- Code for America Summit 2024
- Open Source Summit North America (OSSNA) 2024 
    * [Establshing a Repository Baseline](https://www.youtube.com/watch?v=v0aaVBicOjI)
    * [Repository Cohorts](https://www.youtube.com/watch?v=FpVNSAj9eDg)
- [Biden-⁠Harris Administration Releases End of Year Report on Open-Source Software Security Initiative](https://www.whitehouse.gov/wp-content/uploads/2024/01/Securing-the-Open-Source-Software-Ecosystem-OS3I-End-of-Year-Report-MASTERCOPY.pdf)
- [Biden-⁠Harris Administration Releases End of Year Report on Open-Source Software Security and Memory Safe Programming Languages](https://www.whitehouse.gov/wp-content/uploads/2023/09/OS3I-RFI-Final-09232023.pdf)
- [US Digital Response Case Study: How One Federal Agency Worked to Release Open Source Software Responsibly](https://www.usdigitalresponse.org/resources/cms-open-source-software)
- [Managing Federal CHAOSS at CMS.gov - CHAOSScast](https://podcast.chaoss.community/81)

### 2023
- [Inside CMS’ Groundbreaking Open Source Program Office](https://www.youtube.com/watch?v=34LQnyB3ydQ)
- [OSPOs in Highly Regulated Environments Panel Discussion @ Open Source Summit EU 2023](https://osseu2023.sched.com/event/1OGeo/panel-discussion-ospos-transition-paths-for-regulated-environments-ana-jimenez-santamaria-linux-foundation-maurice-hendriks-city-of-amsterdam-nico-rikken-alliander-clare-dillon-innersourcecommons-thomas-steenbergen-epam?iframe=no&w=100%&sidebar=yes&bg=no)
- [Innersource Summit 2023: Innersource to Open Source Journey in Government](https://innersourcecommons.org/events/isc-2023/)
- [Inside CMS’ Groundbreaking Open Source Program Office](https://www.youtube.com/watch?v=34LQnyB3ydQ)
- [Repodiving into Open Source at CMS.gov](https://www.youtube.com/watch?v=AypgQch2Qpk)
- TODOGroup OSPOlogy September 2023 Meeting
- OSPOs for Good Summit 2023 @ United Nations Headquarters NYC

### 2022
- [Open Source and the Digital Service at CMS.gov - All Things Open 2022](https://www.youtube.com/watch?v=Q0EJIevZS0I)

# Acknowlegements

Our work is developed as a collaboration between the United States Digital Service (USDS.gov), The Department of Health and Human Services (HHS.gov), The Digital Service at the Centers for Medicare & Medicaid Services (CMS.gov), The USDigitalResponse.org, and other Federal Open Source Community Members.

Thank you all for your support and contributions.

# Community

The ospo-guide team is taking a community-first and open source approach to the product development of this tool. We believe government software should be made in the open and be built and licensed such that anyone can download the code, run it themselves without paying money to third parties or using proprietary software, and use it as they will.

We know that we can learn from a wide variety of communities, including those who will use or will be impacted by the tool, who are experts in technology, or who have experience with similar technologies deployed in other spaces. We are dedicated to creating forums for continuous conversation and feedback to help shape the design and development of the tool.

We also recognize capacity building as a key part of involving a diverse open source community. We are doing our best to use accessible language, provide technical and process documents, and offer support to community members with a wide variety of backgrounds and skillsets.

# Community Guidelines

Principles and guidelines for participating in our open source community are can be found in [COMMUNITY.md](COMMUNITY.md). Please read them before joining or starting a conversation in this repo or one of the channels listed below. All community members and participants are expected to adhere to the community guidelines and code of conduct when participating in community spaces including: code repositories, communication channels and venues, and events.

# Feedback

If you have ideas for how we can improve or add to our capacity building efforts and methods for welcoming people into our community, please let us know at opensource@cms.hhs.gov. If you would like to comment on the tool itself, please let us know by filing an **issue on our GitHub repository.**

## Policies

### Open Source Policy

We adhere to the [CMS Open Source
Policy](https://github.com/CMSGov/cms-open-source-policy). If you have any
questions, just [shoot us an email](mailto:opensource@cms.hhs.gov).

### Security and Responsible Disclosure Policy

_Submit a vulnerability:_ Vulnerability reports can be submitted through [Bugcrowd](https://bugcrowd.com/cms-vdp). Reports may be submitted anonymously. If you share contact information, we will acknowledge receipt of your report within 3 business days.

For more information about our Security, Vulnerability, and Responsible Disclosure Policies, see [SECURITY.md](SECURITY.md).

### Public domain

This project is in the public domain within the United States, and copyright
and related rights in the work worldwide are waived through the [CC0 1.0
Universal public domain
dedication](https://creativecommons.org/publicdomain/zero/1.0/) as indicated in [LICENSE](LICENSE).

All contributions to this project will be released under the CC0 dedication. By
submitting a pull request or issue, you are agreeing to comply with this waiver
of copyright interest.
