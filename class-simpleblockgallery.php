<?php
/**
 * Plugin Name: Simple Block Gallery
 * Plugin URI:  https://wordpress.org/plugins/simple-block-gallery/
 * Description: Add the effect of Masonry and Slider to images.
 * Version:     1.10
 * Author:      Katsushi Kawamori
 * Author URI:  https://riverforest-wp.info/
 * License:     GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: simple-block-gallery
 *
 * @package Simple Block Gallery
 */

/*
	Copyright (c) 2020- Katsushi Kawamori (email : dodesyoswift312@gmail.com)
	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; version 2 of the License.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

$simpleblockgallery = new SimpleBlockGallery();

/** ==================================================
 * Main
 */
class SimpleBlockGallery {

	/** ==================================================
	 * Construct
	 *
	 * @since 1.00
	 */
	public function __construct() {

		add_action( 'init', array( $this, 'block_init' ) );
	}

	/** ==================================================
	 * Block init
	 *
	 * @since 1.00
	 */
	public function block_init() {

		register_block_type(
			__DIR__ . '/block/build/sbg-parent-block',
			array(
				'title' => _x( 'Simple Block Gallery', 'block title', 'simple-block-gallery' ),
				'description' => _x( 'Generate a Masonry or Slider gallery.', 'block description', 'simple-block-gallery' ),
				'keywords' => array(
					_x( 'gallery', 'block keyword', 'simple-block-gallery' ),
					_x( 'masonry', 'block keyword', 'simple-block-gallery' ),
					_x( 'slider', 'block keyword', 'simple-block-gallery' ),
				),
			)
		);
		$script_parent_handle = generate_block_asset_handle( 'simple-block-gallery/sbg-parent-block', 'editorScript' );
		wp_set_script_translations( $script_parent_handle, 'simple-block-gallery' );
		wp_localize_script(
			$script_parent_handle,
			'simple_block_gallery_preview_parent',
			array(
				'url' => esc_url( 'https://ps.w.org/simple-block-gallery/assets/screenshot-1.png' ),
			)
		);

		register_block_type(
			__DIR__ . '/block/build/masonry-block',
			array(
				'title' => _x( 'Masonry Block', 'block title', 'simple-block-gallery' ),
				'description' => _x( 'Generate the masonry gallery.', 'block description', 'simple-block-gallery' ),
			)
		);
		$script_masonry_handle = generate_block_asset_handle( 'simple-block-gallery/masonry-block', 'editorScript' );
		wp_set_script_translations( $script_masonry_handle, 'simple-block-gallery' );
		wp_localize_script(
			$script_masonry_handle,
			'simple_block_gallery_preview_masonry',
			array(
				'url' => esc_url( 'https://ps.w.org/simple-block-gallery/assets/screenshot-2.png' ),
			)
		);

		register_block_type(
			__DIR__ . '/block/build/slider-block',
			array(
				'title' => _x( 'Slider Block', 'block title', 'simple-block-gallery' ),
				'description' => _x( 'Generate the slider gallery.', 'block description', 'simple-block-gallery' ),
			)
		);
		$script_slider_handle = generate_block_asset_handle( 'simple-block-gallery/slider-block', 'editorScript' );
		wp_set_script_translations( $script_slider_handle, 'simple-block-gallery' );
		wp_localize_script(
			$script_slider_handle,
			'simple_block_gallery_preview_slider',
			array(
				'url' => esc_url( 'https://ps.w.org/simple-block-gallery/assets/screenshot-3.png' ),
			)
		);
	}
}
