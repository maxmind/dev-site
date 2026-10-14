{{- /* A list item that links to a page's Markdown output. Hugo returns an
       empty permalink for a missing output format, so fail instead of
       writing an empty link. */ -}}
{{- with .OutputFormats.Get "MARKDOWN" -}}
- {{ if and $.IsPage (eq $.CurrentSection.Type "release-note") }}{{ $.Date | time.Format "2006-01-02" }}: {{ end -}}
[{{ $.LinkTitle }}]({{ .Permalink }})
{{- else -}}
{{- errorf "%s has no Markdown output to link to" $.Path -}}
{{- end -}}
