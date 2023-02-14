import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './navigations';
import {navigationRef} from './navigations/rootNavigation';
import {Provider} from 'react-redux';
import { store } from './store';
import { NativeBaseProvider } from 'native-base';
// import NotificationWrapper from './notification/notification';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
        <NavigationContainer ref={navigationRef}>
          {/* <NotificationWrapper /> */}
          <Navigator />
        </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
