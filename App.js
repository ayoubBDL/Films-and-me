import React from 'react';
import MainStackNavigator from './Navigation/MainStackNavigator';
import { Provider } from 'react-redux'
import Store from './Store/Reducers/configureStore'

export default function App() {
  return (
    <Provider store={Store}><MainStackNavigator /></Provider>

  );
}
