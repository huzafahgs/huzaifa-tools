export default `A presentation, help article or messaging app may need an image of a PDF page rather than the PDF itself. Taking a screenshot can work, but it also captures whatever zoom, selection or surrounding interface happens to be on screen. Rendering the page directly gives you a page image without that viewer chrome.

[PDF to Images](/pdf-to-images) renders selected pages into PNG files in your browser. Each selected page gets its own preview and download. The output contains the page's visible appearance; it is not editable PDF text and does not preserve document interactivity.

## Choose rendering only when you need pixels

An image is convenient for showing a diagram inside a slide, sending a preview, or illustrating a page layout. It is less suitable when the recipient needs selectable text, working PDF links, a signed original, or the ability to navigate a long document.

For those document tasks, keep a PDF or use [PDF Page Extractor](/pdf-page-extractor) to send only the relevant pages. Rendering is not a universal upgrade to the source. It trades document structure for a raster representation that image-based destinations can use.

Scanned and text-based PDFs can both be rendered. The distinction is in the source: a scan already contains image pixels, while text and vector artwork are drawn into pixels during rendering. Neither case creates an OCR text layer in the exported PNG.

## Select the correct physical page

Open the PDF in a viewer first and locate the page you need. Count positions from the first page in the file. A printed page number can differ because of a cover, contents pages or front matter.

The page-selection field starts with \`1\`. Enter a single position, a range such as \`2-4\`, or a combination such as \`1,5-6\`. The tool accepts at most ten selected pages per run. It removes duplicate positions and preserves the order of the requested selections.

If you want position 8 before position 3, enter \`8,3\`. A descending range such as \`8-3\` is not valid. Keep the expression small and easy to review; the interface does not show a source-page thumbnail grid for choosing pages visually.

## Render and download the pages

1. Open [PDF to Images](/pdf-to-images) and choose one source PDF.
2. Replace **Pages to include** with the required positions or ranges.
3. Select **Create images** and watch the page progress message.
4. Inspect each generated preview.
5. Download the PNG files you need, using their original page numbers in the filenames.

For example, selecting position 4 creates \`page-4.png\`, even if it is the only output. This makes the source position visible in the filename. If you rename the image, keep that relationship in your notes when you will need to trace it back to the source later.

The tool downloads individual images, not a ZIP archive. Changing the selection clears earlier generated outputs. Download the accepted files before resetting the interface or leaving the page; the tool is not a cloud document library that stores results for a later visit.

## How large will the image be?

The rendering scale is chosen automatically. The implementation uses a scale of up to 1.5 relative to the page viewport and limits the longest output side to 2,000 pixels. There is no custom DPI or resolution control in the interface.

For an illustrative page measuring 300 by 400 viewport units, the scale of 1.5 produces a 450 × 600 image. For a very large page measuring 2,000 by 3,000 units, the longest-side limit reduces the scale to roughly two-thirds, producing approximately 1,334 × 2,000 pixels after rounding.

Those calculations describe the renderer, not the amount of detail in a scanned source. Increasing the display scale of a blurry scan would not restore missing detail. A complex drawing can also contain labels that become too small to read when the whole page fits within the output limit.

The [PDF.js examples](https://mozilla.github.io/pdf.js/examples/) explain the viewport-and-canvas model behind page rendering. In this tool, the scale is fixed by the implementation rather than exposed as an adjustable setting.

## Worked example: a diagram for an instruction message

Imagine a six-page PDF where the needed diagram is at position 4. The recipient wants a visual reference in a message, not the entire document. Select \`4\`, create the image, and download \`page-4.png\`.

Open the download and inspect the smallest diagram labels. Then place it in the destination message or draft. Some applications resize uploaded images, so check the received or previewed version as well. A clear local PNG does not guarantee that another service will keep its original dimensions.

If the page has a large empty border, [Image Cropper](/image-cropper) can remove a rectangular margin from the rendered image. Use the [coordinate-cropping guide](/blog/crop-image-by-pixel-coordinates) to keep the intended diagram boundaries. Cropping after rendering changes framing; it does not make the original PDF renderer allocate more pixels to the diagram.

If the labels are still too small, send the selected PDF page instead or obtain a purpose-made diagram export. Do not present an enlarged low-resolution PNG as a higher-detail original.

## PNG, text and accessibility

PNG preserves the raster image without JPEG-style lossy compression, but rendering the PDF has already converted page content into pixels. “PNG” does not mean that vector text remains infinitely sharp or selectable.

A link printed on the page may look like a link inside the image, but it is not an interactive PDF link anymore. Copy important destinations into ordinary text when sharing a preview. Similarly, provide an accompanying explanation or accessible source when an image alone would prevent someone from using the information.

Avoid claiming that the result contains searchable text. If you need text extraction or OCR, use a tool designed for that job and review its recognition accuracy. This renderer's task is to produce the visible page image.

## Unsupported documents and memory limits

The source must be nonempty, at most 25 MB and no more than 200 pages. Only ten pages can be selected in one run. Those limits help bound browser memory use; a compressed file can require considerably more memory while its pages and images are decoded.

Password-protected PDFs are unsupported by this interface. It does not ask for a password or offer a decryption workflow. Malformed PDFs and unusual fonts or other complex content can also fail or render differently. Compare important results with a trusted PDF viewer rather than treating every generated image as an exact archival reproduction.

If a large selection has trouble, try one page from an authorized, ordinary source. Keep other unnecessary tabs closed on a memory-limited device. Do not repeatedly start the same operation while it is already processing.

## Local processing is not a content review

The selected PDF is read and rendered in the browser, with the renderer's supporting fonts and codecs served from the site. The tool does not send the PDF to a conversion server. Rendering also does not execute embedded document JavaScript through a PDF viewer scripting interface.

The exported image can still visibly reveal confidential data. Check names, addresses, account details and handwritten notes before sharing. An image format is not a privacy filter. Read the [privacy policy](/privacy-policy) for site-wide information.

For the opposite workflow, the [images-to-A4-PDF guide](/blog/images-to-a4-pdf) explains how ordered pictures become a document. For a smaller PDF excerpt, see the [selected-page guide](/blog/extract-selected-pdf-pages). When a page image is the right deliverable, [render a small selection](/pdf-to-images), inspect the actual downloads, and test them in their intended destination.
`;
