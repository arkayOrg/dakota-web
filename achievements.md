---
title: Latest Scientific Discoveries | IUCRC
layout: default
secondary: true
permalink: /centers/achievements/
pagination:
  enabled: true
  per_page: 5
  collection: achievements
---
{% include hero/achievements.html %}

<div class="topic">
  <div class="container">
    <div class="views-element-container">
      <div>
        {% for post in paginator.posts %}
        <div class="topic__row topic__row--divider">
          <div class="topic__text">
            <h2 id=""><span class="highlight">{{ post.title }}</span></h2>
            <a class="usa-button btn-tertiary" href="{{ site.baseurl }}{{ post.url | append: '.html' }}">Learn More</a>
          </div>
          <div class="topic__image">
            <img src="{{ site.baseurl }}/visuals/achievements/{{ post.img }}" aria-hidden="true" alt="Topic Image Right">
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
  </div>
</div>


{% if paginator.total_pages > 1 %}
<div class="paging">
  <ul class="pager">
    {% if false and paginator.first_page %}
    <li class="previous">
        <a href="{{ paginator.first_page_path | prepend: site.baseurl | replace: '//', '/' }}">First</a>
    </li>
    {% endif %}

    {% if paginator.previous_page %}
    <li class="previous">
      <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' | replace: "/index.html", "/" }}">
        &lt;
      </a>
    </li>
    {% endif %}

    {% if paginator.page_trail %}
      {% for trail in paginator.page_trail %}
        <li {% if page.url == trail.path %}class="selected"{% endif %}>
          <a href="{{ trail.path | prepend: site.baseurl | replace: '//', '/' | replace: "/index.html", "/" }}"
              title="{{trail.title}}">{{ trail.num }}</a>
        </li>
      {% endfor %}
    {% endif %}

    {% if paginator.next_page %}
    <li class="next">
      <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' | replace: "/index.html", "/" }}"> 
        &gt;
      </a>
    </li>
    {% endif %}

    {% if false and paginator.last_page %}
    <li class="previous">
        <a href="{{ paginator.last_page_path | prepend: site.baseurl | replace: '//', '/' }}">Last</a>
    </li>
    {% endif %}
  </ul>
</div>
{% endif %}