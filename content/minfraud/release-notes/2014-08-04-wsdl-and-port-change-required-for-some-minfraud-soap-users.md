+++
title = 'WSDL and Port Change Required for Some minFraud SOAP Users'
date = 2014-08-04T16:00:00Z
draft = false
legacy_anchor = 'wsdl-and-port-change-required-for-some-minfraud-soap-users'
[build]
  list = 'never'
+++

On August 11, we will discontinue serving requests to port 8005. Users of WSDL
version 2 and 4 must take action to ensure continuation of service. We ask that
you upgrade your WSDL:

- To access the latest inputs and outputs, we recommend you upgrade to our
  latest WDSL and upgrade to minfraud version 1.3. Note that the old score and
  explanation outputs are no longer supported in the latest WDSL.
- If your system requires score and explanation for backwards compatibility, you
  may upgrade to WSDL version 5.

In addition, on August 5, we will disable the web services on port 8005 for one
hour starting at 1pm UTC.

Please [contact our support team](https://support.maxmind.com/knowledge-base) if
you have any questions.
