import React from 'react';

interface IContext {
  selectedLanguage: string;
}

interface IAction {
  payload: string;
  type: 'change_language' | undefined;
}

let initialContext: IContext;
if (typeof window !== 'undefined') {
  initialContext = {
    selectedLanguage: window.localStorage.getItem('mm-selected-language') || '',
  };
} else {
  initialContext = {
    selectedLanguage: '',
  };
}

const reducer = (context: IContext, action: IAction): IContext => {
  switch (action.type) {
  case 'change_language':
    window.localStorage.setItem('mm-selected-language', action.payload);
    return {
      ...context,
      selectedLanguage: action.payload,
    };
  default:
    return context;
  }
};

export const Store =
  React.createContext<
  {
    context: IContext;
    dispatch: React.Dispatch<IAction>;
  }>({
    context: initialContext,
    dispatch: () => null,
  });

export const StoreProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [
    context,
    dispatch,
  ] = React.useReducer(reducer, initialContext);

  return (
    <Store.Provider
      value={{
        context,
        dispatch,
      }}
    >
      {props.children}
    </Store.Provider>
  );
};
