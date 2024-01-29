import * as MailComposer from 'expo-mail-composer';
import React, { useState } from 'react';
import { styles } from '../../styles/styles';
import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';




const EmailFormScreen = ({ navigation })  => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmail = async () => {
    try {
      await MailComposer.composeAsync({
        recipients: ['nagihan.afsar@edu.ece.fr'],
        subject: subject,
        body: body,
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi d\'e-mail', error);
    }
  };
  

  return (
    <LinearGradient
    colors={['#9999FF', '#9966FF', '#6600CC']}
    style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        >
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, { marginBottom: 20, alignSelf: 'flex-start'  }]}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Sujet"
            value={subject}
            onChangeText={(text) => setSubject(text)}
          />
          <TextInput
            style={[styles.input, { height: 200 }]}
            placeholder="Message"
            value={body}
            onChangeText={(text) => setBody(text)}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default EmailFormScreen;
