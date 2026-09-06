export default `Start with an original copy, choose an appropriate output, and compare the downloaded result before publishing. A smaller file is useful only when it still communicates the detail your reader needs.

## A repeatable compression workflow

1. Save the original separately. Repeatedly saving a lossy image can compound artifacts.
2. Check the intended display width. A thumbnail and a full-width banner usually need different exports.
3. Resize a copy in an image editor; our [image dimensions guide](/blog/best-image-dimensions) explains how to choose a size. Consider higher-density displays, but do not export an oversized image by default.
4. Open the [Image Compressor](/image-compressor), select the copy, and begin with a moderate quality setting.
5. Download the JPEG, open it at its intended display size, and compare text, edges, faces, and gradients with the original.
6. Check the actual file size. Re-encoding an already optimized image can produce a larger output; keep the smaller acceptable version.

## Understand this tool's output

The compressor exports JPEG using your browser's encoder. It does not export AVIF or WebP, resize dimensions, preserve animation, or provide lossless compression. Transparent areas are flattened onto white. Use a different format-preserving workflow for transparent logos, animated images, or screenshots where exact pixels matter.

A quality value is an encoder setting, not a percentage of the original visual quality. Compare exports from the same source rather than assuming that a particular value works for every image. Very large images can exceed browser memory; resize a copy before trying again.

## Choose the format by the content

JPEG is useful for photographs. PNG is useful when lossless pixels or transparency are needed. WebP and AVIF are additional options when your publishing system and encoder support them. Compare representative files rather than assuming one format always wins. See the [WebP and AVIF comparison](/blog/webp-vs-avif) for a controlled comparison method.

## Publish and check the page

Set image width and height so the browser can reserve space. Use responsive image candidates if your publishing system supports them. Lazy-load images farther down the page, but avoid delaying the main image that visitors see immediately.

Inspect the deployed page on a narrow screen and a larger screen. Check that the correct file is requested, the crop is intentional, and important details remain readable. Write alt text based on the image's purpose; decorative images can have empty alt text.

Compression can improve loading, but it does not guarantee search rankings. Google describes image delivery and page experience in its [image guidance](https://developers.google.com/search/docs/appearance/google-images). Keep relevant, helpful content at the center of the page.

## Troubleshooting

- Larger output: the source may already be efficient. Compare a lower quality export or retain the source.
- Blurred lettering: use a lossless format for text-heavy graphics.
- Missing transparency: JPEG cannot retain it; keep a PNG or another alpha-capable format.
- Failed conversion: confirm the browser can decode the file and try a smaller image.
`;
