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
       the smallest space indent of the lines with text, so block syntax
       inside the description renders and nested lists keep their nesting.
       Text on the opening-tag line has no indent, so that line is not
       measured or stripped. Only spaces are counted, so a tab in an indent
       stops the build. */ -}}
{{- if findRE `(?m)^ *\t` .inner 1 -}}
  {{- errorf "%s: field %q: tabs are not allowed in schema-row indents" .page.File.Path .key -}}
{{- end -}}
{{- $head := replaceRE `(?s)\n.*` "" .inner -}}
{{- $body := strings.TrimPrefix $head .inner -}}
{{- $indent := -1 -}}
{{- range findRE `(?m)^ *\S` $body -}}
  {{- $n := sub (len .) (len (strings.TrimLeft " " .)) -}}
  {{- if or (lt $indent 0) (lt $n $indent) }}{{ $indent = $n }}{{ end -}}
{{- end -}}
{{- if gt $indent 0 }}{{ $body = replaceRE (printf `(?m)^ {%d}` $indent) "" $body }}{{ end -}}
{{ add $head $body | strings.TrimSpace }}
