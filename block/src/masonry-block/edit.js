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
		let j = '<!-- wp:paragraph --><div style="columns: auto ' + attributes.width + 'px; column-gap: 0; margin: 0 auto; padding: 0;">';
		for( let i in image ) {
			j += '<!-- wp:image {"lightbox":{"enabled":' + attributes.link + '},"id":' + image[i].id + ',"sizeSlug":"large","linkDestination":"none"} --><figure style="display: block; padding-right: ' + attributes.padding + 'px; padding-bottom: ' + attributes.padding + 'px; margin: 0; line-height: 0;">';
			j += '<span style="width: ' + attributes.width + 'px;"><img src="' + image[i].url +'" style="max-width: 100%; height: auto; display: block; border-radius: ' + attributes.r_images + 'px;"></span>';
			j += '</figure><!-- /wp:image -->';
		}
		j += '</div><!-- /wp:paragraph -->';
		return j;
	}

	attributes.list_images = List_Images( attributes.image );

	const { preview } = attributes;
	if ( preview ) {
		return (
			<div className="simple-block-gallery-block-preview">
				<img src = { simple_block_gallery_preview_masonry.url } alt="Preview" />
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			<RawHTML>{ attributes.list_images }</RawHTML>
			<MediaUploadCheck>
				<MediaUpload
					title = { __( 'Masonry Block', 'simple-block-gallery' ) }
					onSelect = { onUpdateImage }
					allowedTypes = 'image'
					gallery = { true }
					multiple = { true }
					value = { attributes.images_ids }
					render = { ( { open } ) => (
						<Button
							variant = "secondary"
							onClick = { open }>
							{ ! attributes.images_ids ? __( 'Create Gallery', 'simple-block-gallery' ) : __( 'Update gallery', 'simple-block-gallery' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>

			<InspectorControls>
				<PanelBody title = { __( 'Settings', 'simple-block-gallery' ) } initialOpen = { true }>
					<RangeControl
						label = { __( 'Width', 'simple-block-gallery' ) }
						max = { 1000 }
						min = { 10 }
						value = { attributes.width }
						onChange = { ( value ) => setAttributes( { width: value } ) }
					/>
					<RangeControl
						label = { __( 'Space', 'simple-block-gallery' ) }
						max = { 20 }
						min = { 0 }
						value = { attributes.padding }
						onChange = { ( value ) => setAttributes( { padding: value } ) }
					/>
					<RangeControl
						label = { __( 'Rounded Images', 'simple-block-gallery' ) }
						max = { 20 }
						min = { 0 }
						value = { attributes.r_images }
						onChange = { ( value ) => setAttributes( { r_images: value } ) }
					/>
					<ToggleControl
						label = { __( 'Expand on click', 'simple-block-gallery' ) }
						help = { __( 'Scales the image with a lightbox effect', 'simple-block-gallery' ) }
						checked = { attributes.link }
						onChange = { ( value ) => setAttributes( { link: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
