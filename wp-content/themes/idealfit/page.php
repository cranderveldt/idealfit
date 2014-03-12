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
    <label for="">Enter tags separated by comma</label>
    <textarea type="text" class="form-control" id="tag-input"></textarea>
  </div>
  <div class="form-group">
    <button type="button" class="btn btn-primary" if-add-tags>Add Tags</button>
  </div>
  <div class="tags-list">
    <span class="tag" ng-repeat="tag in user.tags">{{tag.name}}</span>
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