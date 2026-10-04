// Repository-authored editorial content; no visitor HTML is accepted.
export default `A long address can hide the piece you need to understand. A familiar brand name in the path is not the hostname, a fragment is not a query parameter, and an encoded ampersand can belong to a value instead of separating fields. Parsing makes those boundaries visible before you decide what to do next.

The [URL Parser](/url-parser) uses the browser's URL constructor and shows protocol, origin, host, hostname, port, path, raw query, fragment and decoded query entries. It accepts absolute HTTP and HTTPS URLs. It does not visit the address, follow redirects, retrieve content or declare that a destination is safe.

## Inspect a concrete address

Paste “https://example.com:8443/search?q=tea%20%26%20cake&page=2#results”. The origin is https://example.com:8443. The hostname is example.com, while the host includes the explicit port. The path is /search. The query contains q and page, and the fragment is #results.

The parameter display decodes the q value as “tea & cake”. The encoded ampersand belongs to that value; it does not start another parameter. The raw query remains visible so you can compare the original syntax with the decoded entries.

This is a structural example, not a recommendation to visit a service. The tool requires an absolute web URL because it has no base address with which to resolve a relative value such as /search?page=2.

## Origin, host and hostname answer different questions

Origin combines the scheme, hostname and effective port. Host contains the hostname and any explicit non-default port. Hostname excludes the port. Path identifies the resource location within that host.

When checking where an address points, read the protocol and hostname before looking at familiar words elsewhere. In https://example.net/payments/bank-name, “bank-name” is part of the path; it does not make example.net the bank's domain. A subdomain also reads from right to left around the registered domain: accounts.example.com is under example.com, while example.com.attacker.test is under attacker.test.

Parsing exposes structure but does not establish ownership or reputation. It cannot tell whether a domain was compromised, whether a page is honest or where a redirect will eventually lead.

## Treat embedded credentials as a warning

A URL can contain username or password information before the hostname. The parser reports that credentials are present without displaying their values in the result. Remove embedded credentials before sharing a URL or screenshot.

Do not treat that warning as secret removal from every place. The original input remains visible in the input field and may already exist in a clipboard, message or browser history. Rotate a real exposed credential through the service that issued it rather than relying on visual redaction alone.

## Query entries can repeat or be empty

An address may contain the same parameter name more than once. The tool keeps entries in order instead of collapsing them into one object property. A receiving application may choose the first value, last value or all values, so duplicate names are an important debugging clue.

For example, ?tag=red&tag=blue contains two tag entries. The parser displays both. It also labels an empty value in ?preview= so that an intentionally present parameter is not confused with a missing query string.

The fragment appears separately. It can identify a location or client-side state, but browsers normally do not send it in an HTTP request. An application can still read it locally, so fragments should not be treated as a suitable place for secrets.

## Understand normalisation and encoding

The browser may normalise an address while parsing it. Internationalised hostnames can be represented in ASCII form, default ports may be omitted, and dot segments can be resolved. This tool is therefore not an exact original-byte preservation utility.

[URL Encoder/Decoder](/url-encoder) helps inspect percent encoding for an individual component. Encode values at the correct layer rather than encoding the complete URL indiscriminately. A plus sign may also have a form-specific meaning that differs from the component decoder's behaviour.

If a decoded value looks readable, that does not make it harmless. Encoding changes representation, not authorisation, privacy or trust.

## Use parsing as a diagnostic step

1. Copy the address without opening it.
2. Paste the complete HTTP or HTTPS value and choose Parse URL.
3. Inspect protocol, origin and hostname first.
4. Check for the credentials warning and an unexpected port.
5. Compare the raw query with decoded parameter entries.
6. Check duplicate names, empty values and the fragment.
7. Correct malformed links using the originating application's URL-building API.

If the address will be embedded in a QR code, verify the final structure before using [QR Code Generator](/qr-code-generator). That generator sends the supplied value to an external image service, unlike this local parsing step. The [QR Code Scanner guide](/blog/scan-a-qr-code-and-review-the-decoded-text) explains why decoding a code is not permission to open its destination.

## Privacy and processing boundaries

Parsing happens locally in the browser and does not fetch the destination. Query strings can nevertheless contain reset tokens, customer identifiers, private search terms or analytics values. Use a harmless substitute when demonstrating a problem and avoid publishing the original input in screenshots.

The parser supports HTTP and HTTPS URLs, not arbitrary schemes such as file, data or ftp. A successful parse means the supplied web address has a structure the browser understands. It is not a network availability check, malware scan or security verdict.

Read the [Privacy Policy](/privacy-policy) for the wider site context. Open the [URL Parser](/url-parser) when you need structural clarity, then use appropriate domain, network and application checks for ownership, redirects, availability and trust.
`;
