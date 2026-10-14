{{- /* Rows render as headed entries, not a table: a description can hold
       paragraphs, lists, and tables, which a Markdown table cell cannot. The
       source puts blank and whitespace-only lines between rows. Collapse only
       those, so blank lines inside a code sample stay. */ -}}
{{ replaceRE "\n\\s*\n(#### `)" "\n\n$1" .Inner | strings.TrimSpace }}
