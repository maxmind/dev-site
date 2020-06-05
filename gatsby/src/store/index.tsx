import React from 'react';

interface IState {
  selectedLanguage: string;
}

interface IAction {
  payload: string;
  type: 'change_language' | undefined;
}

interface IProvider {
  children?: React.ReactNode;
}

const initialState = {
  selectedLanguage: '',
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
  case 'change_language':
    return {
      ...state,
      selectedLanguage: action.payload,
    };
  default:
    return state;
  }
};


export const Store =
  React.createContext<{ dispatch: React.Dispatch<IAction>; state: IState }>({
    dispatch: () => null,
    state: initialState,
  });

export const StoreProvider: React.FC = (props: IProvider) => {
  const [
    state,
    dispatch,
  ] = React.useReducer(reducer, initialState);

  return (
    <Store.Provider
      value={{
        dispatch,
        state,
      }}
    >
      {props.children}
    </Store.Provider>
  );
};
