---
title: Projects
description: 'Projects'
permalink: /projects/
layout: layouts/page
tags: codegov
eleventyNavigation:
  parent: codegov-projects
  key: codegov-projects-main
  order: 1
  title: Projects
sidenav: false
sticky_sidenav: false
templateEngineOverride: liquid, html
---

<script type="application/json" data-projects>{{ codegovData.projects | json }}</script>

<div class="card-and-filter-container">
    {% include "filters.html", filterTarget: "projects" %}
    <div class="project-grid"></div>
</div>

<script src='code-gov/assets/_common/js/filters.js'></script>