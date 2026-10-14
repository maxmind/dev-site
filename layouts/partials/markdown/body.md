{{- /* Page content with shortcodes rendered by their .md templates. The
       Prettier and CSpell comments exist for the source tools and mean
       nothing to a reader of the output. */ -}}
{{- $body := .RenderShortcodes -}}
{{- $body = replaceRE `<!-- (prettier-ignore(-start|-end)?|cspell[^>]*) -->\n*` "" $body -}}
{{- $body | strings.TrimSpace -}}
