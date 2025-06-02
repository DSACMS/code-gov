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
---

{% include "filters.html", filterTarget: "projects" %}

<script>console.log({{ codegovData.projects | json }})</script>
<script type="application/json" data-agencies>{{ codegovData.projects | json }}</script>

<div class="project-grid">

</div>