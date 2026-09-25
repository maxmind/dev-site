{{- $type := .Get "valueType" -}}
{{- with .Get "valueTypeNote" }}{{ $type = printf "%s (%s)" $type . }}{{ end -}}
{{- $services := slice -}}
{{- if eq (.Get "country") "true" }}{{ $services = $services | append "GeoIP Country" }}{{ end -}}
{{- if eq (.Get "city") "true" }}{{ $services = $services | append "GeoIP City Plus" }}{{ end -}}
{{- if eq (.Get "insights") "true" }}{{ $services = $services | append "GeoIP Insights" }}{{ end -}}
{{- /* This comment ends without a trim marker on purpose. The content
       indents each shortcode call by two spaces. The newline after the
       comment moves those spaces onto a blank line, so the heading starts at
       column one. */}}
{{ partial "markdown/schema-row.md" (dict "key" (.Get "key") "type" $type "services" $services "inner" .Inner) }}
