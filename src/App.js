import React, { useReducer } from 'react';

export const GlobalStateContext = React.createContext();

export default function App() {

  const initialState = {
    email: 'bob@hello.com',
    password: '1234567890',
    isAuthenticated: false
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_EMAIL':
        return { ...state }
      case 'UPDATE_PASSWORD':
        return { ...state }
      case 'TOGGLE_AUTHENTICATION':
        return { ...state }
    }
  }

  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{globalState, dispatch}}>
      App
    </GlobalStateContext.Provider>
  )
}

