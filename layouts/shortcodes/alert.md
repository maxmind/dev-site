{{- $kind := "" -}}
{{- with .Params }}{{ $kind = index . 0 }}{{ end -}}
{{ partial "markdown/alert.md" (dict "kind" $kind "inner" .Inner) }}
