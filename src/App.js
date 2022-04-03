import React, { useReducer } from 'react';
import LoginPage from './LoginPage';

export const GlobalStateContext = React.createContext();

export default function App() {

  const initialState = {
    email: '',
    password: '',
    isAuthenticated: false
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_EMAIL':
        return { ...state, email: action.value }
      case 'UPDATE_PASSWORD':
        return { ...state, password: action.value }
      case 'CHECK_CREDENTIALS':
        return { ...state }
      default:
        throw new Error();
    }
  }

  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ globalState, dispatch }}>
      <LoginPage />
    </GlobalStateContext.Provider>
  )
}

