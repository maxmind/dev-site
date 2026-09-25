{{ partial "markdown/front-matter.md" . }}
{{ with partial "markdown/body.md" . }}{{ . }}

{{ end }}## Pages in this section

{{ range .Pages -}}
- [{{ .Title }}]({{ (.OutputFormats.Get "MARKDOWN").Permalink }})
{{ end -}}
