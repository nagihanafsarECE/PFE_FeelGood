/**
 * JeuxScreen component represents the screen for playing games (Jeux).
 * It allows users to select a theme and answer quiz questions.
 * The component uses Amplify for authentication and GraphQL for data fetching and mutations.
 * It includes features such as fetching themes, questions, and answers, handling answer selections,
 * displaying quiz content, and resetting the quiz or selecting a new theme.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listQJeus, listAJeus, listQJeuAJeus, listTJeus, listUsers, listJeuHistories } from '../../graphql/queries';
import { quizStyles, styles } from '../../styles/styles';
import { createJeuHistory } from '../../graphql/mutations';
import { LinearGradient } from 'expo-linear-gradient';
import SentimentAnalysisComponent from '../../components/SentimentAnalysisComponent';

const buttonColors = ['#FF0000', '#0000FF', '#00CC33', '#FFCC00'];

const JeuxScreen = () => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Theme backgrounds for different theme IDs
  const themeBackgrounds = {
    "74fd62e0-0e26-4db2-9b3a-b95188d90575": require('../../../assets/images/jeu.png'),
    "b856d0d3-21f7-4887-b560-d588f24b7cbd": require('../../../assets/images/influenceuse.png'),
    "55edae68-e4ce-4f52-bcd8-c34c5b5bd6e6": require('../../../assets/images/footballeur.png'),
  };

  // Fetch themes when the component mounts
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listTJeus));
        setThemes(response.data.listTJeus.items);
        
      } catch (error) {
        console.error('Error fetching TJeus:', error);
      }
    };

    fetchThemes();
  }, []);

  // Fetch questions and answers when a theme is selected
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsResponse = await API.graphql(graphqlOperation(listQJeus, {
          filter: {
            tjeuID: { eq: selectedTheme },
          },
        }));
        setQuestions(questionsResponse.data.listQJeus.items);

        const answersResponse = await API.graphql(graphqlOperation(listAJeus));
        setAnswers(answersResponse.data.listAJeus.items);

        const questionAnswersResponse = await API.graphql(graphqlOperation(listQJeuAJeus));
        setQuestionAnswers(questionAnswersResponse.data.listQJeuAJeus.items);
      } catch (error) {
        console.error('Er\ror fetching data:', error);
      }
    };

    if (selectedTheme) {
      fetchData();
    }
  }, [selectedTheme]);

  // Get answers for the current question
  const getAnswersForQuestion = () => {
    const currentQuestionId = questions[questionIndex]?.id;
    const answersForQuestion = questionAnswers
    /*.filter((qa) => {
      console.log('qa.qJeuId:', qa.qJeuId);
      console.log('questions[questionIndex]?.tjeuID:', questions[questionIndex]?.tjeuID);
      console.log('currentQuestionId === qa.qJeuId:', currentQuestionId === qa.qJeuId);
      console.log('selectedTheme === questions[questionIndex]?.tjeuID:', selectedTheme === questions[questionIndex]?.tjeuID);

      return currentQuestionId === qa.qJeuId && selectedTheme === questions[questionIndex]?.tjeuID;
    })*/
      .filter((qa) => qa.qJeuId === currentQuestionId && questions[questionIndex]?.tjeuID === selectedTheme)
      .map((qa) => answers.find((a) => a.id === qa.aJeuId));

      /*.map((qa) => {
        console.log('qa.aJeuId:', qa.aJeuId);
        const answer = answers.find((a) => a.id === qa.aJeuId);
        console.log('Mapped Answer:', answer);
        return answer;
      });*/

    return answersForQuestion;
  };
  
  // Get answers for the current question
  const handleAnswerSelection = async (ajeuId) => {
    const currentQuestion = questions[questionIndex];
    const isCorrectAnswer = currentQuestion.qJeuAcceptedAJeuId === ajeuId;
    setSelectedAnswer(ajeuId);
    
    if (isCorrectAnswer) {
      setScore(score + 1);
    }
  
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
  
      // Check if the user has already taken this quiz
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub;
  
      const quizHistoryResponse = await API.graphql(graphqlOperation(listJeuHistories, {
        filter: { userID: { eq: userId }, jeuId: { eq: selectedTheme } }
      }));
  
      if (quizHistoryResponse.data.listJeuHistories.items.length === 0) {
        // Check if the user has selected the correct answer
        if (isCorrectAnswer) {
          const createJeuHistoryResponse = await API.graphql(graphqlOperation(createJeuHistory, {
            input: { userID: userId, jeuId: selectedTheme, pts: 0 }
          }));
  
          console.log('Quiz history created:', createJeuHistoryResponse.data.createJeuHistory);
        }
      }
    }
  };
  
  // Reset quiz state
  const handleResetQuiz = () => {
    setQuizCompleted(false);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  // Reset theme and quiz state
  const handleResetTheme = () => {
    setQuizCompleted(false);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setSelectedTheme(null); 
  };

  // Render quiz content or theme selection
  const renderQuizContent = () => {
    if (selectedTheme) {
      const currentQuestion = questions[questionIndex];

      return (
        <View style={styles.container}>
          <Text style={quizStyles.titleQuiz}>{currentQuestion?.text}</Text>
          <FlatList
            data={getAnswersForQuestion()}
            keyExtractor={(answer) => answer.id}
            renderItem={({ item: answer, index }) => {
              const buttonColor = buttonColors[index % buttonColors.length];
              return (
                <TouchableOpacity
                  style={[
                    styles.buttonContainer,
                    selectedAnswer === answer.id && styles.selectedAnswerButton,
                    { backgroundColor: buttonColor },
                  ]}
                  onPress={() => handleAnswerSelection(answer.id)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={styles.buttonText}>{answer.text}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    } else {
      // Display theme selection
      return (
        <FlatList
          data={themes}
          keyExtractor={(theme) => theme.id}
          renderItem={({ item: theme }) => (
            <TouchableOpacity
              //style={styles.buttonContainer}
              onPress={() => {
                console.log('Selected Theme:', theme);
                setSelectedTheme(theme.id);
                setQuestionIndex(0);
              }}
              style={styles.buttonContainer}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ImageBackground
                source={themeBackgrounds[theme.id]}
                style={styles.themeImage}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>{theme.text}</Text>
              </View>            
            </TouchableOpacity>
          )}
        />
      );
    }
  };

  return ( 
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
  
      {quizCompleted ? (
        <>
          {selectedAnswer !== null ? (
            selectedAnswer === questions[questionIndex]?.qJeuAcceptedAJeuId ? (
              // Display sentiment analysis component for correct answers
              <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                >
                <SentimentAnalysisComponent selectedTheme={selectedTheme}/>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleResetTheme}>
                  <Text style={styles.buttonText}>Select Theme</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
              </>
            ) : (
              // Display message and options for incorrect answers
              <>
                <Text style={quizStyles.titleQuiz}>
                  Mauvaise réponse{'\n'}Réessayez !
                </Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleResetQuiz}>
                  <Text style={styles.buttonText}>Reset Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleResetTheme}>
                  <Text style={styles.buttonText}>Select Theme</Text>
                </TouchableOpacity>
              </>
            )
          ) : null}
        </>
      ) : (
        // Render quiz content or theme selection
        renderQuizContent()
      )}
    </LinearGradient>
  );
  
  
};

export default JeuxScreen;

