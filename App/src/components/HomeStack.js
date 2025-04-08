import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
