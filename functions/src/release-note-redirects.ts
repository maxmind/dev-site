/* eslint max-len: "off", filenames/match-exported: "off" */

const geoipMap = [
  {
    destination: '/geoip/release-notes/#geonames-monthly-diff-report-may-2021',
    source: '/release-note/geonames-monthly-diff-report-may-2021',
  },
  {
    destination: '/geoip/release-notes/#geonames-monthly-diff-report-april-2021',
    source: '/release-note/geonames-monthly-diff-report-april-2021',
  },
  {
    destination: '/geoip/release-notes/#geonames-monthly-diff-report-march-2021',
    source: '/release-note/geonames-monthly-diff-report-march-2021',
  },
  {
    destination: '/geoip/release-notes/#geonames-monthly-diff-report-february-2021',
    source: '/release-note/geonames-monthly-diff-report-february-2021',
  },
  {
    destination: '/geoip/release-notes/#mapping-more-telstra-internet-mobile-networks-to-a-state',
    source: '/release-note/mapping-more-telstra-internet-mobile-networks-to-a-state',
  },
  {
    destination: '/geoip/release-notes/#changes-to-isp-names-for-vodafone-germany',
    source: '/release-note/changes-to-isp-names-for-vodafone-germany',
  },
  {
    destination: '/geoip/release-notes/#geonames-monthly-diff-report-january-2021',
    source: '/release-note/geonames-monthly-diff-report-january-2021',
  },
  {
    destination: '/geoip/release-notes/2020#united-kingdom-will-no-longer-be-flagged-is_in_european_union',
    source: '/release-note/united-kingdom-will-no-longer-be-flagged-is_in_european_union',
  },
  {
    destination: '/geoip/release-notes/2020#geolite2-web-service-released',
    source: '/release-note/geolite2-web-service-released',
  },
  {
    destination: '/geoip/release-notes/2020#notifications-for-database-update-delays',
    source: '/release-note/notifications-for-database-update-delays',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-december-2020',
    source: '/release-note/geonames-monthly-diff-report-december-2020',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-november-2020',
    source: '/release-note/geonames-monthly-diff-report-november-2020',
  },
  {
    destination: '/geoip/release-notes/2020#new-data-point-is_residential_proxy-released-for-geoip2-anonymous-ip',
    source: '/release-note/new-data-point-is_residential_proxy-released-for-geoip2-anonymous-ip',
  },
  {
    destination: '/geoip/release-notes/2020#new-output-is_residential_proxy-released-for-geoip2-precision-insights-web-service-minfraud-insights-and-minfraud-factors',
    source: '/release-note/new-output-is_residential_proxy-released-for-geoip2-precision-insights-web-service-minfraud-insights-and-minfraud-factors',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-october-2020',
    source: '/release-note/geonames-monthly-diff-report-october-2020',
  },
  {
    destination: '/geoip/release-notes/2020#flagging-more-networks-as-corporate',
    source: '/release-note/flagging-more-networks-as-corporate',
  },
  {
    destination: '/geoip/release-notes/2020#billing-and-product-service-permission-types-for-standard-users',
    source: '/release-note/billing-and-product-service-permission-types-for-standard-users',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-september-2020',
    source: '/release-note/geonames-monthly-diff-report-september-2020',
  },
  {
    destination: '/geoip/release-notes/2020#decommissioned-geoip2-javascript-api-domain',
    source: '/release-note/decommissioned-geoip2-javascript-api-domain',
  },
  {
    destination: '/geoip/release-notes/2020#incorrect-spanish-ip-mappings-to-el-salvador',
    source: '/release-note/incorrect-spanish-ip-mappings-to-el-salvador',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-august-2020',
    source: '/release-note/geonames-monthly-diff-report-august-2020',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-july-2020',
    source: '/release-note/geonames-monthly-diff-report-july-2020',
  },
  {
    destination: '/geoip/release-notes/2020#fido2-support-for-two-factor-authentication',
    source: '/release-note/fido2-support-for-two-factor-authentication',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-june-2020',
    source: '/release-note/geonames-monthly-diff-report-june-2020',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-may-2020',
    source: '/release-note/geonames-monthly-diff-report-may-2020',
  },
  {
    destination: '/geoip/release-notes/2020#resolving-to-borough-of-queens-for-queens-ny-neighborhoods',
    source: '/release-note/resolving-to-borough-of-queens-for-queens-ny-neighborhoods',
  },
  {
    destination: '/geoip/release-notes/2020#broadband-filter-for-geoip-accuracy-statistics',
    source: '/release-note/broadband-filter-for-geoip-accuracy-statistics',
  },
  {
    destination: '/geoip/release-notes/2020#docker-image-for-geoip-update-program',
    source: '/release-note/docker-image-for-geoip-update-program',
  },
  {
    destination: '/geoip/release-notes/2020#geonames-monthly-diff-report-april-2020',
    source: '/release-note/geonames-monthly-diff-report-april-2020',
  },
  {
    destination: '/geoip/release-notes/2020#geoip2-ruby-api-supports-web-service-lookups',
    source: '/release-note/geoip2-ruby-api-supports-web-service-lookups',
  },
  {
    destination: '/geoip/release-notes/2020#mmdbinspect-beta-release',
    source: '/release-note/mmdbinspect-beta-release',
  },
  {
    destination: '/geoip/release-notes/2020#privacy-exclusions-api',
    source: '/release-note/privacy-exclusions-api',
  },
  {
    destination: '/geoip/release-notes/2020#changes-to-asn-organization-data',
    source: '/release-note/changes-to-asn-organization-data',
  },
  {
    destination: '/geoip/release-notes/2020#flagging-more-networks-used-by-businesses-as-corporate',
    source: '/release-note/flagging-more-networks-used-by-businesses-as-corporate',
  },
  {
    destination: '/geoip/release-notes/2019#the-user_id_required-error-code-is-now-account_id_required',
    source: '/release-note/the-user_id_required-error-code-is-now-account_id_required',
  },
  {
    destination: '/geoip/release-notes/2019#resolving-to-parent-city-for-australian-suburbs',
    source: '/release-note/resolving-to-parent-city-for-australian-suburbs',
  },
  {
    destination: '/geoip/release-notes/2019#changes-to-accessing-and-using-geolite2-databases',
    source: '/release-note/changes-to-accessing-and-using-geolite2-databases',
  },
  {
    destination: '/geoip/release-notes/2019#query-usage-report-license-key-filter',
    source: '/release-note/query-usage-report-license-key-filter',
  },
  {
    destination: '/geoip/release-notes/2019#changes-to-japan-postal-codes',
    source: '/release-note/changes-to-japan-postal-codes',
  },
  {
    destination: '/geoip/release-notes/2019#changes-to-portugal-postal-codes',
    source: '/release-note/changes-to-portugal-postal-codes',
  },
  {
    destination: '/geoip/release-notes/2019#retirement-of-tls-1-0-1-1-and-unencrypted-http-minfraud-requests',
    source: '/release-note/retirement-of-tls-1-0-1-1-and-unencrypted-http-minfraud-requests',
  },
  {
    destination: '/geoip/release-notes/2019#new-static_ip_score-output-in-web-services',
    source: '/release-note/new-static_ip_score-output-in-web-services',
  },
  {
    destination: '/geoip/release-notes/2019#final-reminder-of-security-related-retirements',
    source: '/release-note/final-reminder-of-security-related-retirements',
  },
  {
    destination: '/geoip/release-notes/2019#improved-cellular-ip-detection',
    source: '/release-note/improved-cellular-ip-detection',
  },
  {
    destination: '/geoip/release-notes/2019#account-activity-log',
    source: '/release-note/account-activity-log',
  },
  {
    destination: '/geoip/release-notes/2019#new-network-and-user_count-outputs-in-web-services',
    source: '/release-note/new-network-and-user_count-outputs-in-web-services',
  },
  {
    destination: '/geoip/release-notes/2019#planned-warning-interruption-september-2019',
    source: '/release-note/planned-warning-interruption-september-2019',
  },
  {
    destination: '/geoip/release-notes/2019#anonymous-ip-data-in-geoip-online-lookup-form',
    source: '/release-note/anonymous-ip-data-in-geoip-online-lookup-form',
  },
  {
    destination: '/geoip/release-notes/2019#improved-business-ip-detection',
    source: '/release-note/improved-business-ip-detection',
  },
  {
    destination: '/geoip/release-notes/2019#planned-warning-interruption-august-2019',
    source: '/release-note/planned-warning-interruption-august-2019',
  },
  {
    destination: '/geoip/release-notes/2019#weekly-updates-for-geoip2-isp-and-geoip2-connection-type',
    source: '/release-note/weekly-updates-for-geoip2-isp-and-geoip2-connection-type',
  },
  {
    destination: '/geoip/release-notes/2019#planned-warning-interruption',
    source: '/release-note/planned-warning-interruption',
  },
  {
    destination: '/geoip/release-notes/2019#postal-code-data-for-singapore-and-south-korea',
    source: '/release-note/postal-code-data-for-singapore-and-south-korea',
  },
  {
    destination: '/geoip/release-notes/2019#security-tokens',
    source: '/release-note/security-tokens',
  },
  {
    destination: '/geoip/release-notes/2019#security-related-retirements-2019',
    source: '/release-note/security-related-retirements-2019',
  },
  {
    destination: '/geoip/release-notes/2019#2fa-release',
    source: '/release-note/2fa-release',
  },
  {
    destination: '/geoip/release-notes/2019#crimea-accuracy-update-2019',
    source: '/release-note/crimea-accuracy-update-2019',
  },
  {
    destination: '/geoip/release-notes/2019#initial-release-of-ruby-api',
    source: '/release-note/initial-release-of-ruby-api',
  },
  {
    destination: '/geoip/release-notes/2019#new-geoip-update-released',
    source: '/release-note/new-geoip-update-released',
  },
  {
    destination: '/geoip/release-notes/2019#limiting-availability-of-archived-geoip-databases',
    source: '/release-note/limiting-availability-of-archived-geoip-databases',
  },
  {
    destination: '/geoip/release-notes/2019#server-ip-changes-january-2019',
    source: '/release-note/server-ip-changes-january-2019',
  },
  {
    destination: '/geoip/release-notes/2019#geoip2-node-includes-support-for-web-service-lookups',
    source: '/release-note/geoip2-node-includes-support-for-web-service-lookups',
  },
  {
    destination: '/geoip/release-notes/2018#initial-release-of-geoip2-node',
    source: '/release-note/initial-release-of-geoip2-node',
  },
  {
    destination: '/geoip/release-notes/2018#changes-to-us-coordinate-data',
    source: '/release-note/changes-to-us-coordinate-data',
  },
  {
    destination: '/geoip/release-notes/2018#mapping-ips-to-districts-of-seoul',
    source: '/release-note/mapping-ips-to-districts-of-seoul',
  },
  {
    destination: '/geoip/release-notes/2018#mapping-more-ips-to-special-wards-of-tokyo',
    source: '/release-note/mapping-more-ips-to-special-wards-of-tokyo',
  },
  {
    destination: '/geoip/release-notes/2018#renaming-time-warner-cable-to-spectrum',
    source: '/release-note/renaming-time-warner-cable-to-spectrum',
  },
  {
    destination: '/geoip/release-notes/2018#new-european-union-locations-added-to-geoip2-databases-and-services',
    source: '/release-note/new-european-union-locations-added-to-geoip2-databases-and-services',
  },
  {
    destination: '/geoip/release-notes/2018#discontinuation-of-the-geolite-legacy-databases',
    source: '/release-note/discontinuation-of-the-geolite-legacy-databases',
  },
  {
    destination: '/geoip/release-notes/2018#eu-country-outputs-added-to-to-geoip2-country-city-enterprise-dbs-and-precision-service',
    source: '/release-note/eu-country-outputs-added-to-to-geoip2-country-city-enterprise-dbs-and-precision-service',
  },
  {
    destination: '/geoip/release-notes/2017#anonymizer-types-added-to-geoip2-precision-insights',
    source: '/release-note/anonymizer-types-added-to-geoip2-precision-insights',
  },
  {
    destination: '/geoip/release-notes/2017#the-legacy-geoip-javascript-services-have-been-discontinued',
    source: '/release-note/the-legacy-geoip-javascript-services-have-been-discontinued',
  },
  {
    destination: '/geoip/release-notes/2017#our-singapore-server-is-live',
    source: '/release-note/our-singapore-server-is-live',
  },
  {
    destination: '/geoip/release-notes/2017#crimea-accuracy-update',
    source: '/release-note/crimea-accuracy-update',
  },
  {
    destination: '/geoip/release-notes/2017#eol-legacy-geoip-javascript',
    source: '/release-note/eol-legacy-geoip-javascript',
  },
  {
    destination: '/geoip/release-notes/2017#mapping-more-mobile-networks-to-regional-level',
    source: '/release-note/mapping-more-mobile-networks-to-regional-level',
  },
  {
    destination: '/geoip/release-notes/2017#removing-additional-anycast-locations',
    source: '/release-note/removing-additional-anycast-locations',
  },
  {
    destination: '/geoip/release-notes/2017#adding-multiple-license-keys-support',
    source: '/release-note/adding-multiple-license-keys-support',
  },
  {
    destination: '/geoip/release-notes/2017#removing-anycast-locations',
    source: '/release-note/removing-anycast-locations',
  },
  {
    destination: '/geoip/release-notes/2017#new-geolite2-asn-database',
    source: '/release-note/new-geolite2-asn-database',
  },
  {
    destination: '/geoip/release-notes/2017#spectrum-rebranding',
    source: '/release-note/spectrum-rebranding',
  },
  {
    destination: '/geoip/release-notes/2017#geoip-isp-accuracy-improvements-in-europe-and-latin-america',
    source: '/release-note/geoip-isp-accuracy-improvements-in-europe-and-latin-america',
  },
  {
    destination: '/geoip/release-notes/2016#change-to-comcast-business-isp-name',
    source: '/release-note/change-to-comcast-business-isp-name',
  },
  {
    destination: '/geoip/release-notes/2016#improved-geoip-accuracy-outside-the-us',
    source: '/release-note/improved-geoip-accuracy-outside-the-us',
  },
  {
    destination: '/geoip/release-notes/2016#accuracy-radius-to-be-added-to-geolite2-city-geoip2-city-and-geoip2-precision-city',
    source: '/release-note/accuracy-radius-to-be-added-to-geolite2-city-geoip2-city-and-geoip2-precision-city',
  },
  {
    destination: '/geoip/release-notes/2016#change-in-default-latlon',
    source: '/release-note/change-in-default-latlon',
  },
  {
    destination: '/geoip/release-notes/2016#capitalization-change-for-verizon-fios',
    source: '/release-note/capitalization-change-for-verizon-fios',
  },
  {
    destination: '/geoip/release-notes/2015#libmaxminddb-1-1-2',
    source: '/release-note/libmaxminddb-1-1-2',
  },
  {
    destination: '/geoip/release-notes/2015#geoip-isp-update',
    source: '/release-note/geoip-isp-update',
  },
  {
    destination: '/geoip/release-notes/2015#is_anonymous_proxy-and-is_satellite_provider-deprecation-in-geoip2',
    source: '/release-note/is_anonymous_proxy-and-is_satellite_provider-deprecation-in-geoip2',
  },
  {
    destination: '/geoip/release-notes/2015#demographics',
    source: '/release-note/demographics',
  },
  {
    destination: '/geoip/release-notes/2015#geoip2-csvs-for-anonymous-ip-isp-domain-and-connection-type',
    source: '/release-note/geoip2-csvs-for-anonymous-ip-isp-domain-and-connection-type',
  },
  {
    destination: '/geoip/release-notes/2015#improvements-to-geoip2-precision-city-and-insights',
    source: '/release-note/improvements-to-geoip2-precision-city-and-insights',
  },
  {
    destination: '/geoip/release-notes/2015#geoip-accuracy-in-crimea',
    source: '/release-note/geoip-accuracy-in-crimea',
  },
  {
    destination: '/geoip/release-notes/2014#more-ips-mapped-to-postal-codes',
    source: '/release-note/more-ips-mapped-to-postal-codes',
  },
  {
    destination: '/geoip/release-notes/2014#improvements-to-accuracy-in-japan-korea-and-venezuela-and-change-in-latlon-returned',
    source: '/release-note/improvements-to-accuracy-in-japan-korea-and-venezuela-and-change-in-latlon-returned',
  },
  {
    destination: '/geoip/release-notes/2014#geoip2-javascript-v2-1',
    source: '/release-note/geoip2-javascript-v2-1',
  },
  {
    destination: '/geoip/release-notes/2014#geoip2-precision-web-service-v2-1',
    source: '/release-note/geoip2-precision-web-service-v2-1',
  },
  {
    destination: '/geoip/release-notes/2014#type-change-to-geoip2-metro-code-field',
    source: '/release-note/type-change-to-geoip2-metro-code-field',
  },
  {
    destination: '/geoip/release-notes/2013#canadian-postals-back-in-database',
    source: '/release-note/canadian-postals-back-in-database',
  },
  {
    destination: '/geoip/release-notes/2013#geoip-release-delay',
    source: '/release-note/geoip-release-delay',
  },
  {
    destination: '/geoip/release-notes/2013#improved-international-postal-resolution',
    source: '/release-note/improved-international-postal-resolution',
  },
  {
    destination: '/geoip/release-notes/2013#geolite2-city-database-available',
    source: '/release-note/geolite2-city-database-available',
  },
  {
    destination: '/geoip/release-notes/2013#geoip2-precision-data-available',
    source: '/release-note/geoip2-precision-data-available',
  },
  {
    destination: '/geoip/release-notes/2013#geoip2-now-available',
    source: '/release-note/geoip2-now-available',
  },
];

