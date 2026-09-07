export default `Three finished PDFs are not always a finished submission. A reader may need the cover note first, the main report second, and an appendix last. Sending separate attachments leaves that sequence to filenames and guesswork. Combining them into one document can make the reading order explicit, provided you check what survived the merge.

[Huzaifa Tools PDF Merger](/pdf-merger) joins the pages of multiple PDFs in the file order you choose. It processes the selected files in your browser and produces a downloadable PDF. It does not redesign pages, reconcile conflicting page numbers, or turn a scanned document into searchable text.

This guide uses an illustrative report packet to show how to assemble a document, verify the boundaries between files, and recognize cases that need a fuller PDF editor.

## Decide what belongs in the packet

Before opening the tool, make a short inventory. Write down each document's purpose, its page count, and the order in which someone should read it. A useful sequence often follows the reader's task rather than the order in which you created the files.

For example, a project handover might contain a one-page cover note, a six-page report, and a three-page appendix. That produces ten pages. If a recipient needs only the conclusions and two diagrams, joining every available file is unnecessary. Use [PDF Page Extractor](/pdf-page-extractor) first to prepare the relevant material.

Open each source in a PDF viewer. Confirm that it is the intended revision, not a draft with the same filename. Check the first and last page, orientation, and any restrictions. Keep the originals in a separate folder so that renaming the final download cannot accidentally replace your source documents.

## What merging actually changes

The merger creates a new PDF and copies each source's pages into it. All pages from the first listed file appear before all pages from the next. It does not interleave the documents or let you drag individual page thumbnails into a new arrangement.

An A4 portrait page can sit next to a landscape page because the tool does not force every page onto a uniform sheet. That preserves the source page geometry, but it may make printing less predictable. Review the print dialog's scaling and orientation options before printing mixed-size material.

Page content and document-level features are different. The visible text or diagram may copy successfully while bookmarks, attachments, form behavior, or signatures do not behave as expected. The underlying [pdf-lib page-copying API](https://pdf-lib.js.org/docs/api/classes/pdfdocument#copypages) provides page assembly, not a promise to preserve every feature of a document package.

> Keep the signed original. A newly assembled PDF should not be treated as the original signed document merely because the signature's appearance is still visible.

## Assemble the files in Huzaifa Tools

1. Open [PDF Merger](/pdf-merger).
2. Choose at least two source PDFs in the file picker. Select the complete set you want to combine.
3. Review the filenames in the displayed list. Use the up and down buttons to change their order, or remove a file that does not belong.
4. Select **Create PDF output** and wait for the ready message.
5. Download **merged.pdf**, then open the downloaded file in a PDF viewer.

The controls reorder whole files. To move just one page from the middle of a source, extract that page or split the source into appropriate parts first. Do not keep clicking the create button while processing is underway; the interface disables its input controls during the operation.

Selecting a new group of files replaces the current selection. If a file is missing, choose the complete set again rather than assuming another picker selection will append it. Reset clears the selection and generated output so you can begin a separate packet without mixing the two tasks.

## Worked example: a ten-page handover

Suppose the source files are \`cover.pdf\` with one page, \`report.pdf\` with six pages, and \`appendix.pdf\` with three pages. The operating system happens to return them alphabetically, placing the appendix first. Use the ordering buttons until the list reads cover, report, appendix.

After merging, the expected positions are:

| Source | Expected positions in merged.pdf |
|---|---|
| Cover note | 1 |
| Main report | 2–7 |
| Appendix | 8–10 |

Check positions 1, 2, 7, 8, and 10. Those positions test both ends of the packet and the transitions between documents. Then scroll through the remaining pages to look for unexpected blanks, rotated scans, or a repeated cover sheet.

The printed number on the report's first page might still say “1” even though that sheet is position 2 in the merged file. Merging does not rewrite printed page numbers. If you need a single continuous numbering scheme, create it in your authoring application or a suitable PDF editor.

Rename the accepted download to something that identifies its purpose and revision, such as \`handover-review-copy.pdf\`. The name is an organizational aid; it does not change the PDF's content or establish which version was approved.

## Check the result beyond the page count

Page count is a useful first test, but a ten-page file can still be wrong. Search for a distinctive phrase from each text-based source. If a source was a scan, compare its image instead; the merger does not add OCR or make scan text selectable.

Inspect pages containing small labels, charts, and unusual fonts at a readable zoom. Open any links that matter to the recipient. Check filled form values in the downloaded file rather than relying on how the source looked before merging. If interactive features are essential, validate them in the viewer your recipients will use.

Also check whether a contents page still points to the correct places. A contents page written for the original report does not automatically update when you prepend a cover note. Use clear labels in the cover note or revise the contents in the original authoring workflow when that distinction would confuse a reader.

## Limits and errors worth understanding

The tool accepts up to 20 files, with a limit of 25 MB per file and 75 MB across the selection. Each source PDF may contain up to 200 pages, and the merged output is also limited to 200 pages. Two 150-page documents therefore exceed the output limit even if their combined file size is small.

Use ordinary, unencrypted PDFs. The tool does not provide a password-entry or decryption workflow. A file that opens in another viewer may still be encrypted or use features the PDF library cannot read. Obtain an appropriate unencrypted copy through an authorized workflow rather than repeatedly renaming the file.

Damaged files and files merely renamed with a \`.pdf\` extension can also fail. Try opening the exact source in a trusted viewer and exporting a fresh copy if you are entitled to do so. Do not interpret every read error as proof that the file is password protected.

Merging is not compression. The output size depends on the copied content and the new document structure; it is not promised to fall below an attachment limit. If you only need a subset, reducing the included pages is usually more deliberate than trying to make an oversized packet fit by trial and error.

## Local processing and sharing decisions

This merger reads selected files in the browser; it does not upload their contents to a merging server. The application and processing code still have to load. This is a claim about this tool's file operation, not a claim that every page on the site makes no network requests.

Local processing does not grant permission to share a document, secure a compromised device, or remove information embedded in the output. Before sending the packet, check that every included page is appropriate for the recipient. Review the site's [privacy policy](/privacy-policy) for broader data-handling information.

If your real task is one source becoming several deliverables, read the [page-group splitting guide](/blog/split-pdf-by-page-ranges). If it is a short selection from a longer source, read the [PDF extraction guide](/blog/extract-selected-pdf-pages). Once your file order and expected page count are clear, return to [PDF Merger](/pdf-merger) and assemble a small, verifiable packet.
`;
