export default `When someone asks for two diagrams from a long manual, sending the complete manual can make their task harder. A short PDF containing the relevant pages is easier to review and keeps the page layout intact. The challenge is selecting the right positions without confusing extraction with editing or redaction.

[PDF Page Extractor](/pdf-page-extractor) copies selected pages from one source into one new PDF. It accepts individual numbers and ranges, including nonconsecutive selections. The original file on your device is not edited by this operation.

This is a guide to making a purposeful excerpt: identifying the pages, choosing their order, and checking that the resulting document still contains the context a reader needs.

## Extraction keeps pages, not just their text

A PDF page can contain text, images, vector drawings, and annotations. The extractor copies page content into a new document instead of taking a screenshot. A text-based source can therefore retain selectable text, although you should verify the actual output. A scanned page remains a scanned page; extraction does not recognize its words.

If your goal is a PNG illustration, use [PDF to Images](/pdf-to-images). If your goal is several separate PDF files, use [PDF Splitter](/pdf-splitter). The extractor is intended for one source becoming one selected-page document.

The distinction matters when a recipient needs to search, print, or refer to a page. Converting a text PDF into images changes those capabilities; selecting pages does not deliberately rasterize them. Conversely, copying an entire page will not isolate just one chart from the surrounding text.

## Identify physical positions before selecting pages

Open the source in a viewer and count positions from the beginning of the file, starting at 1. Do not rely only on the number printed in the page footer. A cover, an unnumbered introduction, or an inserted scan can shift the relationship between printed numbering and file position.

Suppose a manual has two unnumbered pages before the section labeled “1.” The page printed as “8” would be position 10 if the sequence is otherwise continuous. Confirm that in the viewer; do not assume every document uses such a simple offset.

Write a short selection note such as “overview at position 3, diagram at 8, instructions at 10–11.” Naming the page's purpose alongside its position gives you something to check after extraction. It is more reliable than memorizing a string of numbers while switching between browser tabs.

## Use the actual selection controls

1. Open [PDF Page Extractor](/pdf-page-extractor).
2. Choose one unencrypted source PDF.
3. Enter your selection in **Pages to include**, for example \`3,8,10-11\`.
4. Select **Create PDF output**.
5. Download **extracted-pages.pdf** and compare it with your selection note.

Commas join selections into the same output. Hyphens describe ascending, inclusive ranges. The example includes four pages: 3, 8, 10, and 11. It does not create three different PDFs, and it does not include the omitted positions between them.

The initial field contains \`1\`, so leaving it unchanged extracts the first physical page. Replace that value when your intended selection is elsewhere. Changing the field clears the previous output; generate again before downloading a revised selection.

There is no page-thumbnail selection interface in this implementation. Use a separate viewer to inspect the source and the numeric field to specify the result. If you need to insert pages from several different files, prepare each excerpt and then assemble them with [PDF Merger](/pdf-merger).

## Worked example: explain first, show evidence second

Imagine an illustrative twelve-page equipment guide. Position 2 gives the overview, positions 7–8 contain a diagram and its legend, and position 11 describes the final check. You want the final check first for a colleague who already knows the background.

Enter \`11,2,7-8\`. The new file should have four pages, in this order:

| New position | Original position | Purpose |
|---|---|---|
| 1 | 11 | Final check |
| 2 | 2 | Overview |
| 3 | 7 | Diagram |
| 4 | 8 | Legend |

This works because the extractor preserves the order of the requested selections. The range \`7-8\` still runs forward. A descending range such as \`8-7\` is invalid; write \`8,7\` if that order is intentional.

Repeated page numbers inside the selection are removed. Entering \`11,2,7-8,2\` still produces four pages, not five. If you need deliberate repeated pages, this interface is not designed as a page-duplication editor. Keep the selection simple and inspect the resulting sequence rather than guessing how repeated ranges will behave.

## A selected-page PDF is not a redacted PDF

Omitting an entire page reduces the visible material included, but extracting a page does not remove a sensitive paragraph from that page. Nor is the tool presented as a metadata scrubber, annotation cleaner, or forensic sanitization utility.

If a page contains confidential material alongside the useful diagram, do not send that page merely because the rest of the source was omitted. Use an appropriate redaction process and validate the sanitized result. Cropping a screenshot or drawing a shape over text is not the same operation as removing information from a document.

This distinction also applies to permissions. Local processing does not authorize redistribution of a manual, customer record, or licensed publication. Share only the material you are entitled to share and preserve attribution or context when it is required.

## Make the excerpt understandable by itself

Read the extracted pages consecutively, as the recipient would. An opening sentence may refer to a definition on an omitted page. A diagram may depend on the legend immediately after it. A table might continue on the next sheet, leaving the excerpt incomplete if you selected only its first half.

Add necessary companion pages rather than increasing the selection indiscriminately. For example, include a table heading or units note when the values would otherwise be ambiguous. The point is a useful excerpt, not simply the smallest possible page count.

Printed numbering and cross-references remain as authored. The tool does not rewrite “see section 4” or renumber the document from 1. Explain the original numbering in your accompanying message when the recipient could confuse it with the new physical positions.

For a structured multi-file delivery, the [PDF splitting guide](/blog/split-pdf-by-page-ranges) describes creating separate groups. For a raster illustration rather than a document excerpt, the [PDF-to-PNG guide](/blog/pdf-pages-to-png-images) explains the resolution and text tradeoffs.

## Limits and a useful final review

The source must be nonempty, no larger than 25 MB, and no longer than 200 pages. The selection is limited to 200 distinct pages. Positions start at 1 and must exist in the source; a page zero or a range ending beyond the document produces an error.

Encrypted PDFs are unsupported. A damaged file or an unsupported PDF structure may also fail, even if the filename ends in \`.pdf\`. If you have permission, obtain a clean unencrypted export from the source application. Do not assume a renamed or password-protected file can be made compatible through the selection syntax.

After downloading, check page count, sequence, small text, links and any filled fields. Bookmarks, attachments, digital signatures and interactive form behavior are not guaranteed to survive page copying. Keep the original when those features matter.

The browser performs the extraction without uploading the selected PDF to a processing server. For broader site behavior, consult the [privacy policy](/privacy-policy). Once the excerpt passes your review, rename the download clearly and use [PDF Page Extractor](/pdf-page-extractor) again only when the source or requested selection changes.
`;
