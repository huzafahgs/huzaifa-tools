export default `Cropping answers a framing question: which rectangle from the source should remain? That is different from resizing, which changes the pixel dimensions of the whole image. A useful crop can remove a distracting border, focus on a diagram, or create a specific aspect ratio without squeezing the subject.

[Image Cropper](/image-cropper) uses numeric coordinates rather than a draggable selection box. You specify the left edge, top edge, width and height, then create a preview. That makes the selection reproducible when you know the rectangle you need.

## Read coordinates from the top-left corner

The source image's top-left corner is the origin. X measures pixels to the right; Y measures pixels downward. The width and height describe the rectangle that starts at that point.

If X is 100 and Y is 50, the crop begins 100 pixels from the source's left edge and 50 from its top edge. A width of 400 and a height of 300 then select a 400 × 300 rectangle. The source must be large enough to contain that rectangle.

Two checks catch most mistakes: X plus crop width must not exceed source width, and Y plus crop height must not exceed source height. X and Y cannot be negative. The tool requires whole-number coordinates and positive whole-number dimensions.

A displayed preview may be scaled down to fit the page. Measure against the source's pixel dimensions, not the apparent width of that preview on your monitor. The loading message reports the source dimensions so you can use them in the calculation.

## Work through a centered crop

Suppose an illustrative photograph is 1,200 × 800 pixels and you need a centered square. The largest square that fits is 800 × 800. There are 400 horizontal pixels left over, so removing 200 from each side centers the selection.

Enter X=200, Y=0, width=800 and height=800. The right boundary is 200+800=1,000, within the source width of 1,200; the bottom boundary is 0+800=800, exactly the source height. The output should be an 800 × 800 square.

Now suppose the useful subject sits farther to the right. Change X to 300 while keeping the other values. The crop remains valid because its right boundary is 1,100. An X of 500 would be invalid because 500+800 exceeds 1,200.

This calculation does not decide which framing looks good. Check faces, labels, hands, shadows and the direction a subject is looking. A mathematically centered crop may still cut off the context that makes the picture understandable.

## Use Image Cropper step by step

1. Open [Image Cropper](/image-cropper) and select a source image.
2. Note the loaded width and height.
3. Set the crop width and height, then its left X and top Y coordinates.
4. Choose PNG, JPEG or WebP as the output format.
5. Select **Create preview**, inspect the result, and download it.

The initial width and height match the source, with X and Y set to zero. That initial rectangle includes the whole image. Reduce the dimensions before moving the origin when you want a smaller crop; otherwise the rectangle may extend past the source boundary.

Changing a setting clears the previous generated result, so create another preview after an adjustment. The crop is applied to the loaded source rather than repeatedly cutting the previous result. This makes it practical to compare alternative coordinates without progressively discarding more of the original.

## Choose a ratio before choosing a size

An aspect ratio compares width with height. A 600 × 400 rectangle is 3:2, and a 900 × 600 rectangle is also 3:2. Their framing shape is the same, but they contain different numbers of pixels.

For a 16:9 crop, choose dimensions that maintain that relationship, such as 960 × 540, then position the rectangle inside the source. The cropper has no preset-ratio buttons or automatic subject detection. You supply the dimensions and judge the preview.

If the source cannot contain the required rectangle, use a smaller rectangle with the same ratio or reconsider the output requirement. Do not try negative coordinates to invent missing space around the subject; this tool does not add borders or generate content.

When the framing is correct but the destination requires fewer pixels, use [Image Resizer](/image-resizer) afterward. The existing [image-dimensions guide](/blog/best-image-dimensions) discusses matching a destination, while this guide focuses on choosing which source pixels remain.

## Cropping a diagram needs a different review

A diagram is not just a subject surrounded by decoration. Its legend, scale, units and labels may be essential. Before cropping, identify every element required to interpret it correctly.

For example, a chart's line can fit neatly in the crop while its vertical-axis units fall outside. The result may look cleaner but communicate less reliably. Leave space for captions or attribution if they are part of the material you need to preserve.

If your source is a PDF page, use [PDF to Images](/pdf-to-images) to render it first, then crop the resulting PNG. The [PDF rendering guide](/blog/pdf-pages-to-png-images) explains its resolution limit. Cropping that raster image does not restore detail that was absent from the render.

## Output formats and actual pixel changes

The cropper draws the selected rectangle into a new canvas at the requested crop width and height. It does not enlarge the chosen region during that step. The [canvas drawImage documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) describes the source-rectangle and destination-rectangle model used for this operation.

PNG is appropriate when you want to avoid an additional lossy encoding stage. JPEG uses a white background for transparency and offers a quality control. WebP is available where the browser supports export. The tool checks the returned MIME type rather than simply giving a PNG a WebP filename.

Original EXIF is not copied into the export, and animation is not retained. Browser decoding may apply orientation and color conversion. Keep the source if its original metadata, color characteristics or animated content matters to your project.

## Bounds, file limits and privacy

Accepted input types are JPEG, PNG, WebP, GIF, BMP and AVIF where the browser can decode them. Each source is limited to 25 MB and 24 megapixels. Output dimensions must be positive integers, no more than 10,000 pixels per side and no more than 24 megapixels overall.

An invalid rectangle produces a bounds error instead of a partial crop. Recheck the X+width and Y+height calculations before changing formats or choosing the source again. If the browser cannot decode the input at all, use a compatible source such as JPEG or PNG.

Processing happens in the browser without uploading the image to a cropping service. That does not make cropping a complete document-redaction workflow. Inspect the exported image itself, and remember that any original copy you also share still contains its original framing and information.

The [privacy policy](/privacy-policy) covers broader site behavior. For orientation fixes before cropping, see the [rotate-and-flip guide](/blog/rotate-flip-image-without-confusion). Once you know the rectangle and output format, [create the crop](/image-cropper) and judge the downloaded result at the size your audience will see.
`;
