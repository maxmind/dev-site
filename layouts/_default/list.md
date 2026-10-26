{{ partial "markdown/front-matter.md" . }}
{{- $body := partial "markdown/body.md" . }}
{{ $body }}
{{- /* Leave out the children that the body already links, for example in a
       link group, so the page does not list them twice. */ -}}
{{- $unlinked := slice -}}
{{- range .Pages -}}
  {{- if not (strings.Contains $body (printf "](%s)" (.OutputFormats.Get "MARKDOWN").RelPermalink)) -}}
    {{- $unlinked = $unlinked | append . -}}
  {{- end -}}
{{- end -}}
{{- /* One blank line between the body and the list, and no blank lines at
       the end when every child is already linked. */ -}}
{{- with $unlinked }}
{{ with $body }}
{{ end -}}
## Pages in this section

{{ range . -}}
{{ partial "markdown/page-link.md" . }}
{{ end -}}
{{- end -}}
