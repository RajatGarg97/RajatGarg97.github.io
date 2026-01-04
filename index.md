---
layout: home
---

I'm a software engineer working on backend systems and distributed architecture.

I write about system design, scalability patterns, and lessons from building production systems.

**Topics**: Distributed systems · Backend architecture · System design · Engineering practices

---

## Recent

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%b %Y" }}
{% endfor %}

{% if site.posts.size == 0 %}
_No posts yet. Check back soon._
{% endif %}

[All posts →](/writing)

---

## Projects

A selection of system-level work and technical projects.

[View projects →](/projects)

---

**Resume**: [PDF](/resume.html) | **Contact**: [Email](mailto:{{ site.email }})
