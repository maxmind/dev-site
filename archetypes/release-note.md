+++
title = '{{ replaceRE "^[0-9]{4}-[0-9]{2}-[0-9]{2}-" "" .File.ContentBaseName | humanize }}'
date = {{ .Date }}
draft = false
+++
