import * as React from 'react';

type SchemaContextProps = {
  addToSchemaExample: React.Dispatch<{
    payload: {
      name: string;
      type: SchemaPropertyType;
      value: string;
    }
  }>;
  id: string;
  jsonPointer: string;
  services?: MinFraudServices;
}

export default React.createContext<SchemaContextProps>({
  addToSchemaExample: () => ({}),
  id: '',
  jsonPointer: '',
});
