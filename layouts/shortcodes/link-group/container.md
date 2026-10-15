{{- /* The inner content is YAML: a list of cards with heading, url, and
       text. Render each card as a list item. */ -}}
{{ if .Get "heading" }}## {{ .Get "heading" }}

{{ end -}}
{{ range $card := .Inner | unmarshal -}}
{{ with .heading }}- [{{ . }}]({{ $card.url }}): {{ $card.text }}{{ else }}- [{{ .text }}]({{ .url }}){{ end }}
{{ end -}}
