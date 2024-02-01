/**
 * NewPasswordScreen represents the screen for updating the password
 * after a user has initiated a forgot password process. It allows users to enter
 * their username, verification code, and a new password.
 * The component uses React Hook Form for managing form state and validation.
 * It also uses AWS Amplify for authentication and displays a gradient background.
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {LinearGradient} from 'expo-linear-gradient';

const NewPasswordScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  // Handle form submission
  const onSubmitPressed = async data => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  // Navigate to the SignIn screen
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>Mettre A Jour Le Mot De Passe</Text>

          <CustomInput
            placeholder="Nom d'Utilisateur"
            name="username"
            control={control}
            rules={{required: 'Nom Utilisateur Obligatoire'}}
          />

          <CustomInput
            placeholder="Code"
            name="code"
            control={control}
            rules={{required: 'Code Obligatoire'}}
          />

          <CustomInput
            placeholder="Entrez Le Nouveau Mot De Passe"
            name="password"
            control={control}
            secureTextEntry
            rules={{
              required: 'Mot De Passe Obligatoire',
              minLength: {
                value: 8,
                message: 'Le Mot De Passe Doit Avoir Minimum 8 Caractères',
              },
            }}
          />

          <CustomButton text="Envoyer" onPress={handleSubmit(onSubmitPressed)} />

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

const styles = StyleSheet.create({
  root: {
    paddingTop: '50%',
    paddingBottom: '100%',
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
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default NewPasswordScreen;
