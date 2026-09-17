+++
title = 'Session age input can be used as a parameter for custom rules'
date = 2023-12-11T16:00:00Z
draft = false
legacy_anchor = 'session-age-input-can-be-used-as-a-parameter-for-custom-rules'
[build]
  list = 'never'
+++

You can now use the `/device/session_age` input in minFraud custom rules.
Session age can be used to detect patterns of device usage across multiple
sessions to help determine risk. For example, short sessions may be a higher
indicator of risk.

You can select the session age input as a parameter in custom rules by selecting
minFraud inputs > Session age when defining a new condition for a custom rule.

- [Learn more about setting custom rule conditions on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/create-a-custom-rule-minfraud-maxmind#create-custom-rule)
- [Learn more about session inputs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/device-inputs-minfraud#session-information)
