# Documentation Style Guide

## About This Repository

This repository contains technical documentation for MaxMind's products and services, including API documentation for GeoIP and minFraud web services, database documentation, and release notes. The content is written in Markdown and rendered using Hugo.

When reviewing pull requests, approach this as **documentation review**, not code review. Focus on:

- **Clarity and accuracy** of the technical content
- **Grammar, spelling, and punctuation** errors that affect readability
- **Consistency** in terminology, formatting, and style
- **Correctness** of cross-references, links, and technical details
- **Brand compliance** for MaxMind product names and third-party references

Documentation errors directly impact customers integrating with MaxMind APIs, so catching issues like incorrect field names, wrong links, or misleading descriptions is important.

## Grammar

### Articles

- Ensure correct article usage ("a" vs "an") based on the following sound:
  - Use "an" before vowel sounds: "an HTTP request", "an ISO code", "an API"
  - Use "a" before consonant sounds: "a TLS connection", "a user"
- Check for missing articles before singular countable nouns: "If you are a Proxy Detection customer" (not "If you are Proxy Detection customer")
- Check for incorrect articles before uncountable nouns: "MaxMind offers free geolocation data" (not "MaxMind offers a free geolocation data")

### Subject-Verb Agreement

- Singular subjects require singular verbs: "A GeoLite Country request follows the same structure" (not "follow")
- Check that verbs agree with their subjects, especially in complex sentences

### Missing Words

- Watch for missing prepositions: "services using your Sandbox account" (not "services your Sandbox account")
- Watch for missing verbs: "the IP address risk ranges from" (not "the IP address ranges from")
- Check for incomplete phrases: "APIs to see how" (not "APIs see how")

### Word Choice

- "affect" (verb) vs "effect" (noun): "This will also affect minFraud API requests"
- "rather than" (not "rather the")
- Check for incorrect verb forms in context: "completing surveys" vs "complete surveys" depending on context

### Parallel Structure

- Use parallel verb forms in lists and compound phrases:
  - "identifying... and reducing" (not "identifying... and reduce")
  - "helps protect your business by identifying proxy traffic and reducing false positives"
- Ensure subject-verb agreement in parenthetical clarifications: "The last 3 often default to" (not "defaults to" when subject is plural)

## Punctuation

### Periods

- All sentences must end with a period, including:
  - Table cell descriptions
  - List items that are complete sentences
  - Field descriptions in API documentation

### Commas

- Use commas before the final item in a list of three or more (Oxford comma): "resellers, payment providers, gateways, and affiliate networks"
- Use commas after introductory conditional phrases: "If you don't, you will receive..."
- Use commas after introductory adverbs: "Currently, we will only provide..." (not "Currently we will...")
- Use commas after introductory transitional words: "Instead, we recommend..." (not "Instead we recommend...")
- Use commas between independent clauses joined by conjunctions: "Likewise, we never return a risk score of 100"
- Ensure space after commas: "client APIs, and" (not "client APIs,and")

### Colons

- Use a colon (not a period) before introducing a list: "one of the following values:" (not "one of the following values.")

### Spacing Around Code Formatting

- Ensure a space before opening backticks: "set to `0`" (not "set to`0`")
- Ensure a space after closing backticks when followed by text: "`false` if" (not "`false`if")
- Check for missing spaces before inline code: "e.g., `token-`" (not "e.g.,`token-`")

## Typos and Duplicates

### Duplicate Words

Watch for accidentally duplicated words or phrases:
- "to to" should be "to"
- "for for" should be "for"
- "ensure ensure" should be "ensure"
- "country code country code" should be "country code"
- "for the for the" should be "for the"

### Common Misspellings

- Check for transposed or missing letters in technical terms
- Watch for typos in city/place names in documentation

## Brand and Product Names

### MaxMind Brand

- "MaxMind" (not "Maxmind" or "maxmind")
- "minFraud" (not "minfraud" or "Minfraud" or "MinFraud")
- "GeoIP" (not "Geoip" or "geoip")
- "GeoLite" (not "Geolite" or "geolite")

### External Brand Names

