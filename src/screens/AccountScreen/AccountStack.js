import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './AccountScreen';

const Stack = createStackNavigator();

const AccountStack = ({ route }) => {
  const { username, email } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountScreen" component={AccountScreen} initialParams={{ username, email }} options={{ headerShown: false }}/>  
    </Stack.Navigator>
  );
}

export default AccountStack;