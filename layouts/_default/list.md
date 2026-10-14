{{ partial "markdown/front-matter.md" . }}
{{ with partial "markdown/body.md" . }}{{ . }}

{{ end }}## Pages in this section

{{ range .Pages -}}
{{ partial "markdown/page-link.md" . }}
{{ end -}}
