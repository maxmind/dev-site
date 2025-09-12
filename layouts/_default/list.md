{{- partial "clean-alerts.md" .RenderShortcodes -}}

{{ range .Pages }}
## [{{ .Title }}]({{ .RelPermalink }})
{{ .Summary }}
{{ end }}
