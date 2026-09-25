{{- /* One API field as a headed entry, not a table row: a description can
       hold paragraphs, lists, and tables, which a Markdown table cell cannot.
       A request field has no .services, because no service "returns" it. */ -}}
{{- if and (isset . "services") (not .services) -}}
  {{- errorf "Field %q is available in no service" .key -}}
{{- end -}}
#### `{{ .key }}`

Type: {{ .type }}.{{ with .services }} Available in: {{ delimit . ", " }}.{{ end }}

{{/* The content indents the description by two spaces under the shortcode
       call. Strip the indent so block syntax inside it renders. */}}
{{ replaceRE `(?m)^  ` "" .inner | strings.TrimSpace }}
