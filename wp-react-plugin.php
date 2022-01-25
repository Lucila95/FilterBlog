<?php
/*
Plugin Name: blogFilter
Description: Use the [blogFilter] shortcode to display the plugin
Version: 0.0.1
Author: Gustavo Gomez
Author URI: https://github.com/GustavoGomez092
*/

class blogFilter {

    protected $plugin_options_page = '';

    /**
     * Class constructor
     */
    public function __construct() {
      require('plugin_options.php');
    }

    /**
     * Initialize hooks.
     */
    public function init() {

      add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
    }

    public function enqueue_frontend_scripts($hook) {

      //wp_enqueue_script('react');
      //wp_enqueue_script('react-dom');
      
      // add react and react-dom from core
      $dep = ''; //['wp-element'];
    }
}

$blogFilter = new blogFilter();
$blogFilter->init();

function blogFilter_shortcode( $atts ) {
  $handle = 'wp-react-plugin-';

  // enqueue development or production React code
  if(file_exists(dirname(__FILE__) . "/dist/main.js")) {
    $handle .= 'prod';
    wp_enqueue_script( $handle, plugins_url( "/dist/main.js", __FILE__ ), ['wp-element'], '0.1', true );
    wp_enqueue_style( $handle, plugins_url( "/dist/main.css", __FILE__ ), false, '0.1', 'all' );
  } else {
    $handle .= 'dev';
    wp_enqueue_script( $handle, 'http://localhost:3000/main.js', ['wp-element'], '0.1', true );
    wp_enqueue_style( $handle, 'http://localhost:3000/main.css', false, '0.1', 'all' );
  }
  return "<div id='blogFilter'></div>";
}

add_shortcode( 'blogFilter', 'blogFilter_shortcode' );