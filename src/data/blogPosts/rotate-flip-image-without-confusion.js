export default `A sideways scan and a mirrored photograph can look equally wrong, but they need different corrections. Rotation turns the image around its center. A flip reflects it across an axis. Applying the wrong operation can make a page upright while leaving its text backward.

[Image Rotate & Flip](/image-rotate-flip) provides clockwise quarter-turn rotations and horizontal or vertical flips. It creates a new image with a preview and download. The goal is a predictable orientation change, not automatic detection of how a camera or scanner intended the image to look.

## Diagnose the problem before editing

Look for a feature with an obvious direction: readable text, an arrow, a door handle or a labeled diagram. If everything is sideways but not reversed, start with rotation. If lettering runs backward while the image is upright, consider a horizontal flip.

A vertical flip reflects top and bottom without performing an ordinary half-turn. A 180-degree rotation changes both top/bottom and left/right positions. These operations are not interchangeable when you are trying to understand what happened to a source.

Keep an untouched copy. Repeatedly saving and re-opening lossy images makes it harder to separate orientation corrections from compression changes. In this tool, you can change settings against the same loaded source and compare new previews without repeatedly using a prior export as the next input.

## Clockwise rotation in quarter turns

The rotation control offers 0, 90, 180 and 270 degrees clockwise. A 90-degree clockwise turn moves the top of the image toward the right. A 270-degree clockwise turn produces the same orientation as a 90-degree counterclockwise turn.

Quarter turns swap width and height. A 1,200 × 800 source becomes 800 × 1,200 after either 90 or 270 degrees. A 180-degree turn retains the 1,200 × 800 dimensions. None of these operations adds image detail; it changes where the existing content appears.

The interface does not offer arbitrary angles or a fine straightening slider. If a scan is tilted by a few degrees, use a tool with a suitable deskew function. Choosing 90 degrees will not fix a small camera tilt.

## How flips combine with rotation

The horizontal checkbox mirrors the source's left and right sides. The vertical checkbox mirrors its top and bottom. In this implementation, flips are applied in the source's coordinate system **before rotation**.

That order matters. A horizontal flip followed by a quarter turn can differ from flipping the already-rotated result horizontally. The checkbox label explicitly says “before rotation” so you can reason about the operation without assuming a sequence of separate editor commands.

If you are unsure, use one change at a time. Create a preview with only rotation, then inspect whether a flip is still needed. A combined setting is useful when you know the source's orientation, but it is not a substitute for looking at the result.

The [canvas rotation reference](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate) describes how drawing is transformed around the canvas origin. The tool translates to the output center so the rotated image fits on the new canvas rather than being clipped by an unchanged origin.

## Correct an image in Huzaifa Tools

1. Open [Image Rotate & Flip](/image-rotate-flip) and select a source image.
2. Choose the clockwise rotation.
3. Enable horizontal or vertical flipping only if needed.
4. Select the output format and, for JPEG or WebP, an appropriate quality setting.
5. Select **Create preview**, inspect directional details, and download the result.

The default 0-degree rotation with both flips disabled leaves the orientation unchanged, although exporting still creates a newly encoded raster file. Use Reset to clear the source and output before a separate task.

Settings changes clear the generated preview, which prevents a previous download from appearing to represent new settings. Create the output again after every adjustment. There is no batch mode: process one source at a time.

## Worked example: a two-color orientation test

Use a simple illustrative 100 × 60 image with a red left half and a blue right half. This is easier to reason about than a photograph with no obvious direction.

With a 90-degree clockwise rotation, the result is 60 × 100. Red occupies the top half and blue the bottom half. With only a horizontal flip and no rotation, the result stays 100 × 60, with blue on the left and red on the right.

Now combine horizontal flip with 90-degree clockwise rotation. The source is mirrored first, so blue moves to the top of the final 60 × 100 result. This small test demonstrates why the order of operations matters.

For a real scanned page, replace the colors with readable words: confirm that the heading is at the top and that the letters read normally. Checking only dimensions cannot tell you whether the text is mirrored. Open the downloaded file as well as looking at the page preview.

## Choose an output format for the next step

PNG avoids an additional JPEG-style lossy compression stage and is often useful for diagrams or screenshots. JPEG places transparency on a white background and re-encodes with the chosen quality setting. WebP is available where the browser supports export; the tool checks that the browser actually returned the requested format.

Rotation here uses a canvas and a new image encoding. It is not a specialized lossless JPEG coefficient-rotation utility. A JPEG can therefore change its bytes and compression artifacts even when the only visible operation is a quarter turn.

Keep the original when you need its original encoding or metadata. Animation is not retained, and source EXIF is not copied to the export. Browser decoding may also apply orientation or color conversion before the canvas operation.

## Metadata orientation and visible orientation are different

Some images carry an orientation tag that tells viewers how to display the stored pixels. A browser can apply that instruction during decoding, so the preview may already look upright even when another program displays the same file differently.

Do not add a rotation solely because a tag or camera setting suggests it. Inspect the image in the tool and in its intended destination. The [image metadata guide](/blog/read-image-metadata-exif) explains why metadata is useful context but not a complete description of display behavior.

If you only want to inspect orientation information, use [Image Metadata Viewer](/image-metadata-viewer). If you need to change the visible image, this rotate-and-flip tool produces a new raster result. Neither operation should be described as proving the original capture orientation.

## Limits and a sensible finishing sequence

Input formats are JPEG, PNG, WebP, GIF, BMP and AVIF where browser decoding supports them. The source limit is 25 MB and 24 megapixels. Output dimensions must stay within 10,000 pixels per side and 24 megapixels overall.

For a document photograph, correct orientation before choosing a crop. Then [crop the image](/image-cropper) if the surrounding area is unnecessary, and use [Images to PDF](/images-to-pdf) when you need an ordered A4 document. The [images-to-PDF guide](/blog/images-to-a4-pdf) explains that tool's fixed page layout and re-encoding behavior.

Processing stays in the browser; this tool does not upload the source to an image-editing server. The [privacy policy](/privacy-policy) provides the broader site context. Check the final image for visible private information before sharing it, especially when correcting scanned forms.

Return to [Image Rotate & Flip](/image-rotate-flip) with one clear question—sideways, upside down or mirrored—then make the smallest orientation change that solves it. A readable, correctly framed download is a better completion check than merely seeing a processing-success message.
`;
