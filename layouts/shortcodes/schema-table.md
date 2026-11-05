{{- /* Rows render as headed entries, not a table: a description can hold
       paragraphs, lists, and tables, which a Markdown table cell cannot. The
       source puts blank and whitespace-only lines between rows. Collapse only
       those, so blank lines inside a code sample stay. */ -}}
{{- /* headingLevel is the level of each field heading, 4 by default. Set
       it to one level below the heading of the section that holds the
       table. */ -}}
{{- $level := int (.Get "headingLevel" | default 4) -}}
{{- if or (lt $level 2) (gt $level 6) -}}
  {{- errorf "%s: schema-table %q: headingLevel must be 2 to 6, not %d" .Page.File.Path (.Get "key") $level -}}
{{- end -}}
{{ replaceRE (printf "\n\\s*\n(%s `)" (strings.Repeat $level "#")) "\n\n$1" .Inner | strings.TrimSpace }}
