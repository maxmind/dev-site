{{- /* Every page, grouped by top-level section and ordered by path, so a
       section page comes before its children. Single release notes are
       left out: there are hundreds, and each listing page links them. */ -}}
{{- range site.Sections -}}
## {{ .Title }}

{{ range sort (where site.Pages "Section" .Section) "Path" -}}
{{- if and .IsPage (eq .CurrentSection.Type "release-note") }}{{ continue }}{{ end -}}
{{ partial "markdown/page-link.md" . }}
{{ end }}
{{ end -}}
## General

{{ range site.Home.RegularPages -}}
{{ partial "markdown/page-link.md" . }}
{{ end -}}
