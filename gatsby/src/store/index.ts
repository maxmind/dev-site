import React from 'react';

interface IContext {
  selectedLanguage: string;
}

const initialContext = {
  selectedLanguage: '',
};

export const Store = React.createContext<IContext>(initialContext);
