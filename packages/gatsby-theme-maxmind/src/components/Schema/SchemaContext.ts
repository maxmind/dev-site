import * as React from 'react';

export type SchemaContextProps = {
  id: string;
  json: Json;
  jsonPointer: string;
  productFamily?: ProductFamily;
  services?: GeoIpServices | MinFraudServices;
}

export default React.createContext<SchemaContextProps>({
  id: '',
  json: {},
  jsonPointer: '',
});
