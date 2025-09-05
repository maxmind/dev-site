{{- partial "clean-alerts.md" .Content -}}

{{ range .Pages }}
## [{{ .Title }}]({{ .RelPermalink }})
{{ .Summary }}
{{ end }}