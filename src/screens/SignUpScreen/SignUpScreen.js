/**
 * SignUpScreen component represents the screen where users can sign up for a new account.
 * It includes input fields for name, username, email, and password, along with buttons for registration,
 * navigating to the sign-in screen, and links to terms of use and privacy information.
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {LinearGradient} from 'expo-linear-gradient';

// Regular expression for validating email format
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  // Handle the registration process
  const onRegisterPressed = async data => {
    const {username, password, email, name} = data;
    try {
      // Sign up with Amplify Auth
      await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username},
      });

      // Navigate to the email confirmation screen
      navigation.navigate('ConfirmEmail', {username});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  // Navigate to the sign-in screen
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Créer Un Compte</Text>

          <CustomInput
            name="name"
            control={control}
            placeholder="Nom"
            rules={{
              required: 'Nom Obligatoire',
              minLength: {
                value: 3,
                message: 'Le Nom Doit Avoir Minimum 3 Caractères',
              },
              maxLength: {
                value: 24,
                message: 'Le Nom Doit Avoir Maximum 24 Caractères',
              },
            }}
          />

          <CustomInput
            name="username"
            control={control}
            placeholder="Nom d'Utilisateur"
            rules={{
              required: 'Nom Utilisateur Obligatoire',
              minLength: {
                value: 3,
                message: 'Le Nom Utilisateur Doit Avoir Minimum 3 Caractères',
              },
              maxLength: {
                value: 24,
                message: 'Le Nom Utilisateur Doit Avoir Maximum 24 Caractères',
              },
            }}
          />
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email Obligatoire',
              pattern: {value: EMAIL_REGEX, message: 'Email est invalide'},
            }}
          />
          <CustomInput
            name="password"
            control={control}
            placeholder="Mot De Passe"
            secureTextEntry
            rules={{
              required: 'Mot De Passe Obligatoire',
              minLength: {
                value: 8,
                message: 'Le Mot De Passe Doit Avoir Minimum 8 Caractères',
              },
            }}
          />
          <CustomInput
            name="password-repeat"
            control={control}
            placeholder="Confirmer Mot De Passe"
            secureTextEntry
            rules={{
              validate: value => value === pwd || 'Le Mot De Passe Ne Correspond Pas',
            }}
          />

          <CustomButton
            text="Enregistrer"
            onPress={handleSubmit(onRegisterPressed)}
          />

          <CustomButton
            text="Déjà Un Compte? Connecte-toi"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: '50%',
    paddingBottom: '50%',
    alignItems: 'center',
    padding: 20,
    /*backgroundColor: '#9999FF',*/
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  text: {
    color: 'white',
    marginVertical: 10,
  },
  link: {
    color: '#6600CC',
  },
});

export default SignUpScreen;
