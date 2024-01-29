import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AideScreen from './AideScreen';
import FaqScreen from '../FaqScreen';
import ConditionsScreen from '../ConditionsScreen';
import EmailFormScreen from '../EmailFormScreen';


const Stack = createStackNavigator();

export default function AideStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AideScreen" component={AideScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Faq" component={FaqScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Conditions" component={ConditionsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EmailForm" component={EmailFormScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
