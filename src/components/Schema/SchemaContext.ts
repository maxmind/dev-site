import * as React from 'react';

type SchemaContextProps = {
  id: string;
  json: Json;
  jsonPointer: string;
  services?: MinFraudServices;
}

export default React.createContext<SchemaContextProps>({
  id: '',
  json: {},
  jsonPointer: '',
});
