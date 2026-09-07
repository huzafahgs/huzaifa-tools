// Editorial map for Phase 1. Intent choices are qualitative, not search-volume claims.
// Keep one primary guide per tool; related guides should answer a different task.
// User's follow-up plan: the remaining 90 tool guides in three batches of 30.
export const toolGuideTopics = [
  {
    toolSlug: 'pdf-merger', articleSlug: 'merge-pdf-files-in-order',
    wordCount: 1483,
    title: 'Merge PDF Files in the Right Order: A Practical Assembly Guide',
    metaTitle: 'Merge PDF Files in Order: A Practical Guide | Huzaifa Tools',
    metaDescription: 'Assemble PDFs in the right order with a worked ten-page example. Check page boundaries, file limits, signatures and the actual merged download.',
    primaryKeyword: 'merge PDF files in order',
    searchIntent: 'Combine separate PDFs into one correctly ordered document and verify the result.',
    secondaryTopics: ['combine PDF documents', 'reorder PDF files', 'mixed page sizes', 'merged PDF page count'],
    longTailQuestions: ['How do I change PDF file order before merging?', 'Does merging PDFs preserve signatures?', 'Why is my merged PDF still large?'],
    category: 'PDF Guides',
    relatedTools: ['pdf-merger', 'pdf-page-extractor', 'pdf-splitter'],
    relatedArticles: ['split-pdf-by-page-ranges', 'extract-selected-pdf-pages', 'huzaifa-tools-guide'],
    faq: [
      { question: 'Can I reorder individual pages in PDF Merger?', answer: 'The ordering buttons move entire files. To rearrange only part of a document, prepare page selections with PDF Page Extractor or PDF Splitter, then merge the resulting files in the intended order.' },
      { question: 'Will merging make the output smaller?', answer: 'Not necessarily. This tool copies pages into a new PDF; it is not a PDF compressor. Check the generated file size against the requirement of the receiving service.' },
      { question: 'What are the merge limits?', answer: 'Choose 2–20 unencrypted PDFs, no more than 25 MB per file and 75 MB combined. Each source and the merged output are limited to 200 pages.' },
      { question: 'Are my PDFs uploaded during merging?', answer: 'The selected files are processed in your browser, not uploaded to a merging server. Review the resulting document before sharing; local processing does not remove confidential content or guarantee preservation of signatures and forms.' }
    ],
    content: () => import('./blogPosts/merge-pdf-files-in-order.js').then(m => m.default)
  },
  {
    toolSlug: 'pdf-splitter', articleSlug: 'split-pdf-by-page-ranges',
    wordCount: 1316,
    title: 'Split a PDF by Page Ranges: Plan and Check Separate Documents',
    metaTitle: 'Split PDF by Page Ranges: Worked Guide | Huzaifa Tools',
    metaDescription: 'Use page groups to split one PDF into separate documents. Learn comma and semicolon syntax, check page counts and understand size and document limits.',
    primaryKeyword: 'split PDF by page ranges',
    searchIntent: 'Divide a single PDF into several explicitly selected output documents.',
    secondaryTopics: ['separate PDF chapters', 'PDF page groups', 'physical page positions', 'split PDF file size'],
    longTailQuestions: ['How do commas and semicolons change split PDF output?', 'Can I repeat a cover in separate outputs?', 'Can I split a PDF by megabytes?'],
    category: 'PDF Guides', relatedTools: ['pdf-splitter', 'pdf-page-extractor', 'pdf-merger'],
    relatedArticles: ['extract-selected-pdf-pages', 'merge-pdf-files-in-order'],
    faq: [
      { question: 'How do I create three separate PDFs?', answer: 'Enter three groups separated by semicolons, such as 1-2;3-6;7-9. Each group produces a separately downloadable PDF. Check that every requested position exists in the source.' },
      { question: 'Does a comma create another output file?', answer: 'No. A comma combines selections within one output. For example, 1,3-5 creates one four-page PDF, whereas 1;3-5 creates two outputs.' },
      { question: 'Can this splitter target a maximum file size?', answer: 'No. It selects pages, not megabyte targets. Inspect each output size after creation; equal numbers of pages can contain very different amounts of image and text data.' },
      { question: 'How many split outputs can I create?', answer: 'The limit is 20 output groups and 200 selected pages across them. The source must be unencrypted, no larger than 25 MB and no longer than 200 pages.' }
    ],
    content: () => import('./blogPosts/split-pdf-by-page-ranges.js').then(m => m.default)
  },
  {
    toolSlug: 'pdf-page-extractor', articleSlug: 'extract-selected-pdf-pages',
    wordCount: 1366,
    title: 'Extract Selected PDF Pages into One Useful Document',
    metaTitle: 'Extract Selected PDF Pages: Practical Guide | Huzaifa Tools',
    metaDescription: 'Create one PDF from selected pages or nonconsecutive ranges. Follow a worked example, distinguish page labels from positions and review the excerpt.',
    primaryKeyword: 'extract selected PDF pages',
    searchIntent: 'Create a single useful excerpt from nonconsecutive pages of one PDF.',
    secondaryTopics: ['save certain PDF pages', 'nonconsecutive PDF pages', 'PDF page labels', 'extraction versus redaction'],
    longTailQuestions: ['How do I extract pages in a chosen order?', 'Does extracting delete pages from the original?', 'Is extraction the same as redaction?'],
    category: 'PDF Guides', relatedTools: ['pdf-page-extractor', 'pdf-splitter', 'pdf-to-images'],
    relatedArticles: ['split-pdf-by-page-ranges', 'pdf-pages-to-png-images'],
    faq: [
      { question: 'Can I extract nonconsecutive pages?', answer: 'Yes. A selection such as 2,7-8,11 copies those four pages into one output. The selection uses physical file positions starting at 1, which may differ from printed page numbers.' },
      { question: 'Does the extractor modify my original file?', answer: 'No. It reads the selected source and creates a new downloadable PDF. Keep the original separately, particularly when its signatures or document-level features matter.' },
      { question: 'Can I change the output page order?', answer: 'Yes, by ordering selections in the field, for example 11,2,7-8. Ascending ranges are supported; duplicate positions within the selection are removed.' },
      { question: 'Does extraction remove sensitive information from a selected page?', answer: 'No. It copies the selected page and is not a redaction or metadata-sanitization tool. Review the entire output and use an appropriate redaction workflow when only part of a page may be shared.' }
    ],
    content: () => import('./blogPosts/extract-selected-pdf-pages.js').then(m => m.default)
  },
  {
    toolSlug: 'images-to-pdf', articleSlug: 'images-to-a4-pdf',
    wordCount: 1403,
    title: 'Turn Images into an A4 PDF: Ordering, Layout, and Readability',
    metaTitle: 'Images to A4 PDF: Layout and Ordering Guide | Huzaifa Tools',
    metaDescription: 'Build an ordered A4 PDF from images. Understand margins, JPEG re-encoding, readable source dimensions, supported formats and the lack of OCR.',
    primaryKeyword: 'images to A4 PDF',
    searchIntent: 'Assemble images as ordered printable PDF pages and understand the fixed layout.',
    secondaryTopics: ['photos to PDF', 'one image per page', 'A4 image margins', 'image PDF readability'],
    longTailQuestions: ['Why is there white space around my image in the PDF?', 'Does image to PDF create searchable text?', 'Can I choose landscape PDF pages?'],
    category: 'PDF Guides', relatedTools: ['images-to-pdf', 'image-rotate-flip', 'pdf-merger'],
    relatedArticles: ['rotate-flip-image-without-confusion', 'merge-pdf-files-in-order', 'pdf-pages-to-png-images'],
    faq: [
      { question: 'Can I choose a different PDF page size or landscape layout?', answer: 'Not in this implementation. Each image is centered proportionally on a portrait A4 page with margins. Use a document editor when you need other page sizes or custom multi-image layouts.' },
      { question: 'Will text in photographs become searchable?', answer: 'No. This tool embeds raster images and does not perform OCR or create a searchable text layer. Inspect source text for readability before converting.' },
      { question: 'What happens to transparency and animation?', answer: 'Images are drawn onto white and encoded as JPEG before embedding. Transparency becomes white, animation is not retained and original image metadata is not preserved as an archival copy.' },
      { question: 'How many images can I convert at once?', answer: 'Choose up to 20 supported images, at most 25 MB each and 75 MB combined. Each decoded image must be within 24 megapixels. Embedded images are limited to 2400 pixels on their longest side.' }
    ],
    content: () => import('./blogPosts/images-to-a4-pdf.js').then(m => m.default)
  },
  {
    toolSlug: 'pdf-to-images', articleSlug: 'pdf-pages-to-png-images',
    wordCount: 1391,
    title: 'Convert PDF Pages to PNG Images: Resolution and Download Guide',
    metaTitle: 'PDF Pages to PNG: Resolution and Download | Huzaifa Tools',
    metaDescription: 'Render selected PDF pages as PNG images. Learn page selection, output resolution, download checks and when keeping a PDF is the better choice.',
    primaryKeyword: 'convert PDF pages to PNG',
    searchIntent: 'Render selected PDF pages as image files for previews and visual sharing.',
    secondaryTopics: ['PDF page image', 'PDF render resolution', 'PNG page download', 'raster versus selectable text'],
    longTailQuestions: ['Can I choose the DPI for PDF-to-image output?', 'Will PNG output preserve PDF links?', 'How many PDF pages can I render at once?'],
    category: 'PDF Guides', relatedTools: ['pdf-to-images', 'pdf-page-extractor', 'image-cropper'],
    relatedArticles: ['extract-selected-pdf-pages', 'crop-image-by-pixel-coordinates', 'images-to-a4-pdf'],
    faq: [
      { question: 'Can I set a custom DPI or output size?', answer: 'No. The renderer chooses a scale up to 1.5 and caps the longest side at 2000 pixels. There is no custom resolution control in this interface.' },
      { question: 'Does the output contain selectable text or clickable PDF links?', answer: 'No. The PNG is a raster representation of the page. Use the original PDF or a page excerpt when selectable text, document links or other PDF behavior is needed.' },
      { question: 'Why does a small label look blurry?', answer: 'The source may already be blurry, or the full-page rendering limit may leave too few pixels for a small label. Enlarging the PNG cannot recover missing detail; consider a suitable source export or the PDF page itself.' },
      { question: 'What PDFs can I render?', answer: 'Use an unencrypted PDF of at most 25 MB and 200 pages, selecting no more than 10 pages per run. Unusual fonts and complex content should be checked against a trusted PDF viewer.' }
    ],
    content: () => import('./blogPosts/pdf-pages-to-png-images.js').then(m => m.default)
  },
  {
    toolSlug: 'image-cropper', articleSlug: 'crop-image-by-pixel-coordinates',
    wordCount: 1302,
    title: 'Crop an Image by Pixel Coordinates: Exact Framing Without Stretching',
    metaTitle: 'Crop Images by Pixel Coordinates: Guide | Huzaifa Tools',
    metaDescription: 'Choose an exact image crop with X, Y, width and height. Work through a centered square, avoid bounds errors and verify the downloaded framing.',
    primaryKeyword: 'crop image by pixel coordinates',
    searchIntent: 'Select a precise rectangular region and export it without stretching the source.',
    secondaryTopics: ['image crop X Y', 'center square crop', 'crop aspect ratio', 'crop versus resize'],
    longTailQuestions: ['How do I calculate a centered square crop?', 'Why is my crop outside the image?', 'Does cropping resize the whole image?'],
    category: 'Image Guides', relatedTools: ['image-cropper', 'image-resizer', 'image-rotate-flip'],
    relatedArticles: ['rotate-flip-image-without-confusion', 'pdf-pages-to-png-images', 'best-image-dimensions'],
    faq: [
      { question: 'Where do X and Y start?', answer: 'They start at the top-left corner of the decoded source image. X increases to the right and Y increases downward; use source pixel dimensions rather than the scaled preview size.' },
      { question: 'How do I crop a 1200 × 800 image to a centered square?', answer: 'Set width and height to 800, X to 200 and Y to 0. That removes 200 pixels from each horizontal side and keeps the full source height.' },
      { question: 'Why does the crop show a bounds error?', answer: 'The selected rectangle must remain inside the source. X plus width cannot exceed source width, and Y plus height cannot exceed source height. Coordinates must be nonnegative integers.' },
      { question: 'Can I drag a crop box or choose a preset ratio?', answer: 'This interface uses numeric coordinates and dimensions, not a draggable crop box or preset-ratio control. Calculate the desired dimensions, create a preview and adjust the numbers if necessary.' }
    ],
    content: () => import('./blogPosts/crop-image-by-pixel-coordinates.js').then(m => m.default)
  },
  {
    toolSlug: 'image-metadata-viewer', articleSlug: 'read-image-metadata-exif',
    wordCount: 1457,
    title: 'Read Image Metadata and EXIF: What the Fields Can—and Cannot—Tell You',
    metaTitle: 'Read Image Metadata and EXIF: Practical Guide | Huzaifa Tools',
    metaDescription: 'Inspect image dimensions, file size and available EXIF. Understand missing fields, capture-time ambiguity, location privacy and authenticity limits.',
    primaryKeyword: 'read image metadata and EXIF',
    searchIntent: 'Inspect actual file details and interpret available EXIF without inferring unsupported facts.',
    secondaryTopics: ['image dimensions metadata', 'camera EXIF fields', 'missing EXIF', 'photo GPS privacy'],
    longTailQuestions: ['Why does an image have no EXIF?', 'Can EXIF prove a photo is original?', 'Does a metadata viewer remove GPS data?'],
    category: 'Image Guides', relatedTools: ['image-metadata-viewer', 'image-converter', 'image-rotate-flip'],
    relatedArticles: ['rotate-flip-image-without-confusion', 'jpeg-vs-png-vs-webp'],
    faq: [
      { question: 'Does this viewer remove EXIF or location data?', answer: 'No. It inspects selected fields and does not edit or sanitize the source. Downloading the displayed source file is not a metadata-removal operation.' },
      { question: 'Why are camera fields missing?', answer: 'They may never have been present, may have been omitted by an export, or may not be among the supported fields. A valid image can have useful dimensions and no readable EXIF.' },
      { question: 'Can metadata prove that a photograph is authentic?', answer: 'No. EXIF values can be changed or removed. They are information stored in the file, not independent verification of authorship, capture time or editing history.' },
      { question: 'Does no displayed GPS mean an image is safe to share?', answer: 'Not necessarily. The viewer inspects selected supported fields, and visible content may reveal a location or private information. Review the actual image and the full sharing context.' }
    ],
    content: () => import('./blogPosts/read-image-metadata-exif.js').then(m => m.default)
  },
  {
    toolSlug: 'image-rotate-flip', articleSlug: 'rotate-flip-image-without-confusion',
    wordCount: 1356,
    title: 'Rotate or Flip an Image: Choose the Correct Orientation',
    metaTitle: 'Rotate or Flip an Image: Orientation Guide | Huzaifa Tools',
    metaDescription: 'Fix sideways or mirrored images with quarter turns and flips. Understand operation order, swapped dimensions, output formats and orientation metadata.',
    primaryKeyword: 'rotate or flip an image',
    searchIntent: 'Correct sideways, upside-down or mirrored image orientation with predictable transforms.',
    secondaryTopics: ['clockwise image rotation', 'horizontal mirror image', 'flip before rotation', 'image orientation EXIF'],
    longTailQuestions: ['Does a 90-degree rotation swap image dimensions?', 'Are flips applied before rotation?', 'Is rotating a JPEG lossless here?'],
    category: 'Image Guides', relatedTools: ['image-rotate-flip', 'image-cropper', 'images-to-pdf'],
    relatedArticles: ['read-image-metadata-exif', 'crop-image-by-pixel-coordinates', 'images-to-a4-pdf'],
    faq: [
      { question: 'How do I rotate counterclockwise?', answer: 'Choose 270 degrees clockwise for the same orientation as 90 degrees counterclockwise. The interface offers 0, 90, 180 and 270 degrees clockwise.' },
      { question: 'Are flips applied before or after rotation?', answer: 'They are applied before rotation, in the source image coordinate system. Check the preview because combining a flip with a quarter turn can differ from flipping an already-rotated image.' },
      { question: 'Can I straighten a page by a few degrees?', answer: 'No. This tool offers quarter turns, not arbitrary angles or automatic deskew. Use an editor with a fine rotation control for small tilts.' },
      { question: 'Is JPEG rotation lossless?', answer: 'This implementation draws to a canvas and re-encodes the output. It is not a specialized lossless JPEG rotation operation. Keep the original when preserving its original bytes or metadata matters.' }
    ],
    content: () => import('./blogPosts/rotate-flip-image-without-confusion.js').then(m => m.default)
  },
  {
    toolSlug: 'json-to-csv', articleSlug: 'json-to-csv-flat-data',
    wordCount: 1396,
    title: 'Convert Flat JSON to CSV: Columns, Quoting, and Spreadsheet Checks',
    metaTitle: 'JSON to CSV: Flat Data and Spreadsheet Guide | Huzaifa Tools',
    metaDescription: 'Convert a flat JSON array into CSV with a worked example. Check columns, missing values, quoting, formula-like strings and spreadsheet import types.',
    primaryKeyword: 'convert flat JSON to CSV',
    searchIntent: 'Turn a flat JSON object array into a reliable spreadsheet-ready table.',
    secondaryTopics: ['JSON array to CSV', 'CSV quoted fields', 'missing JSON keys', 'spreadsheet formula protection'],
    longTailQuestions: ['Can I convert nested JSON to CSV here?', 'Why are all CSV values quoted?', 'How do I preserve leading-zero identifiers?'],
    category: 'Developer Guides', relatedTools: ['json-to-csv', 'json-formatter', 'csv-to-json'],
    relatedArticles: ['format-javascript-without-executing', 'huzaifa-tools-guide'],
    faq: [
      { question: 'Does the converter flatten nested JSON?', answer: 'No. It accepts an array of flat objects and rejects nested arrays or objects. Decide the required row and column structure before using the tool.' },
      { question: 'What happens to missing values and null?', answer: 'Both become empty CSV cells in this implementation. If that distinction matters, add an explicit status field or choose a data format that retains it.' },
      { question: 'Why is an apostrophe added to some values?', answer: 'Formula-like string values and column names receive an apostrophe as a spreadsheet precaution. This changes those strings deliberately. Review your spreadsheet import because interpretation can vary.' },
      { question: 'What limits apply to conversion?', answer: 'Input is limited to 250,000 characters, 10,000 rows and 100 distinct columns. JSON numbers use JavaScript precision rules; exact long identifiers should be strings and imported as text.' }
    ],
    content: () => import('./blogPosts/json-to-csv-flat-data.js').then(m => m.default)
  },
  {
    toolSlug: 'javascript-formatter', articleSlug: 'format-javascript-without-executing',
    wordCount: 1407,
    title: 'Format JavaScript Without Executing It: A Practical Review Workflow',
    metaTitle: 'Format JavaScript Without Running It | Huzaifa Tools',
    metaDescription: 'Make JavaScript and JSX readable without executing the source. Follow a worked example and distinguish formatting, syntax feedback, linting and tests.',
    primaryKeyword: 'format JavaScript without executing it',
    searchIntent: 'Make JavaScript or JSX readable and understand syntax feedback without running the snippet.',
    secondaryTopics: ['JavaScript beautifier', 'Prettier browser formatter', 'JSX formatting', 'formatting versus linting'],
    longTailQuestions: ['Does formatting run pasted JavaScript?', 'Can this formatter handle TypeScript?', 'Does valid formatting prove code is safe?'],
    category: 'Developer Guides', relatedTools: ['javascript-formatter', 'css-formatter', 'json-formatter'],
    relatedArticles: ['json-to-csv-flat-data', 'huzaifa-tools-guide'],
    faq: [
      { question: 'Does the tool execute the JavaScript I paste?', answer: 'No. It parses and formats the source in a browser worker. It does not run submitted functions or import the dependencies named in your code.' },
      { question: 'Does it support JSX and TypeScript?', answer: 'The selected parser supports JavaScript and JSX. TypeScript is not supported by this interface; use your project\'s TypeScript-aware formatter for typed source.' },
      { question: 'Does successful formatting mean the code is correct or safe?', answer: 'No. It means the parser accepted the syntax. Runtime behavior, dependencies, security and project rules still need appropriate review and testing.' },
      { question: 'Can I change the formatting configuration?', answer: 'This interface uses the configured Prettier settings, including two-space indentation, without a project configuration picker. Use your repository\'s formatter before committing code that must follow its conventions.' }
    ],
    content: () => import('./blogPosts/format-javascript-without-executing.js').then(m => m.default)
  }
];

export default toolGuideTopics.map((topic, index) => ({
  ...topic,
  id: 22 + index,
  slug: topic.articleSlug,
  author: 'Huzaifa Group of Software',
  date: '2026-09-07',
  tags: [topic.toolSlug, topic.category.split(' ')[0].toLowerCase()],
  keywords: [topic.primaryKeyword, ...topic.secondaryTopics],
  ogTitle: topic.title,
  ogDescription: topic.metaDescription,
  featuredImage: '/logo.png',
  readingGuide: true,
  recommendedTools: topic.relatedTools,
  relatedSlugs: topic.relatedArticles,
  readingTime: `${Math.ceil(topic.wordCount / 200)} min read`
}));
