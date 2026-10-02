+++
title = 'ISP output can be used as a parameter for custom rules'
date = 2023-12-04T16:00:00Z
draft = false
legacy_anchor = 'isp-output-can-be-used-as-a-parameter-for-custom-rules'
+++

You can now use the `/ip_address/traits/isp` output in minFraud custom rules,
with the following operators: matches, does not match, contains, does not
contain.

Filtering transactions by ISP can be especially helpful if you notice certain
ISPs are more likely to be associated with fraudulent behavior.

You can select the ISP output as a parameter in custom rules by selecting
minFraud outputs > ISP when defining a new condition for a custom rule.

- [Learn more about setting custom rule conditions on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/create-a-custom-rule-minfraud-maxmind#create-custom-rule)
