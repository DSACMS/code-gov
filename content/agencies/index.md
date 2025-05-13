---
title: Agencies
description: 'Agencies'
permalink: content/agencies/mockData.json
layout: layouts/page
tags: codegov
eleventyNavigation:
  parent: codegov-agencies
  key: codegov-agencies-main
  order: 1
  title: Agencies
sidenav: false
sticky_sidenav: false
---

<div class="agencies-grid">
  {% for agency in mockData %}
  <li>
    <a href="content/agencies/{{ agency.slug }}">{{ agency.name }}</a>
  </li>
  <div class="agency-item">
    {% include "agency-card.html" %}
  </div>
  {% endfor %}
</div>

<!-- {% include "agency-card.html" %} -->
<!-- <div class="container">
  <div class="section-descriptions">
    <p>Agencies indexed by the OSPO</p>
  </div>
  <div class="agencies-grid">
    {% for agency in agencies %} {% assign agency_slug = agency[0] %} {%
    assign agency = agency[1] %} {% include "agency-card.html" section_slug: section_slug section:
    agency %} {% endfor %}
  </div>
</div> -->
