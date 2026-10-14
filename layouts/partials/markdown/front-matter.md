{{- /* Front matter and H1 for a page's Markdown output. The HTML output has
       neither: its page template renders the title. LinkTitle, because a
       page such as "Web" under Track Devices sets a full name there. The
       home page uses the site name that llms.txt and the HTML titles use. */ -}}
{{- $title := cond .IsHome "MaxMind Developer Portal" .LinkTitle -}}
---
title: {{ $title | jsonify (dict "noHTMLEscape" true) }}
{{- with .Description }}
description: {{ . | jsonify (dict "noHTMLEscape" true) }}
{{- end }}
url: {{ (.OutputFormats.Get "HTML").Permalink | jsonify (dict "noHTMLEscape" true) }}
---

# {{ $title }}
