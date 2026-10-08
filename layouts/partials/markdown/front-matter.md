{{- /* Front matter and H1 for a page's Markdown output. The HTML output has
       neither: its page template renders the title. */ -}}
---
title: {{ .Title | jsonify (dict "noHTMLEscape" true) }}
{{- with .Description }}
description: {{ . | jsonify (dict "noHTMLEscape" true) }}
{{- end }}
url: {{ (.OutputFormats.Get "HTML").Permalink }}
---

# {{ .Title }}
