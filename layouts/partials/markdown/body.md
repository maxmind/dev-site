{{- /* Page content with shortcodes rendered by their .md templates. The
       Prettier and CSpell comments exist for the source tools and mean
       nothing to a reader of the output. Remove the whole line, so the
       blocks around the comment and the indent of the next line stay as they
       are. */ -}}
{{- $body := .RenderShortcodes -}}
{{- $body = replaceRE `(?m)^[ \t]*<!-- (prettier-ignore(-start|-end)?|cspell[^>]*) -->[ \t]*\n` "" $body -}}
{{- /* Point each internal link, in Markdown or in raw HTML, at the Markdown
       output of its page, so an agent that follows it stays in Markdown. A
       link to anything that is not a page with Markdown output, such as a
       file or a redirect, stays as it is. Paths hold only word characters,
       ".", "/", and "-", so "." is the one character to escape. */ -}}
{{- $paths := slice -}}
{{- $link := `(\]\(|href=")(%s)([#)\s"])` -}}
{{- range findRESubmatch (printf $link `/[\w./-]*`) $body -}}
  {{- $paths = $paths | append (index . 2) -}}
{{- end -}}
{{- range uniq $paths -}}
  {{- $path := . -}}
  {{- with site.GetPage (strings.TrimSuffix "/" $path) -}}
    {{- with .OutputFormats.Get "MARKDOWN" -}}
      {{- $body = replaceRE (printf $link (replace $path "." `\.`)) (printf "${1}%s${3}" .RelPermalink) $body -}}
    {{- end -}}
  {{- end -}}
{{- end -}}
{{- $body | strings.TrimSpace -}}
