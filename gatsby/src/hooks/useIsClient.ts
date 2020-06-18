/* eslint-disable filenames/match-exported */
import { useEffect, useState } from 'react';

type IsClient = {
  isClient: boolean;
  key: string;
}

const useIsClient = (): IsClient => {
  const [
    isClient,
    setClient,
  ] = useState(false);
  const key = isClient ? 'client' : 'server';

  useEffect(() => {
    setClient(true);
  }, []);

  return {
    isClient,
    key,
  };
};

export default useIsClient;
