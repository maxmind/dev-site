{{- if partial "release-note-is-old.html" . }}
{{- $text := printf `This release note is more than two years old and may no longer reflect
current behavior. View the
[latest release notes](%s).` .CurrentSection.RelPermalink }}
{{ partial "markdown/alert.md" (dict "kind" "warning" "inner" $text) | strings.TrimSpace }}
{{ end -}}
