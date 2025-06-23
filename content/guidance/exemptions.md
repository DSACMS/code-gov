---
title: Exemptions
description: 'Identifying exempted software'
permalink: /agency-compliance/compliance/exemptions/
layout: layouts/page
tags: codegov
eleventyNavigation:
  parent: codegov-guidance
  key: codegov-guidance-exemptions
  order: 4
  title: How to Identify Exempted Code
sidenav: true
sticky_sidenav: true
---

Under the [SHARE IT Act](https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih#HB45699B7E8734166BE2F6DA2A80F7909), there are 4 source code exemptions. Use the checklist below to determine if your project falls under one of the exempted categories.

### Sign off on risk acceptance of open-sourcing the software product

Before outbounding repositories, it’s important that the appropriate stakeholders review and acknowledge the risks and responsibilities associated with releasing the code to the public. This step ensures transparency and accountability while enabling informed decision making.

#### Security and Privacy Verification
- [ ] I acknowledge that this project does **NOT**:
  - [ ] contain any PII/PHI, or create an identifiable risk to the privacy of an individual.
  - [ ] interface with any CMS Internal Systems. 
  - [ ] contain any keys or credentials to authenticate with CMS systems.

#### National Security and Intelligence Verification
- [ ] I acknowledge that this project is **NOT**:
  - [ ] primarily for use in national security systems, as defined in Section 11103 of title 40, USC.
  - [ ] created by an agency or part of an agency that is an element of the intelligence community, as defined in section 3(4) of the National Security Act of 1947.
  - [ ] exempt under section 552(b) of title 5, USC (commonly known as the "Freedom of Information Act").

#### Export and Regulatory Compliance
- [ ] I acknowledge that this project is **NOT** prohibited under:
  - [ ] Export Administration Regulations.
  - [ ] International Traffic in Arms Regulations (ITAR).
  - [ ] Regulations of the Transportation Security Administration related to the protection of sensitive information.
  - [ ] Federal laws and regulations governing the sharing of classified information.

Learn more: 
- [SHARE IT Act](https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih#HB45699B7E8734166BE2F6DA2A80F7909)
- [gov-codejson](https://github.com/DSACMS/gov-codejson/blob/main/docs/exemptions.md)
