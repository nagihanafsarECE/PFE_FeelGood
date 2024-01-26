import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import AccueilScreen from '../AccueilScreen/AccueilScreen';
import ActualitesScreen from '../ActualitesScreen/ActualitesScreen';
import QuizzScreen from '../QuizzScreen/QuizzScreen';
import JeuxStack from '../JeuxScreen/JeuxStack';
import AccountScreen from '../AccountScreen/AccountScreen';
import AideScreen from '../AideScreen/AideScreen';


const Tab = createBottomTabNavigator();

const HomeScreen = ({ route }) => {
  const { username, email } = route.params;
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = 'home';
          } else if (route.name === 'Quiz') {
            iconName = 'puzzle';
          } else if (route.name === 'Jeux') {
            iconName = 'gamepad-variant';
          } else if (route.name === 'Actualités') {
            iconName = 'newspaper';
          } else if (route.name === 'Account') {
            iconName="account";
          } else if (route.name === 'Aide') {
            iconName="help-circle"
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#6600CC'},
        tabBarActiveTintColor: '#33CC00',
        tabBarInactiveTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Quiz" component={QuizzScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Jeux" component={JeuxStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Actualités" component={ActualitesScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Account" component={AccountScreen} initialParams={{ username, email }} options={{ headerShown: false }}/>
      <Tab.Screen name="Aide" component={AideScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
    
  );
};

export default HomeScreen;
