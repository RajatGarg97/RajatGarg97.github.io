---
layout: page
title: Writing
permalink: /writing/
---

{% for post in site.posts %}
{% assign currentyear = post.date | date: "%Y" %}
{% if currentyear != year %}
### {{ currentyear }}
{% assign year = currentyear %}
{% endif %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%b %d" }}
{% endfor %}

