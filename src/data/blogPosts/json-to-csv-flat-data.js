export default `An API sample or application export may arrive as JSON, while the next person needs a table. Converting the data to CSV is straightforward only when the shape of the JSON fits rows and columns. Nested objects, missing values and spreadsheet interpretation can otherwise change what the recipient sees.

[JSON to CSV](/json-to-csv) accepts an array of flat objects and produces quoted CSV with a header row. It runs in a browser worker, provides a copyable result and offers a file download. It does not flatten an arbitrary nested API response into a table automatically.

## Decide whether your JSON is tabular

The simplest fit is an array where each object represents one row and each property represents a column. Values can be strings, numbers, booleans or null. The objects do not have to contain exactly the same keys; the tool collects the union of their keys to create columns.

A nested value needs a design decision first. For example, \`{"customer":{"name":"Amina"}}\` could become a column named \`customer_name\`, but an order containing several line items might need several rows or a separate table. There is no universally correct flattening rule for both cases.

The current converter rejects nested objects and arrays rather than silently choosing a mapping. Prepare the structure in the application that produced the data or with an appropriate data-processing script. Do not delete nested values merely to make an error disappear if those values are necessary to the task.

## A worked conversion with missing columns

Consider this illustrative inventory sample:

\`\`\`json
[
  {"item":"Pen, blue","quantity":2,"note":"Desk"},
  {"item":"Notebook","quantity":1,"active":true}
]
\`\`\`

The first object introduces \`item\`, \`quantity\` and \`note\`. The second adds \`active\`, so the output has four columns. It contains two data rows plus the header:

\`\`\`csv
"item","quantity","note","active"
"Pen, blue","2","Desk",""
"Notebook","1","","true"
\`\`\`

The comma inside “Pen, blue” remains part of that cell because the value is quoted. The absent \`active\` value in the first object and absent \`note\` in the second become empty cells. A null value also becomes an empty cell, so CSV output does not preserve the distinction between missing and null in this implementation.

That is a material data-model choice. If the recipient needs to distinguish “not supplied” from “explicitly empty,” add an explicit status column or use a format and workflow that retains the distinction.

## Convert with the actual tool

1. Open [JSON to CSV](/json-to-csv).
2. Paste a JSON array into **JSON input**.
3. Select **Convert to CSV** and inspect any validation error.
4. Review **Output**, then use **Copy output** or download \`result.csv\`.
5. Import the file into the destination spreadsheet or data system and verify the column types.

The input is limited to 250,000 characters, 10,000 rows and 100 distinct column names. A single object is not an array, and an empty array does not provide usable rows. JSON property names and string values need double quotes; comments and trailing commas are not valid JSON.

If the input is difficult to inspect, use [JSON Formatter](/json-formatter) first to check its syntax and structure. Formatting valid JSON does not flatten nested objects, but it can make them easier to identify before conversion.

## Why every CSV field is quoted

CSV has familiar-looking punctuation but important escaping rules. Fields containing commas, quotes or line breaks need to remain within their intended columns and rows. This converter quotes every field and doubles any quote characters inside it.

For example, the text \`He said "ready"\` becomes the CSV field \`"He said ""ready"""\`. A newline inside a JSON string can become a newline inside a quoted CSV field. Counting visible lines in a text editor is therefore not always the same as counting CSV records.

The conventional quoting rules are described in [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180). The actual destination still matters: CSV importers differ in delimiter, encoding and type-detection behavior. Use an import workflow when an application's default double-click behavior produces the wrong columns.

The downloaded file uses comma separators and CRLF record endings. Copying through a text area or another application may normalize line endings. That difference alone does not mean the table's values changed, but it can matter to a system that compares exact file bytes.

## Spreadsheet formulas require special care

A spreadsheet may interpret certain leading characters as formulas when importing a cell. Quoting a CSV field is necessary for CSV structure, but it does not by itself make formula-like content inert in every spreadsheet workflow.

This converter prefixes an apostrophe to string values that begin with formula-like characters such as \`=\`, \`+\`, \`-\` or \`@\`, including cases with leading whitespace. It applies the same protection to column names. This deliberately changes those strings, so inspect the import result rather than expecting a byte-for-byte round trip.

For an illustrative string value \`"=1+1"\`, the CSV cell begins with an apostrophe before the equals sign. A genuine JSON number such as \`-2\` is handled as a number value, not as a formula-like string. If a field is an identifier rather than a measurement, think carefully about its type before exporting it.

Spreadsheet behavior can vary. Review the destination's import settings and treat untrusted datasets cautiously; no short converter rule replaces a controlled data-import policy. Keep the original JSON so you can distinguish protective transformations from source values later.

## Preserve identifiers and precision intentionally

JSON numbers are parsed using JavaScript's numeric representation. Very large integers may lose precision if they are supplied as numbers rather than strings. Do not use numeric JSON values for long identifiers when exact digits are required.

Leading zeros also need attention. A code such as \`"00125"\` can be preserved as a string in the CSV text while a spreadsheet's automatic type detection displays it as 125. Set that destination column to text during import when those zeros are significant.

Dates can have similar interpretation problems. An ambiguous date string may be interpreted differently across applications or locales. Agree on the data contract with the recipient and use explicit formats rather than assuming a CSV filename tells the importer how every value should be understood.

## Check the conversion as data, not just text

Compare the expected number of rows and distinct columns. Pick several representative cells: one containing punctuation, one missing value, one boolean, and any identifier or date field. Check those cells after import into the actual destination, not only in the browser output box.

If your table has extra columns, inspect the union of source keys. A misspelled property such as \`quantitiy\` is a different key from \`quantity\`; the converter does not infer that they should be merged. Correct the source deliberately and regenerate the export.

[CSV to JSON](/csv-to-json) provides the reverse direction, but a round trip is not guaranteed to restore original types or null semantics. Its current parser also has limitations with quoted multiline records. Use the [complete platform guide](/blog/huzaifa-tools-guide) for the broader tool boundaries rather than treating opposite tool names as a promise of reversible conversion.

## Local processing and the final handoff

The converter parses data in a separate browser worker and does not upload the input to a conversion server. Generated files and copied text can still contain personal or confidential records. Use a non-sensitive sample while learning, then follow your own data-handling requirements for real exports.

Consult the [privacy policy](/privacy-policy) for site-wide information. If you report an issue through [Contact](/contact), a small anonymized example with the expected table is more useful than a full private dataset.

When the JSON is flat, the columns are intentional and the destination's type settings are clear, [convert it to CSV](/json-to-csv). Keep the source alongside the accepted export so the next person can trace how the table was produced.
`;
