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
---

{% include "filters.html", filterTarget: "agencies" %}

<script>console.log({{ codegovData.agencies | json }})</script>
<script type="application/json" data-agencies>{{ codegovData.agencies | json }}</script>

<div class="agency-grid">
  {% for agency in codegovData.agencies %}
    {% include "agency-card.html" %}
  {% endfor %}
</div>
