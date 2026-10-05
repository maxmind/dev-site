{{ partial "markdown/front-matter.md" . }}
{{ with partial "markdown/body.md" . }}{{ . }}

{{ end }}## Pages in this section

{{ range .Pages -}}
- [{{ .LinkTitle }}]({{ (.OutputFormats.Get "MARKDOWN").Permalink }})
{{ end -}}
