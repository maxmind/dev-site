import { SchemaObject } from 'openapi3-ts';

import Factors from './Factors';

const Subscores: SchemaObject = {
  properties: {
    avs_result: {
      example: 0.01,
      format: 'decimal',
      type: 'number',
    },
    billing_address: {
      example: 0.02,
      format: 'decimal',
      type: 'number',
    },
    billing_address_distance_to_ip_location: {
      example: 0.03,
      format: 'decimal',
      type: 'number',
    },
    browser: {
      example: 0.04,
      format: 'decimal',
      type: 'number',
    },
    chargeback: {
      example: 0.05,
      format: 'decimal',
      type: 'number',
    },
    country: {
      example: 0.06,
      format: 'decimal',
      type: 'number',
    },
    country_mismatch: {
      example: 0.07,
      format: 'decimal',
      type: 'number',
    },
    cvv_result: {
      example: 0.08,
      format: 'decimal',
      type: 'number',
    },
    email_address: {
      example: 0.09,
      format: 'decimal',
      type: 'number',
    },
    email_domain: {
      example: 0.1,
      format: 'decimal',
      type: 'number',
    },
    email_tenure: {
      example: 0.11,
      format: 'decimal',
      type: 'number',
    },
    ip_tenure: {
      example: 0.12,
      format: 'decimal',
      type: 'number',
    },
    issuer_id_number: {
      example: 0.13,
      format: 'decimal',
      type: 'number',
    },
    order_amount: {
      example: 0.14,
      format: 'decimal',
      type: 'number',
    },
    phone_number: {
      example: 0.15,
      format: 'decimal',
      type: 'number',
    },
    shipping_address_distance_to_ip_location: {
      example: 0.16,
      format: 'decimal',
      type: 'number',
    },
    time_of_day: {
      example: 0.17,
      format: 'decimal',
      type: 'number',
    },
  },
  type: 'object',
};

const Insights: SchemaObject = {
  properties: {
    ...Factors.properties,
    subscores: Subscores,
  },
  type: 'object',
};

export default Insights;
