{{ partial "markdown/front-matter.md" . }}
{{- $body := partial "markdown/body.md" . }}
{{ $body }}
{{- /* Leave out the children that the body already links, for example in a
       link group, so the page does not list them twice. A link in a table
       row does not count: its text is often not the name of the page. */ -}}
{{- $prose := replaceRE `(?m)^\|.*$` "" $body -}}
{{- $unlinked := slice -}}
{{- range .Pages -}}
  {{- if not (strings.Contains $prose (printf "](%s)" (.OutputFormats.Get "MARKDOWN").RelPermalink)) -}}
    {{- $unlinked = $unlinked | append . -}}
  {{- end -}}
{{- end -}}
{{- /* End the body with a newline, and add a blank line before the list.
       A page with no body needs neither. */ -}}
{{- if $body }}
{{ end -}}
{{- with $unlinked }}
{{- if $body }}
{{ end -}}
## Pages in this section

{{ range . -}}
{{ partial "markdown/page-link.md" . }}
{{ end -}}
{{- end -}}
