{{- $asset := "" }}

{{- with (.Get 0) }}
  {{- $asset = . }}
{{- else }}
  {{- errorf "The %q shortcode requires a single positional parameter; the relative path to a file in the assets directory. See %s" .Name .Position}}
{{- end }}

{{- $r := "" }}
{{- with resources.Get $asset }}
  {{- $r = . }}
{{- else }}
  {{- errorf "The %q shortcode was unable to find %q. See %s" .Name $asset .Position}}
{{- end }}

{{- /* The HTML shortcode passes the snippet through RenderString, which
       also runs the shortcodes inside it. Here that would turn Markdown into
       HTML, so the snippet is used as is and its alert shortcodes stay
       literal. Render them the way the alert shortcode does. */ -}}
{{- $md := $r.Content -}}
{{- range findRE `(?s)\{\{<\s*alert\s*\w*\s*>\}\}.*?\{\{</\s*alert\s*>\}\}` $md -}}
  {{- $kind := replaceRE `(?s)^\{\{<\s*alert\s*(\w*)\s*>\}\}.*` "$1" . -}}
  {{- $inner := replaceRE `(?s)^\{\{<[^>]*>\}\}(.*)\{\{</\s*alert\s*>\}\}$` "$1" . -}}
  {{- $md = replace $md . (partial "markdown/alert.md" (dict "kind" $kind "inner" $inner)) -}}
{{- end -}}
{{- $md -}}