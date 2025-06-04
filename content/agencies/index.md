---
title: Agencies
description: 'Agencies'
permalink: /agencies/
layout: layouts/page
tags: codegov
eleventyNavigation:
  parent: codegov-agencies
  key: codegov-agencies-main
  order: 1
  title: Agencies
sidenav: false
sticky_sidenav: false
templateEngineOverride: liquid, html
---

<script type="application/json" data-agencies>{{ codegovData.agencies | json }}</script>

<div class="card-and-filter-container">
  {% include "filters.html", filterTarget: "agencies" %}
  <div class="agency-grid"></div>
</div>

<!-- <script src='/assets/_common/js/filters.js'></script> -->
<script src='{{ assetPaths["filters.js"] }}'></script>
