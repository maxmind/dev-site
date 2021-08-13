import _isBoolean from 'lodash.isboolean';
import _isNumber from 'lodash.isnumber';
import isPlainObject from 'lodash.isplainobject';

export const isArray = (
  value: Json
): value is IJsonArray => Array.isArray(value);

export const isBoolean = (
  value: Json
): value is boolean => _isBoolean(value);

export const isNumber = (
  value: Json
): value is number => _isNumber(value);

export const isObject = (
  value: Json
): value is IJsonObject => isPlainObject(value);

export const isString = (
  value: Json
): value is string => typeof value === 'string';

export const inferType = (value: Json): string => {
  if (isArray(value)) {
    return 'array';
  }

  if (isBoolean(value)) {
    return 'boolean';
  }

  if (isObject(value)) {
    return 'object';
  }

  if (isNumber(value)) {
    return 'number';
  }

  if (isString(value)) {
    return 'string';
  }

  console.error('Invalid Type', value);

  throw new Error(
    'Cannot infer type from value. See console error labeled: `Invalid Type`'
  );
};
