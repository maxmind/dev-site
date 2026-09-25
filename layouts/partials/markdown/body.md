{{- /* Page content with shortcodes rendered by their .md templates. The
       Prettier markers exist for the source formatter and mean nothing to a
       reader of the output. */ -}}
{{- $body := .RenderShortcodes -}}
{{- $body = replaceRE `<!-- prettier-ignore-(start|end) -->\n*` "" $body -}}
{{- $body | strings.TrimSpace -}}