const minfraudMap =
[
  {
    destination: '/minfraud/release-notes/#re-calculated-risk-scores-in-minfraud-alerts',
    source: '/release-note/re-calculated-risk-scores-in-minfraud-alerts',
  },
  {
    destination: '/minfraud/release-notes/#normalize-emails-before-hashing-for-improved-minfraud-scoring',
    source: '/release-note/normalize-emails-before-hashing-for-improved-minfraud-scoring',
  },
  {
    destination: '/minfraud/release-notes/#new-output-ip-risk-reasons',
    source: '/release-note/new-output-ip-risk-reasons',
  },
  {
    destination: '/minfraud/release-notes/#changes-to-isp-names-for-vodafone-germany',
    source: '/release-note/changes-to-isp-names-for-vodafone-germany',
  },
  {
    destination: '/minfraud/release-notes/2020#united-kingdom-will-no-longer-be-flagged-is_in_european_union',
    source: '/release-note/united-kingdom-will-no-longer-be-flagged-is_in_european_union',
  },
  {
    destination: '/minfraud/release-notes/2020#new-output-is_residential_proxy-released-for-geoip2-precision-insights-web-service-minfraud-insights-and-minfraud-factors',
    source: '/release-note/new-output-is_residential_proxy-released-for-geoip2-precision-insights-web-service-minfraud-insights-and-minfraud-factors',
  },
  {
    destination: '/minfraud/release-notes/2020#ip-address-optional-in-minfraud-score-insights-and-factors-services-2',
    source: '/release-note/ip-address-optional-in-minfraud-score-insights-and-factors-services-2',
  },
  {
    destination: '/minfraud/release-notes/2020#ip-address-optional-in-minfraud-score-insights-and-factors-services',
    source: '/release-note/ip-address-optional-in-minfraud-score-insights-and-factors-services',
  },
  {
    destination: '/minfraud/release-notes/2020#email-now-available-as-custom-rules-parameter',
    source: '/release-note/email-now-available-as-custom-rules-parameter',
  },
  {
    destination: '/minfraud/release-notes/2020#billing-and-product-service-permission-types-for-standard-users',
    source: '/release-note/billing-and-product-service-permission-types-for-standard-users',
  },
  {
    destination: '/minfraud/release-notes/2020#update-to-minfraud-service-server-locations',
    source: '/release-note/update-to-minfraud-service-server-locations',
  },
  {
    destination: '/minfraud/release-notes/2020#new-minfraud-factors-subscores',
    source: '/release-note/new-minfraud-factors-subscores',
  },
  {
    destination: '/minfraud/release-notes/2020#report-transaction-support-in-minfraud-client-apis',
    source: '/release-note/report-transaction-support-in-minfraud-client-apis',
  },
  {
    destination: '/minfraud/release-notes/2020#fido2-support-for-two-factor-authentication',
    source: '/release-note/fido2-support-for-two-factor-authentication',
  },
  {
    destination: '/minfraud/release-notes/2020#data-changes-to-geoip-legacy-and-minfraud-legacy-web-services',
    source: '/release-note/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services',
  },
  {
    destination: '/minfraud/release-notes/2020#anonymous-ip-flags-as-parameters-for-custom-rules',
    source: '/release-note/anonymous-ip-flags-as-parameters-for-custom-rules',
  },
  {
    destination: '/minfraud/release-notes/2020#retirement-of-legacy-minfraud-soap-api',
    source: '/release-note/retirement-of-legacy-minfraud-soap-api',
  },
  {
    destination: '/minfraud/release-notes/2020#billing-fields-and-is-disposable-email-as-input-parameters-for-custom-rules',
    source: '/release-note/billing-fields-and-is-disposable-email-as-input-parameters-for-custom-rules',
  },
  {
    destination: '/minfraud/release-notes/2020#new-credit_card-is_business-output',
    source: '/release-note/new-credit_card-is_business-output',
  },
  {
    destination: '/minfraud/release-notes/2020#new-email-domain-first_seen-output',
    source: '/release-note/new-email-domain-first_seen-output',
  },
  {
    destination: '/minfraud/release-notes/2020#minfraud-query-form',
    source: '/release-note/minfraud-query-form',
  },
  {
    destination: '/minfraud/release-notes/2020#new-email-is_disposable-output',
    source: '/release-note/new-email-is_disposable-output',
  },
  {
    destination: '/minfraud/release-notes/2020#more-outputs-on-transaction-details-screen',
    source: '/release-note/more-outputs-on-transaction-details-screen',
  },
  {
    destination: '/minfraud/release-notes/2020#retirement-of-legacy-iin-bin-api',
    source: '/release-note/retirement-of-legacy-iin-bin-api',
  },
  {
    destination: '/minfraud/release-notes/2020#tag-transactions-from-transaction-details-screen',
    source: '/release-note/tag-transactions-from-transaction-details-screen',
  },
  {
    destination: '/minfraud/release-notes/2019#the-user_id_required-error-code-is-now-account_id_required',
    source: '/release-note/the-user_id_required-error-code-is-now-account_id_required',
  },
  {
    destination: '/minfraud/release-notes/2019#query-usage-report-license-key-filter',
    source: '/release-note/query-usage-report-license-key-filter',
  },
  {
    destination: '/minfraud/release-notes/2019#toggle-minfraud-transactions-access',
    source: '/release-note/toggle-minfraud-transactions-access',
  },
  {
    destination: '/minfraud/release-notes/2019#changes-to-japan-postal-codes',
    source: '/release-note/changes-to-japan-postal-codes',
  },
  {
    destination: '/minfraud/release-notes/2019#changes-to-portugal-postal-codes',
    source: '/release-note/changes-to-portugal-postal-codes',
  },
  {
    destination: '/minfraud/release-notes/2019#retirement-of-tls-1-0-1-1-and-unencrypted-http-minfraud-requests',
    source: '/release-note/retirement-of-tls-1-0-1-1-and-unencrypted-http-minfraud-requests',
  },
  {
    destination: '/minfraud/release-notes/2019#new-static_ip_score-output-in-web-services',
    source: '/release-note/new-static_ip_score-output-in-web-services',
  },
  {
    destination: '/minfraud/release-notes/2019#final-reminder-of-security-related-retirements',
    source: '/release-note/final-reminder-of-security-related-retirements',
  },
  {
    destination: '/minfraud/release-notes/2019#improved-cellular-ip-detection',
    source: '/release-note/improved-cellular-ip-detection',
  },
  {
    destination: '/minfraud/release-notes/2019#account-activity-log',
    source: '/release-note/account-activity-log',
  },
  {
    destination: '/minfraud/release-notes/2019#high-risk-ip-country-deprecation',
    source: '/release-note/high-risk-ip-country-deprecation',
  },
  {
    destination: '/minfraud/release-notes/2019#new-network-and-user_count-outputs-in-web-services',
    source: '/release-note/new-network-and-user_count-outputs-in-web-services',
  },
  {
    destination: '/minfraud/release-notes/2019#planned-warning-interruption-september-2019',
    source: '/release-note/planned-warning-interruption-september-2019',
  },
  {
    destination: '/minfraud/release-notes/2019#ip-and-email-tenure-deprecation',
    source: '/release-note/ip-and-email-tenure-deprecation',
  },
  {
    destination: '/minfraud/release-notes/2019#improved-business-ip-detection',
    source: '/release-note/improved-business-ip-detection',
  },
  {
    destination: '/minfraud/release-notes/2019#planned-warning-interruption-august-2019',
    source: '/release-note/planned-warning-interruption-august-2019',
  },
  {
    destination: '/minfraud/release-notes/2019#retirement-of-legacy-iin-bin-api-service',
    source: '/release-note/retirement-of-legacy-iin-bin-api-service',
  },
  {
    destination: '/minfraud/release-notes/2019#planned-warning-interruption',
    source: '/release-note/planned-warning-interruption',
  },
  {
    destination: '/minfraud/release-notes/2019#disable-ip-risk',
    source: '/release-note/disable-ip-risk',
  },
  {
    destination: '/minfraud/release-notes/2019#initial-release-of-minfraud-node',
    source: '/release-note/initial-release-of-minfraud-node',
  },
  {
    destination: '/minfraud/release-notes/2019#security-related-retirements-2019',
    source: '/release-note/security-related-retirements-2019',
  },
  {
    destination: '/minfraud/release-notes/2019#2fa-release',
    source: '/release-note/2fa-release',
  },
  {
    destination: '/minfraud/release-notes/2018#changes-to-us-coordinate-data',
    source: '/release-note/changes-to-us-coordinate-data',
  },
  {
    destination: '/minfraud/release-notes/2018#new-input-parameters-for-use-with-custom-rules',
    source: '/release-note/new-input-parameters-for-use-with-custom-rules',
  },
  {
    destination: '/minfraud/release-notes/2018#new-european-union-locations-added-to-minfraud-insights-and-factors',
    source: '/release-note/new-european-union-locations-added-to-minfraud-insights-and-factors',
  },
  {
    destination: '/minfraud/release-notes/2018#device-tracking-add-on-now-always-uses-https',
    source: '/release-note/device-tracking-add-on-now-always-uses-https',
  },
  {
    destination: '/minfraud/release-notes/2018#credit-card-is_virtual-and-device-local_time-outputs-and-payout_change-event-type-now-available',
    source: '/release-note/credit-card-is_virtual-and-device-local_time-outputs-and-payout_change-event-type-now-available',
  },
  {
    destination: '/minfraud/release-notes/2018#eu-country-outputs-added-to-minfraud-insights-and-minfraud-factors-services',
    source: '/release-note/eu-country-outputs-added-to-minfraud-insights-and-minfraud-factors-services',
  },
  {
    destination: '/minfraud/release-notes/2017#anonymizer-types-added-to-minfraud-insights-and-factors',
    source: '/release-note/anonymizer-types-added-to-minfraud-insights-and-factors',
  },
  {
    destination: '/minfraud/release-notes/2017#dispositions-api-released',
    source: '/release-note/dispositions-api-released',
  },
  {
    destination: '/minfraud/release-notes/2017#mapping-more-mobile-networks-to-regional-level',
    source: '/release-note/mapping-more-mobile-networks-to-regional-level',
  },
  {
    destination: '/minfraud/release-notes/2017#custom-inputs-added-to-minfraud-score-insights-and-factors',
    source: '/release-note/custom-inputs-added-to-minfraud-score-insights-and-factors',
  },
  {
    destination: '/minfraud/release-notes/2017#new-minfraud-inputs-and-outputs',
    source: '/release-note/new-minfraud-inputs-and-outputs',
  },
  {
    destination: '/minfraud/release-notes/2017#adding-multiple-license-keys-support',
    source: '/release-note/adding-multiple-license-keys-support',
  },
  {
    destination: '/minfraud/release-notes/2017#minfraud-transaction-history-page-is-now-minfraud-transactions-screen',
    source: '/release-note/minfraud-transaction-history-page-is-now-minfraud-transactions-screen',
  },
  {
    destination: '/minfraud/release-notes/2016#minfrauds-is_postal_in_city-available-for-non-us-locations',
    source: '/release-note/minfrauds-is_postal_in_city-available-for-non-us-locations',
  },
  {
    destination: '/minfraud/release-notes/2016#december-1-2016',
    source: '/release-note/december-1-2016',
  },
  {
    destination: '/minfraud/release-notes/2016#new-credit_cardtoken-input',
    source: '/release-note/new-credit_cardtoken-input',
  },
  {
    destination: '/minfraud/release-notes/2016#new-event-types-for-minfraud-requests',
    source: '/release-note/new-event-types-for-minfraud-requests',
  },
  {
    destination: '/minfraud/release-notes/2016#more-proxy-scores',
    source: '/release-note/more-proxy-scores',
  },
  {
    destination: '/minfraud/release-notes/2016#new-device-field',
    source: '/release-note/new-device-field',
  },
  {
    destination: '/minfraud/release-notes/2016#deprecated-fields-and-new-fields',
    source: '/release-note/deprecated-fields-and-new-fields',
  },
  {
    destination: '/minfraud/release-notes/2016#order-amount-now-used-in-risk-score',
    source: '/release-note/order-amount-now-used-in-risk-score',
  },
  {
    destination: '/minfraud/release-notes/2016#new-minfraud-insights-outputs',
    source: '/release-note/new-minfraud-insights-outputs',
  },
  {
    destination: '/minfraud/release-notes/2015#expanded-coverage-of-prepaid-cards',
    source: '/release-note/expanded-coverage-of-prepaid-cards',
  },
  {
    destination: '/minfraud/release-notes/2015#1744',
    source: '/release-note/1744',
  },
  {
    destination: '/minfraud/release-notes/2015#discontinuing-appws_ipaddr',
    source: '/release-note/discontinuing-appws_ipaddr',
  },
  {
    destination: '/minfraud/release-notes/2014#wsdl-and-port-change-required-for-some-minfraud-soap-users',
    source: '/release-note/wsdl-and-port-change-required-for-some-minfraud-soap-users',
  },
  {
    destination: '/minfraud/release-notes/2013#adding-ipv6-access-for-web-endpoints',
    source: '/release-note/adding-ipv6-access-for-web-endpoints',
  },
  {
    destination: '/minfraud/release-notes/2013#upcoming-ip-address-changes-for-maxmind-services',
    source: '/release-note/upcoming-ip-address-changes-for-maxmind-services',
  },
];

const releaseNoteRedirects = geoipMap.concat(minfraudMap);

export default releaseNoteRedirects;
