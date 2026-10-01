{{- if and .IsPage (eq .CurrentSection.Type "release-note") (not .Date.IsZero) -}}
# {{ .Title }}

_{{ .Date | time.Format ":date_long" }}_
{{ end -}}
{{- partial "clean-alerts.md" .RenderShortcodes -}}