- "SafeKey" (not "Safekey")
- "Surfshark" (not "SurfShark") - VPN provider
- "npm" (not "NPM") - Node.js package manager
- "Knowledge Base" (capitalized when referring to MaxMind's Knowledge Base)
- Verify capitalization of third-party product and company names

### Acronyms

- "ISO" (not "iso")
- "HTTP" (not "http" in prose)
- "API" (not "api" in prose)

## Technical Accuracy

### HTTP Status Codes

- Use standard HTTP status text: "503 Service Unavailable" (not "503 Service Not Available")
- Verify HTTP status codes match their standard descriptions

### Numeric Values

- Verify numeric bounds and limits are correct (e.g., "1e13-1" vs "1e14-1")
- Check that years are correct in release notes and dated content
- Verify version numbers are formatted correctly (e.g., "v1.0" not "v.10")

### File Names and Paths

- Verify file names match actual file naming conventions
- Use lowercase file extensions: `.csv` (not `.CSV`)
- Check for double slashes in paths: "/static/csv/file.csv" (not "/static/csv//file.csv")
- Verify CSV file name patterns match documented conventions
- Use consistent placeholder formats in file name patterns: `{locale}` (not `XX`)

## Cross-References and Links

### Internal Links

- Verify links point to the correct documentation section
- Check that anchor links reference the correct target (e.g., billing links to billing section, not shipping)
- Ensure links to request documentation don't accidentally point to response documentation and vice versa
- Prefer explicit links over vague references: "[Response Body section](/path#anchor)" (not "the Response Body section below")

### Link Text

- Link text should accurately describe the destination:
  - "README" (not "README.md") for README link text
- Ensure purchase links point to the correct product: GeoIP pages should link to GeoIP purchase pages, not minFraud

### Product References

- Ensure product references are contextually correct (e.g., don't reference "minFraud scoring engine" on a GeoIP-only page)
- Verify that field descriptions reference the correct input/output context

## Consistency

### Terminology

- Use consistent terminology throughout:
  - "postal code" (not sometimes "postal" and sometimes "postal code")
  - "endpoint" (one word, not "end point")
  - "end user" (two words as a noun, but "end-user" as an adjective)
  - "real-time" (hyphenated, not "realtime")
  - "second-level" (hyphenated when used as an adjective: "second-level domain")
  - "two-part" (hyphenated when used as an adjective: "two-part versions")
  - "two-character" (hyphenated when used as an adjective)
  - "floating-point number" (not "floating number")
  - "connection types" (not "connection speeds" when describing connection type data)
  - "requests" (not "queries" when referring to HTTP requests)

### Placeholder Formats

- Use consistent placeholder formats within the same document: "[SERVICE-TYPE]" not "[SERVICE TYPE]" if hyphens are used elsewhere

### Field Descriptions

- Ensure boolean field descriptions are consistent: "This field is `true` if... It is `false` when..."
- Verify that "billing" and "shipping" references are correct in their respective sections

## Formatting

### Markdown

- Avoid mixing HTML tags with Hugo shortcodes incorrectly
- Ensure consistent list marker style within documents
- Remove trailing whitespace from lines
- Verify table alignment characters are consistent

### Hugo Shortcodes

- Include a space before the closing delimiter in shortcodes: `{{</ alert >}}` (not `{{</ alert>}}`)

### Code Blocks

- Ensure code comments are properly closed (e.g., no unclosed backticks in comments)
- Verify code examples use correct syntax for the language

### Inline Code Formatting

- Format field names as code when referenced in prose: `ipv4_32` (not plain text ipv4_32)
- Format file names in examples as code: `GeoIP2-Enterprise-Locations-en.csv`
- Format time zone identifiers as code: `America/New_York` (not quoted "America/New_York")

## Content Accuracy

### API Documentation

- Check for duplicate field definitions
- Verify field descriptions match the field being documented (e.g., shipping field descriptions shouldn't reference billing)
- Ensure value type annotations are correct and consistent

### Descriptions

- "Response API documentation" when linking to responses (not "Request API documentation")
- "output" when describing response fields (not "input")
- Verify that "above" and "below" references point in the correct direction relative to their position

### Word Order

- "location data" (not "data location")
- "autonomous system number and organization" (number is the primary identifier, list it first)

### Contextual Accuracy

- Field descriptions should reference the correct parent object:
  - In `registered_country` section: "not included in the `registered_country` object" (not `country` object)
  - In `represented_country` section: "not included in the `represented_country` object" (not `country` object)
- Knowledge Base links should match their descriptive text (link text should describe what user will see/do)

## Page Titles

### Database Documentation

- Database page titles should be plural: "GeoLite ASN Databases" (not "GeoLite ASN Database")
