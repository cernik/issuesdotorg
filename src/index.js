// @flow
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Entrance from './screens/Entrance';
import Home from './screens/Home';
import Details from './screens/Details';
import Bookmarks from './screens/Bookmarks';
import {ROUTES} from './utils/constants';

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
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackNavigatorOptions}>
        <Stack.Screen
          name={ROUTES.ENTANCE}
          component={Entrance}
          options={{headerShown: false}}
        />
        <Stack.Screen name={ROUTES.HOME} component={Home} />
        <Stack.Screen name={ROUTES.DETAILS} component={Details} />
        <Stack.Screen name={ROUTES.BOOKMARKS} component={Bookmarks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
