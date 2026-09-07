export default `A single PDF can contain several deliverables: an introduction, separate chapters, and an appendix intended for a different reader. Splitting is useful when those parts need their own files. The important decision is where each output begins and ends, not simply how many files the tool creates.

[Huzaifa Tools PDF Splitter](/pdf-splitter) uses explicit page groups. You enter the pages that belong in each output and separate the groups with semicolons. The browser creates a downloadable PDF for every group. It does not automatically identify chapters, split at bookmarks, or search for a target file size.

## Start with a page map

Open the source in a PDF viewer and note its physical page positions. These are the first, second, third, and subsequent pages in the file. A printed page number is a label on the page and may not match that position.

A report might begin with a cover and contents before its numbered chapter starts. If the first chapter is printed as page 1 but appears third in the viewer, the splitter needs position 3. Roman-numbered front matter is another reason not to copy printed labels directly into the range field.

Write a simple map before processing: “overview, positions 1–2; method, 3–6; appendix, 7–9.” Inspect both boundary pages for each group. This catches a surprisingly common mistake: leaving the last page of a section in the next output because the heading appears at the top of the following page.

The page map also helps you decide whether every part is needed. Splitting does not have to preserve complete coverage. You can intentionally select only particular sections, but that omission should be deliberate and documented when another person expects the complete source.

## The difference between commas and semicolons

The range field has two separators with distinct jobs:

- A hyphen expresses an inclusive ascending range, such as \`3-5\`.
- A comma combines selections inside the same output, such as \`1,3-5\`.
- A semicolon starts another output, such as \`1-2;3-5\`.

For a five-page source, \`1-2;3-5\` produces two PDFs containing two and three pages. By contrast, \`1,3-5\` produces one PDF containing four pages. Spaces around numbers are acceptable, but an empty group or a trailing separator should be removed.

Selections preserve the order in which you request pages. Within one group, repeated page numbers are removed. If you enter \`3,1-2,3\`, that group contains source positions 3, 1, and 2 once each. A range such as \`5-3\` is rejected; list individual positions if you deliberately need a different order.

## Create your split outputs

1. Open [PDF Splitter](/pdf-splitter) and select one source PDF.
2. Enter the planned groups in **Page groups (separate output PDFs)**.
3. Select **Create PDF output** and wait for processing to finish.
4. Download each numbered part separately.
5. Rename and open every downloaded part before sharing it.

The download names are \`split-part-1.pdf\`, \`split-part-2.pdf\`, and so on. They correspond to the groups from left to right in the field. The tool does not infer a filename from a chapter heading, and it does not package the outputs into a ZIP archive.

Keep a record of that group-to-filename relationship until you finish checking. If you change the range field, previous results are cleared and you must create a new set. Reset clears the input selection and returns the range field to its starting value.

## Worked example: one source, three audiences

Consider an illustrative nine-page project note. The overview is positions 1–2, an implementation section occupies 3–6, and a reference appendix occupies 7–9. You need a complete three-part set for a shared folder.

Enter \`1-2;3-6;7-9\`. The expected output counts are two, four, and three pages. Their total is nine, matching the source. Check the last page of the overview, the first and last implementation pages, and the first appendix page against your map.

Now suppose a colleague needs the overview plus only the appendix, in a single file. That is a different output requirement. A group of \`1-2,7-9\` creates a five-page PDF; [PDF Page Extractor](/pdf-page-extractor) is the simpler interface for that one-output task.

If two recipients both need the same cover page, you can request it in two separate groups, for example \`1-2;1,7-9\`. Duplication across different output groups is intentional and allowed. It counts toward the overall selected-page limit, even though a page number is deduplicated within an individual group.

## Splitting by pages is not splitting by megabytes

Ten text pages can be smaller than one photograph-heavy scan. Equal page counts therefore do not imply equal file sizes. This splitter does not calculate a partition that meets an email or upload limit.

Create a candidate split, inspect the displayed output sizes, and check the receiving service's actual requirement. If a particular scanned page alone is too large, putting it into a one-page PDF will not necessarily solve the problem. You may need an appropriate image or PDF optimization workflow that preserves the details the recipient needs.

Other PDF software may offer splitting by file size or bookmarks. Those are separate capabilities, as illustrated by [Adobe's description of splitting methods](https://helpx.adobe.com/acrobat/desktop/edit-documents/organize-pages/split-pdfs.html). In Huzaifa Tools, use explicit page groups and avoid assuming those other modes exist.

## Review each part as a standalone document

A chapter can make sense inside a full report but become confusing on its own. Check whether its opening refers to an earlier section the recipient no longer has. Add context in the message accompanying the file, or revise the authoring document when a standalone introduction is necessary.

Cross-references, printed numbering, and contents pages are not rewritten by splitting. A reference to “see page 12” can remain even when the output contains only four physical pages. Preserve useful context rather than treating a successful export as an editorial review.

Look at filled forms, unusual fonts, links, and landscape pages. Page copying is not a guarantee that document-level attachments, bookmarks, signatures, or interactive form behavior will survive. Keep any signed original separately and use the required document workflow when its authenticity matters.

## Boundaries, failures and local processing

Use a nonempty, unencrypted PDF of at most 25 MB and 200 source pages. You may request at most 20 output groups and at most 200 selected output pages across those groups. Repeating a large range in several groups can exceed that total even when the source itself is within the page limit.

Page zero, positions beyond the source, descending ranges, and malformed separators produce errors. Start with a simple valid range if a complex expression fails, then add the remaining groups carefully. Do not use a printed label such as “iv” as a numeric position.

The operation runs locally in the browser and does not upload the PDF to a splitting service. That does not mean the tool removes confidential text or embedded information. Split outputs are documents to review, not automatically sanitized copies. Read the [privacy policy](/privacy-policy) and use a trusted device for sensitive work.

For the reverse task, [PDF Merger](/pdf-merger) joins separate documents in a chosen file order; its [assembly guide](/blog/merge-pdf-files-in-order) explains transition checks. When you have a reliable page map, return to [PDF Splitter](/pdf-splitter), create the groups, and verify each output against that map.
`;
