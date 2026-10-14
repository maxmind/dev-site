{{ partial "markdown/front-matter.md" . }}
{{- $body := partial "markdown/body.md" . }}
{{ with $body }}{{ . }}

{{ end -}}
{{- /* Leave out the children that the body already links, for example in a
       link group, so the page does not list them twice. */ -}}
{{- $unlinked := slice -}}
{{- range .Pages -}}
  {{- $url := strings.TrimSuffix "/" .RelPermalink -}}
  {{- if not (or (strings.Contains $body (printf "](%s)" $url)) (strings.Contains $body (printf "](%s/)" $url))) -}}
    {{- $unlinked = $unlinked | append . -}}
  {{- end -}}
{{- end -}}
{{- with $unlinked -}}
## Pages in this section

{{ range . -}}
{{ partial "markdown/page-link.md" . }}
{{ end -}}
{{- end -}}
