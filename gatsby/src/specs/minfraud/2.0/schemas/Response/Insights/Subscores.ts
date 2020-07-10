import { SchemaObject } from 'openapi3-ts';

const Subscore: SchemaObject = {
  format: 'decimal',
  maximum: 99,
  minimum: 0.01,
  nullable: true,
  type: 'number',
};

const Subscores: SchemaObject = {
  properties: {
    avs_result: {
      ...Subscore,
      description: 'The risk associated with the AVS result.',
    },
    billing_address: {
      ...Subscore,
      description: 'The risk associated with the billing address.',
      example: 0.02,
    },
    billing_address_distance_to_ip_location: {
      ...Subscore,
      description: 'The risk associated with the distance between the billing address and the location for the given IP address.',
      example: 0.03,
    },
    browser: {
      ...Subscore,
      description: 'The risk associated with the browser attributes such as the User-Agent and Accept-Language. ',
      example: 0.04,
    },
    chargeback: {
      ...Subscore,
      description: 'Individualized risk of chargeback for the given IP address on your account and shop ID.This is only available to users sending chargeback data to MaxMind.',
      example: 0.05,
    },
    country: {
      ...Subscore,
      description: 'The risk associated with the country the transaction originated from.',
      example: 0.06,
    },
    country_mismatch: {
      ...Subscore,
      description: 'The risk associated with the combination of IP country, card issuer country, billing country, and shipping country.',
      example: 0.07,
    },
    cvv_result: {
      ...Subscore,
      description: 'The risk associated with the CVV result.',
      example: 0.08,
    },
    device: {
      ...Subscore,
      description: 'The risk associated with the device.',
      example: 0.09,
    },
    email_address: {
      ...Subscore,
      description: 'The risk associated with the device.',
      example: 0.10,
    },
    email_domain: {
      ...Subscore,
      description: 'The general risk associated with the email domain.',
      example: 0.11,
    },
    email_local_part: {
      ...Subscore,
      description: 'The risk associated with the email address local part (the part of the email address before the @ symbol).',
      example: 0.12,
    },
    email_tenure: {
      ...Subscore,
      deprecated: true,
      description: 'Please use [`email_address`]() instead.',
    },
    ip_tenure: {
      ...Subscore,
      deprecated: true,
      description: 'Please use [`risk_score`]() instead.',
    },
    issuer_id_number: {
      ...Subscore,
      description: 'The risk associated with the particular issuer ID number (IIN) given the billing location and the history of usage of the IIN on your account and shop ID.',
      example: 0.13,
    },
    order_amount: {
      ...Subscore,
      description: 'The risk associated with the particular order amount for your account and shop ID.',
      example: 0.14,
    },
    phone_number: {
      ...Subscore,
      description: 'The risk associated with the particular phone number.',
      example: 0.15,
    },
    shipping_address: {
      ...Subscore,
      description: 'The risk associated with the shipping address.',
      example: 0.16,
    },
    shipping_address_distance_to_ip_location: {
      ...Subscore,
      description: 'The risk associated with the distance between the shipping address and the location for the given IP address.',
      example: 0.17,
    },
    time_of_day: {
      ...Subscore,
      description: 'The risk associated with the local time of day of the transaction in the IP address location.',
      example: 0.18,
    },
  },
  type: 'object',
};

export default Subscores;
