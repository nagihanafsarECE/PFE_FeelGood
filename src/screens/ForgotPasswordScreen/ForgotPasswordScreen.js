/**
 * ForgotPasswordScreen is a React Native screen that allows users to request a password reset.
 * It utilizes AWS Amplify Auth for the forgotPassword functionality. Users provide their username,
 * and upon successful submission, they are navigated to the NewPassword screen.
 * The screen includes a linear gradient background and custom input and button components for a cohesive UI.
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {LinearGradient} from 'expo-linear-gradient';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const onSendPressed = async data => {
    try {
      // Request a password reset using the provided username
      await Auth.forgotPassword(data.username);
      navigation.navigate('NewPassword');
    } catch (e) {
      // Handle any errors during the password reset request
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    // Navigate to the SignIn screen
    navigation.navigate('SignIn');
  };

  return (
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Nouveau Mot De Passe</Text>

          <CustomInput
            name="username"
            control={control}
            placeholder="Nom D'Utilisateur"
            rules={{
              required: 'Nom Utilisateur Obligatoire',
            }}
          />

          <CustomButton text="Envoyer" onPress={handleSubmit(onSendPressed)} />

          <CustomButton
            text="Retour A La Connexion"
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
    paddingTop: '60%',
    paddingBottom: '100%',
    alignItems: 'center',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    /*backgroundColor: '#9999FF',*/

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
    color: 'white',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#6600CC',
  },
});

export default ForgotPasswordScreen;
