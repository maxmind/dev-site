{{- /* Rows render as headed entries, not a table: a description can hold
       paragraphs, lists, and tables, which a Markdown table cell cannot. The
       source indents each row call, which leaves whitespace-only lines
       between rows. */ -}}
{{ replaceRE `\n\s*\n` "\n\n" .Inner | strings.TrimSpace }}
