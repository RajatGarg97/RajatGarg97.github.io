---
layout: home
title: ""
---

# Rajat Garg — Senior Software Engineer

This is a technical blog and portfolio focused on system design, backend architecture, and distributed systems. I write about building reliable systems at scale, architectural decisions, and lessons from production infrastructure.

---

## Recent Writing

{% if site.posts.size > 1 %}
{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%b %Y" }}
{% endfor %}

[All posts →](/writing)
{% else %}
Writing on system design, distributed systems, and backend architecture. New posts coming soon.

[View all posts →](/writing)
{% endif %}

---

## Projects

{% for project in site.data.projects limit:3 %}
**{{ project.project }}**

{{ project.description | strip_html | truncatewords: 20 }}

{% endfor %}

[View all projects →](/projects)

---

## Contact

**Resume**: [View resume](/resume.html) · **Email**: [rajat.developer97@gmail.com](mailto:rajat.developer97@gmail.com)
