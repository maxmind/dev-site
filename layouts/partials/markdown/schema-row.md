{{- /* One API field as a headed entry, not a table row: a description can
       hold paragraphs, lists, and tables, which a Markdown table cell cannot.
       A request field has no .services, because no service "returns" it. */ -}}
{{- if and (isset . "services") (not .services) -}}
  {{- errorf "Field %q is available in no service" .key -}}
{{- end -}}
{{- $type := .valueType -}}
{{- with .valueTypeNote }}{{ $type = printf "%s (%s)" $type . }}{{ end -}}
#### `{{ .key }}`

Type: {{ $type }}.{{ with .services }} Available in: {{ delimit . ", " }}.{{ end }}

{{/* The content indents the description under the shortcode call. Strip
       the smallest indent of the non-blank lines, so block syntax inside
       the description renders and nested lists keep their nesting. */ -}}
{{- $inner := .inner -}}
{{- $indent := -1 -}}
{{- range findRE `(?m)^ *\S` $inner -}}
  {{- $n := sub (len .) (len (strings.TrimLeft " " .)) -}}
  {{- if or (lt $indent 0) (lt $n $indent) }}{{ $indent = $n }}{{ end -}}
{{- end -}}
{{- if gt $indent 0 }}{{ $inner = replaceRE (printf `(?m)^ {%d}` $indent) "" $inner }}{{ end -}}
{{ $inner | strings.TrimSpace }}
