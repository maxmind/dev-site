{{- $row := dict "key" (.Get "key") "valueType" (.Get "valueType") "valueTypeNote" (.Get "valueTypeNote") "inner" .Inner "page" .Page "level" (.Parent.Get "headingLevel") "row" . -}}
{{- if eq (.Get "type") "response" -}}
  {{- $services := slice -}}
  {{- if eq (.Get "score") "true" }}{{ $services = $services | append "minFraud Score" }}{{ end -}}
  {{- if eq (.Get "insights") "true" }}{{ $services = $services | append "minFraud Insights" }}{{ end -}}
  {{- if eq (.Get "factors") "true" }}{{ $services = $services | append "minFraud Factors" }}{{ end -}}
  {{- $row = merge $row (dict "services" $services) -}}
{{- end -}}
{{- /* A field can take its section's slug. Link to the anchor-target. */ -}}
{{- with .Get "fragmentOverride" -}}
  {{- $link := printf "](#%s)" . -}}
  {{- if not (strings.Contains $.Inner $link) -}}
    {{- errorf "%s: field %q: no %q link to its section" $.Page.File.Path ($.Get "key") $link -}}
  {{- end -}}
  {{- $row = merge $row (dict "inner" (replace $.Inner $link (printf "](#schema--%s--%s)" ($.Get "type") .))) -}}
{{- end -}}
{{- /* This comment ends without a trim marker on purpose. The content
       indents each shortcode call by two spaces. The newline after the
       comment moves those spaces onto a blank line, so the heading starts at
       column one. */}}
{{ partial "markdown/schema-row.md" $row }}
