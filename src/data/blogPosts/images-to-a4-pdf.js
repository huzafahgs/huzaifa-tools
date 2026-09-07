export default `A set of photographed notes or exported diagrams is not always convenient to print or send as a collection of image attachments. A PDF can give the set a stable page order and a familiar document format. The conversion is useful only if the pages remain readable after the images are fitted onto paper.

[Images to PDF](/images-to-pdf) places each selected image on a separate A4 page. It works in the browser, lets you reorder the source images, and produces a real PDF download. Its layout is intentionally simple: portrait A4 pages, centered images, white backgrounds, and margins.

## Prepare images for the page they will become

Look through the source images before selecting them. Remove accidental duplicates, correct sideways material, and decide whether surrounding desk space or borders belong in the final document. The PDF tool does not automatically detect paper edges, correct perspective, or straighten a photographed page.

Use [Image Rotate & Flip](/image-rotate-flip) when an image is sideways, and [Image Cropper](/image-cropper) when a rectangular crop would remove unnecessary background. A rectangular crop cannot correct the trapezoid shape created by photographing a page at an angle; that requires another editing workflow.

Check fine text in the source at a useful zoom. If it is already blurred, putting it into a PDF will not recover the characters. Retake the photograph or obtain a cleaner export before assembly. Avoid making repeated lossy edits to the only copy of an image.

## How the A4 layout works

The tool creates a portrait A4 page for each image and scales the image proportionally to fit inside the margins. It does not stretch a wide diagram into a tall shape. A landscape image therefore occupies a shorter band across the portrait page and leaves more white space above and below it.

The source image is first limited to 2,400 pixels on its longest side, without increasing its pixel dimensions at that step. It is drawn onto a white canvas and encoded as JPEG at a quality setting of 0.9. That quality value is an encoder setting, not a promise that 90 percent of the original visual information is retained.

The JPEG is then centered on the PDF page. Its display size can be enlarged to fit the available page area even when the source contains relatively few pixels. A tiny source can consequently appear large but soft on paper. A PDF page's physical dimensions and an embedded image's pixel dimensions are different measurements.

Transparency becomes white. Animation and original image metadata are not preserved as an archival copy. Even when the input is PNG or WebP, the embedded image follows this JPEG workflow rather than retaining its original encoding.

## Build an ordered document

1. Open [Images to PDF](/images-to-pdf).
2. Choose the complete set of source images, up to 20 files.
3. Review their filenames in the list and use the up/down controls to put them in reading order.
4. Select **Create PDF output** and wait for the operation to finish.
5. Download **images.pdf** and inspect every page in a PDF viewer.

The supported input types are JPEG, PNG, WebP, GIF, BMP and AVIF when the browser can decode them. HEIC and SVG are not accepted by this implementation. A device's ability to display a format elsewhere does not guarantee this browser can decode it here.

Each file must be nonempty and no larger than 25 MB; the combined selection must not exceed 75 MB. Each decoded image must also be at most 24 megapixels. File size and megapixel count are separate limits: a highly compressed large image can pass one and fail the other.

Selecting files again replaces the current selection. Choose the full set again if you left out an image. The interface orders whole images, with one image per page; it does not arrange several photographs into a collage on a single sheet.

## Worked example: a three-image instruction sheet

Suppose you have an overview photograph at 3,000 × 2,000 pixels, a portrait diagram at 1,200 × 1,800, and a close-up at 1,600 × 900. You want a reader to see the overview, then the diagram, then the detail.

Arrange the files in that sequence. The overview is reduced to 2,400 × 1,600 pixels before embedding because its longest side exceeds the limit. The other two do not need that pixel reduction. All three are placed on separate portrait A4 pages, maintaining their proportions.

The finished PDF should contain three pages. Check that the diagram is upright and that its labels remain readable at the scale at which it will be viewed or printed. The wide close-up will leave substantial white space on the page; that is expected from fitting it proportionally, not evidence that the export lost part of the image.

If a label is too small, consider cropping the source more tightly or obtaining a larger original. Changing the file extension will not add pixels. If you need landscape pages, selectable page sizes, or a custom multi-image layout, use a document editor with those controls instead of trying to force this fixed layout into that role.

## What the PDF does not add

Photographed handwriting and scanned text remain images. This conversion does not perform OCR, create a searchable text layer, correct spelling, or recognize form fields. A reader may see the words clearly while still being unable to select or search them in the PDF.

The output is not promised to be smaller than the total inputs. Re-encoding, page structure and the original image formats all affect size. An already efficient source may not become a smaller document simply because it is now inside a PDF.

The tool also does not produce a certified archival or print-production document. If a receiving organization specifies a PDF standard, a color profile, a page size other than A4, or a minimum scanning resolution, check that requirement separately. Successful creation of an ordinary PDF does not establish compliance with those specifications.

## Inspect before printing or sharing

Open the actual download rather than relying only on the ready message. Confirm the page count and sequence, then look at corners, small text and pale markings. White backgrounds can change how a transparent image looks, and JPEG encoding can affect fine edges.

For printing, preview the complete page. Printer settings can apply another fit-to-page operation or introduce their own margins. A small test print is more informative than assuming the screen view exactly represents the final paper result.

If this image-based document needs to join an existing PDF report, use [PDF Merger](/pdf-merger) after checking the conversion. The [merge-order guide](/blog/merge-pdf-files-in-order) explains how to verify the boundary between those two documents. To create a preview image from the finished PDF, the [PDF rendering guide](/blog/pdf-pages-to-png-images) covers the reverse workflow.

## Privacy depends on the complete workflow

Selected images are processed locally by this tool; it does not upload them to a conversion server. That is useful for reducing unnecessary transfer, but the output can still contain visible addresses, names, faces or other private details. Removing original EXIF is not the same as removing information visible in the photograph.

Use a trusted device and check the recipient before sharing the file. Keep the original images when you may need to reframe or re-export them later. The [privacy policy](/privacy-policy) describes the broader site context, and [Contact](/contact) is available for reporting a reproducible problem using a non-sensitive sample.

When the images are clean, upright and correctly ordered, [create the A4 PDF](/images-to-pdf), review it once as a reader, and keep the accepted download alongside your source set.
`;
