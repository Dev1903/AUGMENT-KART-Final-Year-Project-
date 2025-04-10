import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ProductsPerCategory from '../pages/Products_per_Category';
import Profile from '../pages/Profile'
import LoginScreen from '../pages/authPages/Login';
import RegisterScreen from '../pages/authPages/Register';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
      <Stack.Screen name="ProductsPerCategory" component={ProductsPerCategory} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

    </Stack.Navigator>
  );
};

export default HomeStack;
