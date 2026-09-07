export default `An image file can tell you more than what is visible in the picture. Its pixel dimensions determine whether it fits a layout; its size affects transfer and storage; embedded metadata may describe the camera, capture settings or location. Those details are useful only when you distinguish what the file actually contains from what you expected it to contain.

[Image Metadata Viewer](/image-metadata-viewer) reports basic file details and selected EXIF fields available from the chosen image. It processes the file locally in the browser. Missing information is reported as unavailable rather than filled with guesses.

The viewer is an inspection tool. It does not edit EXIF, remove location data, prove that a photograph is authentic, or reconstruct metadata that an earlier export discarded.

## Start with the dependable basics

The output includes the filename, the file type reported to the browser, its size in bytes, and the decoded image width and height. These fields answer practical questions without needing EXIF at all.

For example, a 4,000 × 3,000 image contains 12 million pixels. That is 12 megapixels, regardless of whether the compressed file occupies 2 MB or 8 MB. Pixel count and file size measure different things. Compression, image content and encoding affect the number of bytes needed to store those pixels.

Dimensions help you identify an unexpectedly small export. If a designer expects a 1,600-pixel-wide image but the viewer reports 400 pixels, check whether a messaging app or download process supplied a thumbnail. Renaming the thumbnail will not recreate the larger source.

The filename is organizational information, not proof of origin. A file named \`original-camera-photo.jpg\` can be an edited copy. Similarly, the browser-reported type is useful for handling the file but should not be treated as a forensic certification of its contents.

## Which EXIF fields are inspected?

When present and readable, the viewer looks for camera make and model, software, original capture time, exposure time, aperture, ISO, focal length, orientation, and GPS latitude/longitude fields. It uses the [exifr metadata parser](https://github.com/MikeKovarik/exifr) to read supported embedded metadata.

This is a selected set, not a complete dump of every possible tag, manufacturer note or metadata format. A field absent from the output may not exist in the source, may not be among the selected fields, or may not be readable from that particular file structure.

The basic dimensions are available even when EXIF is not. A screenshot, exported illustration or optimized web image may have little or no EXIF while still being a perfectly valid image. Do not treat “no supported EXIF fields found” as evidence that the file is broken.

## Inspect a file in Huzaifa Tools

1. Open [Image Metadata Viewer](/image-metadata-viewer).
2. Choose one supported image.
3. Wait for the image to load and the metadata inspection to complete.
4. Read **Available metadata**, comparing basic file fields with any EXIF values.
5. Reset before inspecting a separate file if you want a clean starting point.

The tool starts inspection after selection; there is no separate “scan EXIF” action to press. The preview and source download help identify the selected file, but they are not edited or sanitized outputs. Downloading that source does not remove its metadata.

Inputs are limited to 25 MB and 24 megapixels. JPEG, PNG, WebP, GIF, BMP and AVIF are accepted where the browser can decode them. This interface does not accept every camera RAW or HEIC format that a desktop photo manager might support.

## Worked example: find a mismatched export

Imagine an illustrative handoff with two versions of the same photograph. Your notes say the accepted image should be 1,800 × 1,200 pixels. The first file you inspect reports 600 × 400 pixels and a small byte size. Its EXIF is unavailable.

Those findings support one immediate conclusion: this file does not match the expected dimensions. They do not prove why it became smaller or identify who changed it. Ask for the intended export or inspect the other supplied file rather than attributing the change to a particular application without evidence.

The second file reports 1,800 × 1,200. It also contains a camera make and a capture-time field. That matches the dimension requirement, but you still need to open the image and inspect its appearance. Correct dimensions do not guarantee correct cropping, sharpness, color or subject matter.

Record the filename and measured dimensions in the handoff note. Avoid copying every EXIF field into a shared ticket when only the size mismatch matters. Inspection should help resolve the task without unnecessarily spreading location or other private information.

## Interpret capture details cautiously

Exposure time, aperture and ISO can help explain a camera workflow, but they are not a complete account of image quality. An image may have been edited, resized, denoised or re-encoded after capture. A listed software field can indicate a processing step without describing everything that happened.

Capture-time fields may lack time-zone information or reflect a camera clock that was set incorrectly. Do not convert an ambiguous timestamp into a precise historical claim. If timing is important, compare it with a reliable source and preserve the original file through the appropriate process.

Orientation metadata is another source of confusion. Some browsers apply orientation while decoding, so the displayed image and decoded dimensions can differ from assumptions based on the raw camera layout. Judge the preview and the file in the intended destination rather than trying to infer correctness from one tag alone.

EXIF values can be edited or removed. Their presence does not establish authenticity, authorship or an unbroken editing history. This viewer is useful for everyday inspection, not for certifying evidence.

## GPS information deserves a deliberate sharing decision

If location fields appear, consider whether they belong in the workflow at all. A technical support screenshot may accidentally reveal a home, workplace or other sensitive location while the actual issue concerns only image width.

Do not assume that the absence of displayed GPS fields proves there is no location information anywhere in the file. The viewer reads a selected set of supported fields, and the image itself may show a recognizable address or landmark. A complete privacy review includes visible content as well as metadata.

This tool does not offer a remove-metadata button. If you create a new raster export using [Image Converter](/image-converter), the current canvas workflow does not copy original EXIF, but that should not be described as a forensic sanitization guarantee. Inspect the actual export and follow your organization's handling rules for sensitive material.

## Why metadata sometimes disappears

Image-editing and sharing workflows can create new files that omit source EXIF. A converted format, a screenshot or a generated preview may no longer carry the camera fields you expected. The absence can be an ordinary consequence of export rather than an error in this viewer.

Compare the actual original and the actual exported file when you have both. Keep notes about the processing steps you performed. Reconstructing a lost field from memory and presenting it as embedded evidence would defeat the purpose of inspecting the file.

For broader format decisions, the existing [JPEG, PNG and WebP guide](/blog/jpeg-vs-png-vs-webp) discusses their practical roles. The [rotate-and-flip guide](/blog/rotate-flip-image-without-confusion) covers visible orientation changes, which are different from editing orientation metadata.

## Keep inspection proportional to the task

The selected file is processed in the browser and is not uploaded by this viewer. Broader site data handling is described in the [privacy policy](/privacy-policy). Local processing still depends on a trustworthy device and sensible sharing of the result.

When reporting a problem through [Contact](/contact), provide a non-sensitive example and the specific field or dimension that differs from your expectation. Avoid sending private originals just to demonstrate that a camera tag is absent.

Open [Image Metadata Viewer](/image-metadata-viewer) when you have a concrete question about a file. Start with dimensions and bytes, inspect relevant EXIF only when it helps, and treat every reported value as file data to evaluate rather than a story the tool has independently verified.
`;
