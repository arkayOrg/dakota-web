---
title: Wind Hazard and Infrastructure Performance Center
acronym: WHIP
layout: page
sidenav: false
---

{% assign center = site.data.centers[page.acronym] %}
<dir></dir>

<div class="hero">
  <div id="carouselCenterInd" class="carousel slide carousel--interior" data-ride="carousel" data-pause="false" data-interval="false">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="container">
          <div class="carousel__content carousel__content--slant">
            <div class="carousel__text-cta">
              <nav class="breadcrumbs" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Centers</a></li>
                  <li class="breadcrumb-item active" aria-current="page">{{ center.title }}</li>
                </ol>
              </nav>
              <h1>{{ center.title }}</h1>
              <p class="carousel__subtitle">Last Reviewed: 07/19/17</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="content-block">
    <div class="container">
      <div class="content-block__inner" style="font-style:italic">The opinions, findings, and conclusions or recommendations expressed are those of the Center author(s) and do not necessarily reflect the views of the National Science Foundation.
      </div>
    </div>
  </div>
  <div class="content-block">
    <div class="container">
      <div class="content-block__inner">
        <h2 id=""><span class="highlight">Center Overview</span></h2>
          {{ center.field_overview }}
      </div>
    </div>
  </div>

<div class="content-block">
  <div class="container">
    <div class="content-block__inner">
        <h2 id=""><span class="highlight">Universities</span></h2>
          <ul>
            {% for member in universities %}
              <li>{{ member.name }}</li>
            {% endfor %}
          </ul>
          <a class="usa-button btn-tertiary" href="http://www.ambic.org">View Center Website</a>
    </div>
  </div>
</div>
<div class="content-block content-block--bg">
    <div class="container">
      <div class="content-block__inner">
        <h2 id=""><span class="highlight">Research Focus</span></h2>
{{ center.field_research_focus }}
      </div>
    </div>
  </div>
  <div class="container">
    <div class="content-block__inner">
          <h2 id=""><span class="highlight">Awards</span></h2>
          <div class="content-block__columns">
            <p>
        <a href="https://www.nsf.gov/awardsearch/advancedSearchResult?AwardNumberOperator=Exactly&amp;AwardNumberFrom=1624641&amp;ActiveAwards=true&amp;ExpiredAwards=true">1624641</a>
    </p>
          </div>
        </div>
      </div>