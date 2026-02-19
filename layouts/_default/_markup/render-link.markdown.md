{{- /* Render link as markdown */ -}}
[{{ .Text }}]({{ .Destination }}{{ with .Title }} "{{ . }}"{{ end }})
{{- /* Strip trailing newline */ -}}
