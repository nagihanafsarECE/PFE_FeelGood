/**
 * Navigation component defines the navigation structure of the app using React Navigation.
 * It includes authentication checks to conditionally render different screens for signed-in and signed-out users.
 * The stack navigator handles authentication-related screens and the main app navigation is managed by a bottom tab navigator.
 * User authentication state is monitored using the Amplify Hub.
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Auth, Hub } from 'aws-amplify';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';

import AccountScreen from '../screens/AccountScreen';
import AccueilScreen from '../screens/AccueilScreen';
import ActualitesScreen from '../screens/ActualitesScreen';
import AideScreen from '../screens/AideScreen';
import ConditionsScreen from '../screens/ConditionsScreen';
import FaqScreen from '../screens/FaqScreen';
import JeuxScreen from '../screens/JeuxScreen';
import QuizzScreen from '../screens/QuizzScreen';

import JeuxStack from '../screens/JeuxScreen/JeuxStack';
import AccountStack from '../screens/AccountScreen/AccountStack';
import AideStack from '../screens/AideScreen/AideStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      // Check if there is an authenticated user
      const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setUser(authUser);
    } catch (e) {
      // Handle the case where there is no authenticated user
      setUser(null);
    }
  };

  useEffect(() => {
    // Check user authentication status on component mount
    checkUser();
  }, []);

  useEffect(() => {
    // Listen for authentication events using Amplify Hub
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        // Update user state upon authentication events
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    // Show loading indicator while checking authentication status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#9999FF' }, headerTintColor: '#fff' }}>
        {user ? (
          // Render HomeScreen for authenticated users
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ username: user?.username, email: user?.attributes?.email }}
            options={({ navigation }) => ({
              title: 'Feel Good.',
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <TouchableOpacity
                    onPress={() => { navigation.navigate('Account'); }}
                    style={{ marginRight: 15 }}>
                    <Ionicons name="person-outline" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Aide');
                    }}>
                    <Ionicons name="help-circle-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
        ) : (
          // Render authentication-related screens for signed-out users
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />

            <Stack.Screen name="Accueil" component={AccueilScreen} />
            <Stack.Screen name="Actualités" component={ActualitesScreen} />
            <Stack.Screen name="QuizzScreen" component={QuizzScreen} />
            <Stack.Screen name="JeuxScreen" component={JeuxScreen} />
            <Stack.Screen name="JeuxStack" component={JeuxStack} />

            <Stack.Screen name="Account" component={AccountScreen} initialParams={{ username: null, email: null }} options={{ headerShown: false }} />
            <Stack.Screen name="Aide" component={AideScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Faq" component={FaqScreen} />
            <Stack.Screen name="Conditions" component={ConditionsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
