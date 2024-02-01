/**
 * HomeScreen represents the main screen with a bottom tab navigation.
 * It includes tabs for Accueil (Home), Quiz, Jeux (Games), Actualités (News), Account, and Aide (Help).
 * Each tab is associated with a specific screen component.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import AccueilScreen from '../AccueilScreen/AccueilScreen';
import ActualitesScreen from '../ActualitesScreen/ActualitesScreen';
import QuizzScreen from '../QuizzScreen/QuizzScreen';
import JeuxStack from '../JeuxScreen/JeuxStack';
import AccountStack from '../AccountScreen/AccountStack';
import AideStack from '../AideScreen/AideStack';


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
            iconName = 'account';
          } else if (route.name === 'Aide') {
            iconName = 'help-circle';
          }
          const iconSize = route.name === 'Account' || route.name === 'Aide' ? 0.1 : size;

          return <MaterialCommunityIcons name={iconName} size={iconSize} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#6600CC' },
        tabBarActiveTintColor: '#33CC00',
        tabBarInactiveTintColor: '#fff',
      })}
      tabBarOptions={{
        tabStyle: { justifyContent: 'center' },
      }}
    >
      {/* Tab for Accueil */}
      <Tab.Screen
        name="Accueil"
        component={AccueilScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ flex: 2 }}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      {/* Tab for Quiz */}
      <Tab.Screen
        name="Quiz"
        component={QuizzScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ flex: 2 }}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      {/* Tab for Jeux */}
      <Tab.Screen
        name="Jeux"
        component={JeuxStack}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ flex: 2 }}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      {/* Tab for Actualités */}
      <Tab.Screen
        name="Actualités"
        component={ActualitesScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ flex: 2 }}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      {/* Tab for Account */}
      <Tab.Screen
        name="Account"
        component={AccountStack}
        initialParams={{ username, email }}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ flex: 0.1 }}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      {/* Tab for Aide */}
      <Tab.Screen
        name="Aide"
        component={AideStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ flex: 0.1 }}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default HomeScreen;
