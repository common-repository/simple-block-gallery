import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Edit( {attributes} ) {
	const blockProps = useBlockProps();
	const { preview } = attributes;
	const ALLOWED_BLOCKS = [ 'simple-block-gallery/masonry-block', 'simple-block-gallery/slider-block' ];

	if ( preview ) {
		return (
			<div className="simple-block-gallery-block-preview">
				<img src = { simple_block_gallery_preview_parent.url } alt="Preview" />
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks = { ALLOWED_BLOCKS }
				templateLock = { false }
			/>
		</div>
	);
};
