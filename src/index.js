// @flow
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import Details from './screens/Details';
import Bookmarks from './screens/Bookmarks';
import {ROUTES} from './utils/constants';
import store from './redux/store';

const Stack = createStackNavigator();

const stackNavigatorOptions = {
  cardStyle: {
    backgroundColor: 'white',
  },
  headerBackTitleVisible: false,
  headerTintColor: 'black',
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackNavigatorOptions}>
          <Stack.Screen name={ROUTES.HOME} component={Home} />
          <Stack.Screen name={ROUTES.DETAILS} component={Details} />
          <Stack.Screen name={ROUTES.BOOKMARKS} component={Bookmarks} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
