export default `# Best Image Dimensions for Web and Mobile

Choosing proper image dimensions is key to delivering fast, polished pages. Oversized images are a common cause of slow load times.

## Match the display size

Set images to the exact dimensions they will appear at on the page. Avoid scaling down large source assets in the browser.

## Create responsive variants

Provide multiple sizes with srcset so each device downloads the best version.

## Use pixel density carefully

Retina or high-density displays may need larger images, but only where it makes a visible difference.

## Compress after resizing

Resize first, then compress with [Image Compressor](/image-compressor) to keep both quality and performance.


## Work from the layout and pixel density

For an image displayed at 400 CSS pixels wide, an 800-pixel source is one candidate for a 2x display; it is an example, not a universal requirement. Compare the extra sharpness against the added bytes. Wide hero images and square cards may need different crops rather than one stretched source. Preserve aspect ratio when resizing. Reserve width and height in the page so text does not jump when the image arrives.

## Continue the workflow

For a complete export-and-check process, see the [practical compression guide](/blog/image-compression-guide-2026).
`;
