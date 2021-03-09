import isPlainObject from 'lodash.isplainobject';

export const isJsonArray = (
  json: Json
): json is IJsonArray => Array.isArray(json);

export const isJsonMap = (
  json: Json
): json is IJsonMap => isPlainObject(json);

export const isJsonStringPrimative = (
  json: Json
): json is IJsonMap => typeof json === 'string';
