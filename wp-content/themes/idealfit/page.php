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
    <label for="">Enter tags separated by comma. </label>
    <small>Tags in use: fun, relaxed, hard-working, efficient, casual, professional, powerful, impactful, agile, scrum, horizontal, creative, political, balanced, meritocracy.</small>
    <textarea type="text" class="form-control" id="tag-input"></textarea>
  </div>
  <div class="form-group">
    <button type="button" class="btn btn-primary" if-add-tags>Add Tags</button>
  </div>
  <div ng-hide="user.tags.length === 0">
    <p>Once you have finished entering tags, weigh how important each tag is to you.</p> 
    <ol>
      <li>Desirable</li>
      <li>Important</li>
      <li>Essential</li>
    </ol>
  </div>
  <div class="tags-list">
    <div class="tag" ng-repeat="tag in user.tags track by $index">
      <span class="remove" ng-show="deleteMode" ng-click="remove(user.tags, $index)"><i class="fa fa-times-circle"></i></span>
      <span class="name">{{tag.name}}</span>
      <span class="weights">
        <span if-set-weight data-tag-index="{{$index}}" ng-class="tag.weight === 1 ? 'weight active' : 'weight'">1</span>
        <span if-set-weight data-tag-index="{{$index}}" ng-class="tag.weight === 2 ? 'weight active' : 'weight'">2</span>
        <span if-set-weight data-tag-index="{{$index}}" ng-class="tag.weight === 3 ? 'weight active' : 'weight'">3</span>
      </span>
    </div>
  </div>
  <div class="form-group">
    <button type="button" ng-click="deleteMode = !deleteMode" class="btn btn-danger btn-xs">Delete Tags</button>
  </div>
  <p>Total tag score: {{user.total}}</p>
  <div class="form-group" ng-hide="user.total === 0">
    <button type="button" class="btn btn-success" if-find-matches>Find my Ideal Fit</button>
  </div>
</div>
<div class="matches">
  <div class="current">
    <h2 ng-hide="currentMatches.length === 0">Top 20 Matches</h2>
    <div class="match" ng-repeat="match in currentMatches track by $index">
      <h3>{{match.company.name}}</h3>
      <h4>{{match.result}}</h4>
      <div class="tags-list">
        <div class="tag" ng-repeat="tag in match.matchedTags">
          <span class="name">{{tag.name}}</span>
          <span class="weights">
            <span ng-class="tag.weight === 1 ? 'weight active' : 'weight'">1</span>
            <span ng-class="tag.weight === 2 ? 'weight active' : 'weight'">2</span>
            <span ng-class="tag.weight === 3 ? 'weight active' : 'weight'">3</span>
          </span>
        </div>
        <div class="tag unmatched" ng-repeat="tag in match.unmatchedTags">
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
    <h2 ng-hide="user.matches.length === 0">Saved Matches</h2>
    <div class="match" ng-repeat="match in user.matches track by $index">
      <h3>{{match.company.name}}</h3>
      <h4>{{match.result}}</h4>
      <div class="tags-list">
        <div class="tag" ng-repeat="tag in match.matchedTags">
          <span class="name">{{tag.name}}</span>
          <span class="weights">
            <span ng-class="tag.weight === 1 ? 'weight active' : 'weight'">1</span>
            <span ng-class="tag.weight === 2 ? 'weight active' : 'weight'">2</span>
            <span ng-class="tag.weight === 3 ? 'weight active' : 'weight'">3</span>
          </span>
        </div>
        <div class="tag unmatched" ng-repeat="tag in match.unmatchedTags">
          <span class="name">{{tag.name}}</span>
          <span class="weights">
            <span ng-class="tag.weight === 1 ? 'weight active' : 'weight'">1</span>
            <span ng-class="tag.weight === 2 ? 'weight active' : 'weight'">2</span>
            <span ng-class="tag.weight === 3 ? 'weight active' : 'weight'">3</span>
          </span>
        </div>
      </div>
      <button type="button" class="btn btn-danger" ng-click="remove(user.matches, $index)">Remove from saved matches</button>
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