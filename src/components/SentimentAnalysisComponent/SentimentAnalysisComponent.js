/**
 * SentimentAnalysisComponent is a React Native component that analyzes sentiment of a given sentence.
 * It communicates with a sentiment analysis server and updates user and game history data in the AWS Amplify backend.
 * The component includes a text input for user input, a button to trigger sentiment analysis, and displays the result
 * with a congratulatory message for positive sentiment, an encouragement to try again for negative sentiment, and
 * the corresponding score. It also uses the Confetti component for positive sentiment celebration.
 */

import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { styles } from '../../styles/styles';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { updateJeuHistory, updateUser } from '../../graphql/mutations';
import { listJeuHistories } from '../../graphql/queries';
import Confetti from 'react-native-confetti';

const SentimentAnalysisComponent = ({ selectedTheme }) => {
  const [sentence, setSentence] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [points, setPoints] = useState('');

  const analyzeSentiment = async () => {
    try {
      // Fetch sentiment analysis and translation results from the server
      const response = await fetch('http://10.5.17.112:3002/analyze_sentiment_and_translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSentiment(data.sentiment);
      displayResultMessage(data.sentiment);
      setPoints(data.points);

      // Update points in the database
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub;

      // Perform a read operation to get the JeuHistory ID
      const getJeuHistoryResponse = await API.graphql(graphqlOperation(listJeuHistories, {
        filter: {
          userID: { eq: userId },
          jeuId: { eq: selectedTheme }
        }
      }));

      const jeuHistoryItem = getJeuHistoryResponse.data.listJeuHistories.items[0];

      if (jeuHistoryItem) {
        const jeuHistoryId = jeuHistoryItem.id;

        // Use jeuHistoryId to update the item
        await API.graphql(graphqlOperation(updateJeuHistory, {
          input: { id: jeuHistoryId, jeuId: selectedTheme, userID: userId, pts: data.points }
        }));
      } else {
        console.error('JeuHistory non trouvé pour les critères donnés.');
        // Handle the case where the item is not found
      }

      // Perform a read operation to get all JeuHistory items matching the userID
      const getJeuHistoriesResponse = await API.graphql(graphqlOperation(listJeuHistories, {
        filter: {
          userID: { eq: userId }
        }
      }));

      const jeuHistories = getJeuHistoriesResponse.data.listJeuHistories.items;

      // Calculate the sum of points
      const totalPoints = jeuHistories.reduce((sum, jeuHistory) => sum + jeuHistory.pts, 0);

      // Update jeuPoints in the database with the calculated sum
      await API.graphql(graphqlOperation(updateUser, {
        input: { id: userId, jeuPoints: totalPoints }
      }));

    } catch (error) {
      console.error('Error analyzing sentiment:', error.message);
    }
  };

  const confettiRef = useRef(null);

  const displayResultMessage = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        if (confettiRef.current) {
          confettiRef.current.startConfetti();
        }
        setResultMessage('Votre commentaire est positif, bravo !');
        break;
      case 'negative':
        setResultMessage('Votre commentaire est négatif, réessayez !');
        break;
      default:
        setResultMessage('Votre commentaire est neutre.');
        break;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styless.container}
        >
        <View style={styless.container}>
        <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Texte"
            value={sentence}
            onChangeText={(text) => setSentence(text)}
            multiline
        />
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={analyzeSentiment}>
            <Text style={styles.buttonText}>Analyze Sentiment</Text>
        </TouchableOpacity>
        <View style={{paddingTop: "10%"}}>
            {sentiment === 'positive' && <Confetti ref={confettiRef} />}
            {resultMessage && <Text style={styles.buttonText}>{resultMessage}</Text>}
            {<Text style={styles.buttonText}>Score : {points} point(s)</Text>}
        </View>
        </View>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SentimentAnalysisComponent;

const styless = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
