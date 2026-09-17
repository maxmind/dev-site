{{- if and .IsPage (not .Date.IsZero) -}}
# {{ .Title }}

_{{ .Date | time.Format ":date_long" }}_
{{ end -}}
{{- partial "clean-alerts.md" .RenderShortcodes -}}
