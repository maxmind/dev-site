import {
  inferType,
  isArray,
  isBoolean,
  isObject,
  isString,
} from '../../utils/json';
import { IProperty } from './Property';
import { SchemaContextProps } from './SchemaContext';

class PropertyValues {
  public example?: {
    jsonPointer: string;
    language: 'bash' | 'json';
    value: string;
  };
  public type?: string;

  constructor({
    schema,
    property,
  }: {
    property: Pick<IProperty, 'name' | 'type'>;
    schema: Pick<SchemaContextProps, 'json' | 'jsonPointer'>
  }) {
    this.type = property.type;

    if (!isObject(schema.json)) {
      return;
    }

    // eslint-disable-next-line security/detect-object-injection
    const example = schema.json[property.name];

    if (typeof example === 'undefined' || example === null) {
      return;
    }

    if (!this.type) {
      this.type = inferType(example);
    }

    this.example =  {
      jsonPointer: this.formatPointer(schema.jsonPointer, property.name),
      language: this.getLanguage(this.type),
      value: this.formatExample(example),
    };
  }

  private formatPointer(base: string, property: string) {
    return base === '/'
      ? `${base}${property}`
      : `${base}/${property}`;
  }

  private formatExample(example: NonNullable<Json>) {
    if (isArray(example) || isObject(example)) {
      return JSON.stringify(
        example,
        null,
        2
      );
    }

    if (isString(example)) {
      return `"${example}"`;
    }

    if (isBoolean(example)) {
      return example.toString();
    }

    return example.toString();
  }

  private getLanguage (type: string) {
    return type === 'object' || type.startsWith('array')
      ? 'json' as const
      : 'bash' as const;
  }
}

export default PropertyValues;
