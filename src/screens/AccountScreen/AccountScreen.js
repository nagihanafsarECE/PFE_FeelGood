/**
 * AccountScreen displays user account information and provides options
 * for signing out and deleting the user's account. It uses AWS Amplify Auth for
 * authentication-related actions. The screen includes a linear gradient background
 * for a visually appealing UI.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { accountStyles, styles } from '../../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {LinearGradient} from 'expo-linear-gradient';


const AccountScreen = ({ navigation, route }) => {
  const { username, email } = route.params;

  // Function to sign out the user
  const signOut = () => {
    Auth.signOut();
  };

  // Function to handle account deletion
  const handleSupprimerCompte = async () => {
    try {
      // Delete the user's account
      const user = await Auth.currentAuthenticatedUser();
      await Auth.deleteUser(user);

      // Sign out the user after account deletion
      await Auth.signOut();

    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error.message);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la suppression du compte.');
    }
  };
    
  return ( 
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
      <View style={styles.container}>
        <View>
          {/* Display the username */}
          <View style={{marginBottom: 10}}>
          <Text style={accountStyles.DisplayName}>{username}</Text>
          </View>
          {/* Display the user's email */}
          <View style={{marginBottom: 20}}>
          <Text style={accountStyles.DisplayEmail}>{email}</Text>
          </View>
        </View>
    
        <View>
          {/* Button to sign out the user */}
          <TouchableOpacity
              style={styles.buttonContainer}
              onPress={signOut}>
              <Text style={styles.buttonText}>Déconnexion</Text>
          </TouchableOpacity>
          {/* Button to handle account deletion */}
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSupprimerCompte}>
            <Text style={{ color: 'red' , textAlign: 'center', fontSize: 18,}}>Supprimer le compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};



export default AccountScreen;
