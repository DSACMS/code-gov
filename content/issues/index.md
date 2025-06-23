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

{% include "filters.html", filterTarget: "issues" %}

<div class="issues-grid" id="issues-grid"></div>

<script type="application/json" data-issues>{{ issuesData | json }}</script>
<script src='/assets/_common/js/issue-filters.js'></script>