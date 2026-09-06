export default `“Without quality loss” can mean two different things: preserving every decoded pixel, or making a smaller image that looks acceptable at its intended size. Decide which you need before choosing an export method.

## When exact pixels matter

Lossless compression preserves the decoded image data. It is useful for screenshots, diagrams with fine lettering, and assets that will be edited again. Use a lossless-capable format and encoder, keep the original, and confirm the output settings. Merely selecting a high JPEG quality does not make JPEG lossless.

File metadata is separate from visible pixels. An optimizer may remove metadata even when the image pixels are preserved. Keep an archival original if you need that information later.

## When a visually similar result is enough

A photograph displayed in a small card may not need all the pixels of the original. Resizing removes information, but it can be appropriate when the published view does not benefit from the larger source. Compare at the intended display size and inspect fine details before accepting the tradeoff.

For example, a screenshot containing small code text may become unreadable after resizing, while a photograph at the same dimensions may remain useful. The subject determines the acceptance criteria; there is no universal quality number.

## A safe step-by-step workflow

1. Save an untouched original in a separate location.
2. Decide whether you need exact pixels, transparency, animation, or source metadata.
3. If resizing is acceptable, choose dimensions from the actual layout and expected display density.
4. Export a copy using an appropriate format.
5. Open the downloaded output and compare its dimensions, size, and visible detail.
6. Retain the original if the output is larger or loses information you need.

The [Image Compressor](/image-compressor) creates a lossy JPEG at the original dimensions. It is useful for a photographic copy, but does not meet an exact-pixel or transparent-output requirement. See the [image dimensions guide](/blog/best-image-dimensions) before resizing in a separate editor.

## Avoid repeated lossy exports

Return to the original for each new attempt. Recompressing a previous JPEG can accumulate artifacts without providing useful savings. Check gradients for banding and lettering for halos or blurred edges.

## Takeaway

Use lossless processing when preservation is the requirement. Otherwise, choose a clearly defined visual standard and compare the actual download. A smaller file is not an improvement if it removes information the reader needs.
`;
