import { SchemaObject } from 'openapi3-ts';

import CustomInput from './CustomInput';

const CustomInputs: SchemaObject = {
  description: 'Custom Inputs are optional inputs to the minFraud service that must first be defined for your account. Select “Custom Inputs” from the Account Portal in order to do so. See our Custom Inputs documentation for more information.',
  items: CustomInput,
};

export default CustomInputs;
