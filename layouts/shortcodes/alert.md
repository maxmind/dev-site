{{- if len .Params | eq 1 -}}
{{- if eq (index .Params 0) "warning" -}}
> **⚠️ Warning**
> 
{{ .Inner }}
{{- else if eq (index .Params 0) "info" -}}
> **ℹ️ Info**
> 
{{ .Inner }}
{{- else -}}
> **Note**
> 
{{ .Inner }}
{{- end -}}
{{- else -}}
> {{ .Inner }}
{{- end -}}