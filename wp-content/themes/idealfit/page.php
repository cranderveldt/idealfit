<?php get_header(); ?>
<section id="content" role="main">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<header class="header">
<h1 class="entry-title"><?php the_title(); ?></h1> <?php edit_post_link(); ?>
</header>
<section class="entry-content">
<?php if ( has_post_thumbnail() ) { the_post_thumbnail(); } ?>
<?php the_content(); ?>

<div class="tags">
  <div class="form-group">
    <label for="">Enter tags separated by comma. For results use tags like fun, relaxed, hard-working, efficient.</label>
    <textarea type="text" class="form-control" id="tag-input"></textarea>
  </div>
  <div class="form-group">
    <button type="button" class="btn btn-primary" if-add-tags>Add Tags</button>
  </div>
  <p ng-hide="user.tags.length === 0">Once you have finished entering tags, weigh how important each tag is to you. 1 is least important, 3 is most important.</p>
  <div class="tags-list">
    <div class="tag" ng-repeat="tag in user.tags track by $index">
      <span class="name">{{tag.name}}</span>
      <span class="weights">
        <span if-set-weight data-tag-index="{{$index}}" ng-class="tag.weight === 1 ? 'weight active' : 'weight'">1</span>
        <span if-set-weight data-tag-index="{{$index}}" ng-class="tag.weight === 2 ? 'weight active' : 'weight'">2</span>
        <span if-set-weight data-tag-index="{{$index}}" ng-class="tag.weight === 3 ? 'weight active' : 'weight'">3</span>
      </span>
    </div>
  </div>
  <div class="form-group">
    <button type="button" class="btn btn-success" if-find-matches>Find my Ideal Fit</button>
  </div>
</div>
<div class="matches">
  <div class="current">
    <div class="match" ng-repeat="match in currentMatches track by $index">
      <h3>{{match.name}}</h3>
      <div class="tags-list">
        <div class="tag" ng-repeat="tag in match.tags">
          <span class="name">{{tag.name}}</span>
          <span class="weights">
            <span ng-class="tag.weight === 1 ? 'weight active' : 'weight'">1</span>
            <span ng-class="tag.weight === 2 ? 'weight active' : 'weight'">2</span>
            <span ng-class="tag.weight === 3 ? 'weight active' : 'weight'">3</span>
          </span>
        </div>
      </div>
      <button type="button" class="btn btn-default" if-save-match data-match-index="{{$index}}">Save Match</button>
    </div>
  </div>
  <div class="saved">
    <div class="match" ng-repeat="match in user.matches">
      <h3>{{match.name}}</h3>
      <div class="tags-list">
        <div class="tag" ng-repeat="tag in match.tags">
          <span class="name">{{tag.name}}</span>
          <span class="weights">
            <span ng-class="tag.weight === 1 ? 'weight active' : 'weight'">1</span>
            <span ng-class="tag.weight === 2 ? 'weight active' : 'weight'">2</span>
            <span ng-class="tag.weight === 3 ? 'weight active' : 'weight'">3</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="entry-links"><?php wp_link_pages(); ?></div>
</section>
</article>
<?php if ( ! post_password_required() ) comments_template( '', true ); ?>
<?php endwhile; endif; ?>
</section>
<?php get_sidebar(); ?>
<?php get_footer(); ?>