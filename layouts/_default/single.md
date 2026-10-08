{{ partial "markdown/front-matter.md" . }}
{{- if and .IsPage (eq .CurrentSection.Type "release-note") (not .Date.IsZero) }}
_{{ .Date | time.Format ":date_long" }}_
{{ partial "release-note-age-notice.md" . }}
{{- end }}
{{ partial "markdown/body.md" . }}
