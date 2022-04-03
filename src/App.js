import React, { useReducer } from 'react';
import LoginPage from './LoginPage';
import MapInterface from './MapInterface';

export const GlobalStateContext = React.createContext();

export default function App() {

  const initialState = {
    email: '',
    password: '',
    isAuthenticated: false,
    countrys: [],
    subDivisions: [],
    countryInput: '',
    subDivisionInput: '',
    dataRender: null,
    flyTo: [],
    preProcessedData: null
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_EMAIL':
        return { ...state, email: action.value }
      case 'UPDATE_PASSWORD':
        return { ...state, password: action.value }
      case 'CHECK_CREDENTIALS':
        return { ...state, isAuthenticated: true }
      case 'LOG_OUT':
        return { ...state, isAuthenticated: false }
      case 'HANDLE_SUBDIVISION_INPUT':
        return { ...state, subDivisionInput: action.value, countryInput: '' }
      case 'HANDLE_COUNTRY_INPUT':
        return { ...state, countryInput: action.value, subDivisionInput: '' }
      case 'HANDLE_SEARCH':
        return { ...state, dataRender: action.value }
      case 'CLEAR_MAP':
        return { ...state, dataRender: '', subDivisionInput: '', countryInput: '' }
      case 'PREPROCESS_DATA':
        return { ...state, preProcessedData: action.value}
      default:
        throw new Error();
    }
  }

  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ globalState, dispatch }}>
      {globalState.isAuthenticated ? <MapInterface /> : <LoginPage />}
    </GlobalStateContext.Provider>
  )
}

