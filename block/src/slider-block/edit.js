import { __ } from '@wordpress/i18n';
import { RangeControl, Button, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	const onUpdateImage = ( image ) => {
		setAttributes( {
			image: image,
			images_ids: List_Ids( image ),
			list_images: List_Images( image )
		} );
	};

	function List_Ids( image ) {
		let j = [];
		for( let i in image ) {
			j.push( image[i].id );
		}
		return j;
	}

	function List_Images( image ) {
		let j = '<!-- wp:paragraph -->';
		if ( image ) {
			let slide_interval = '';
			for( let k = 0; k < image.length; k++ ) {
				slide_interval += ( 100 / ( image.length - 1 ) ) * k + '%' + '{ left: -' + ( k * 100 ) + '%; } ';
				slide_interval += ( 100 / ( image.length - 1 ) ) * ( k + 1 ) * 0.8 + '%' + '{ left: -' + ( k * 100 ) + '%; } ';
			}
			j += '<style type="text/css">';
			j += '@keyframes slidy' + image[0].id + ' { ' + slide_interval + '}';
			j += 'div#slider' + image[0].id + ' { overflow: hidden; margin: 0 auto; padding: 0; }';
			j += 'div#slider' + image[0].id + ' figure img { width: ' + 100 / image.length + '%;hight:auto; float: left; }';
			j += 'div#slider' + image[0].id + ' figure { position: relative; width: ' + 100 * image.length + '%; margin: 0; left: 0; text-align: left; font-size: 0; animation: ' + ( attributes.animation * image.length ) + 's slidy' + image[0].id + ' infinite; }';
			j += '</style>';
			j += '<div id="slider' + image[0].id + '">';
			j += '<figure>';
			for( let i in image ) {
				j += '<img src="' + image[i].url + '">';
			}
			j += '</figure></div>';
		}
		j += '<!-- /wp:paragraph -->';
		return j;
	}

	attributes.list_images = List_Images( attributes.image );

	const { preview } = attributes;
	if ( preview ) {
		return (
			<div className="simple-block-gallery-block-preview">
				<img src = { simple_block_gallery_preview_slider.url } alt="Preview" />
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			<RawHTML>{ attributes.list_images }</RawHTML>
			<MediaUploadCheck>
				<MediaUpload
					title = { __( 'Slider block', 'simple-block-gallery' ) }
					onSelect = { onUpdateImage }
					allowedTypes = 'image'
					gallery = { true }
					multiple = { true }
					value = { attributes.images_ids }
					render = { ( { open } ) => (
						<Button
							variant = "secondary"
							onClick={ open }>
							{ ! attributes.images_ids ? __( 'Create Gallery', 'simple-block-gallery' ) : __( 'Update gallery', 'simple-block-gallery' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>

			<InspectorControls>
				<PanelBody title = { __( 'Settings', 'simple-block-gallery' ) } initialOpen = { true }>
					<RangeControl
						label = { __( 'Interval', 'simple-block-gallery' ) }
						max = { 30 }
						min = { 1 }
						value = { attributes.animation }
						onChange = { ( value ) => setAttributes( { animation: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
