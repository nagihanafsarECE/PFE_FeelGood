/**
 * ConfirmEmailScreen handles email confirmation for user registration.
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {LinearGradient} from 'expo-linear-gradient';

const ConfirmEmailScreen = () => {
  // Access the route parameters and initialize the form using react-hook-form
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });

  // Get the value of the 'username' field
  const username = watch('username');

  const navigation = useNavigation();

  // Handle the confirmation of the email with the entered code
  const onConfirmPressed = async data => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  // Navigate to the Sign In screen
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };


  // Resend the confirmation code to the user's email
  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Succès', 'Le code a été renvoyé sur ton email');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  return (
    // Apply a linear gradient background to the entire screen
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Confirme ton email</Text>

          {/* Input field for entering the username */}
          <CustomInput
            name="username"
            control={control}
            placeholder="Nom d'Utilisateur"
            rules={{
              required: 'Nom Utilisateur Obligatoire',
            }}
          />

          {/* Input field for entering the confirmation code */}
          <CustomInput
            name="code"
            control={control}
            placeholder="Code De Confirmation"
            rules={{
              required: 'Code De Confirmation Obligatoire',
            }}
          />

          {/* Confirm button that triggers the confirmation process */}
          <CustomButton text="Confirmer" onPress={handleSubmit(onConfirmPressed)} />

          {/* Button to resend the confirmation code */}
          <CustomButton
            text="Renvoyer Le Code"
            onPress={onResendPress}
            type="SECONDARY"
          />

          {/* Button to navigate back to the Sign In screen */}
          <CustomButton
            text="Revenir Vers La Connexion"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Styles for the ConfirmEmailScreen
const styles = StyleSheet.create({
  root: {
    paddingTop: '40%',
    paddingBottom: '100%',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
