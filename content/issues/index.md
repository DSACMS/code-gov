---
title: Open Issues
description: 'Browse open source issues from federal government projects'
permalink: /issues/
layout: layouts/page
tags: codegov
eleventyNavigation:
  parent: codegov-issues
  key: codegov-issues-main
  order: 1
  title: Open Issues
sidenav: false
sticky_sidenav: false
templateEngineOverride: liquid, html
---

<script type="application/json" data-issues>{{ issuesData.issues | json }}</script>

<div class="card-and-filter-container">
    {% include "filters.html", filterTarget: "issues" %}
    <div class="agency-grid" id="issues-grid"></div>
</div>

<script src='{{ assetPaths["issue-filters.js"] }}'></script>