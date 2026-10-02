{{- if and .IsPage (eq .CurrentSection.Type "release-note") (not .Date.IsZero) -}}
# {{ .Title }}

_{{ .Date | time.Format ":date_long" }}_
{{ partial "release-note-age-notice.md" . }}
{{- end -}}
{{- partial "clean-alerts.md" .RenderShortcodes -}}
