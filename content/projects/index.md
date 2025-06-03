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

{% include "filters.html", filterTarget: "projects" %}

<script type="application/json" data-projects>{{ codegovData.projects | json }}</script>

<div class="project-grid"></div>

<script src='/assets/_common/js/filters.js'></script>