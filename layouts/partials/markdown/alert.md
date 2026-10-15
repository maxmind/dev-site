{{- /* An alert as a blockquote. Every line gets the quote marker, because a
       blank line without one would end the quote after the label. */ -}}
{{- $labels := dict "warning" "⚠️ Warning" "info" "ℹ️ Info" "danger" "🚫 Danger" -}}
{{- with .kind }}
{{- $label := index $labels . -}}
{{- if not $label }}{{ errorf "Unknown alert kind %q" . }}{{ end }}
> **{{ $label }}**
>
{{ end -}}
{{ replaceRE `(?m)^` "> " (strings.TrimSpace .inner) }}
