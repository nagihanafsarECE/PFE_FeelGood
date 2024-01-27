import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { faqStyles, styles } from '../../styles/styles';
import {LinearGradient} from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const FaqScreen = ({ navigation }) => {
  const faqData = [
    {
      question: "Comment fonctionne le Quiz ?",
      answer: "Une fois connecté à l'application, l'utilisateur clique à la section 'Quiz'. À partir de là, il sélectionne un thème initial, puis répond aux questions en choisissant les options correspondantes.",
    },
    {
      question: "Comment gagner des points en faisant un Quiz ?",
      answer: "En cas de réponses correctes à toutes les questions, la barre de progression sur la page d'accueil s'incrémente d'un point pour chaque quiz accompli avec succès.",
    },
    {
      question: "Pouvons-nous gagner plusieurs points en effectuant plusieurs fois le même Quiz ?",
      answer: "Non, il n'est possible de gagner qu'un seul point, même en effectuant le même Quiz plusieurs fois.",
    },
    {
      question: "Comment fonctionne les Jeux ?",
      answer: "Une fois connecté à l'application, l'utilisateur clique à la section 'Jeux'. À partir de là, il sélectionne un Jeu initial, puis répond aux questions en choisissant les options correspondantes.\n\nSi l'utilisateur choisi une option de réponse qui contient un texte positif, alors il échoue. \n\nSi l'utilisateur choisi une option de réponse qui contient un texte négatif, alors il devra ensuite corriger ce texte négatif en texte positif.",
    },
    {
      question: "Comment gagner des points en faisant un Jeu ?",
      answer: "Lorsque l'utilisateur arrive à la page pour corriger le texte négatif en texte positif, alors il peut gagner un maximum de 15 points selon le texte qu'il écrit. De plus, la barre de progression sur la page d'accueil s'incrémente.\n\nSi l'utilisateur écrit un texte négatif alors il ne gagne aucun point.",
    },
    {
      question: "Pouvons-nous accumuler plusieurs points en effectuant plusieurs fois le même Jeu ?",
      answer: "Non, il n'est possible de gagner qu'un nombre de points limite, même en effectuant le même Jeu plusieurs fois.",
    },
    {
      question: "Comment puis-je me déconnecter ?",
      answer: "Pour vous déconnecter, vous pouvez cliquer sur 'Mon Compte', puis, vous cliquez sur 'Déconnexion'.",
    },
    {
      question: "Comment puis-je supprimer mon compte ?",
      answer: "Pour vous déconnecter, vous pouvez cliquer sur 'Mon Compte', puis, vous cliquez sur 'Supprimer Mon Compte'.",
    },
    {
      question: "Comment puis-je réinitialiser mon mot de passe ?",
      answer: "Pour réinitialiser votre mot de passe, vous pouvez cliquer sur 'Mot de passe oublié' lors de la connexion, puis, vous suivez les instructions pour réinitialiser votre mot de passe.",
    },
    {
      question: "Comment puis-je contacter le support client ?",
      answer: "Vous pouvez contacter notre support client en envoyant un e-mail à nagihan.afsar@edu.ece.fr ou en utilisant le formulaire de contact disponible sur la page 'Aide'.",
    },
    {
      question: "Où puis-je trouver la documentation complète de l'application ?",
      answer: "La documentation complète de l'application est disponible dans la section 'Liens vers la documentation' de la page 'Aide'. Vous y trouverez des guides détaillés sur l'utilisation de l'application.",
    },
    {
      question: "Où puis-je trouver les conditions d'utilisation et la politique de confidentialité ? ?",
      answer: "Les conditions d'utilisation et la politique de confidentialité sont disponibles dans la section 'Conditions d'utilisation & Politique de confidentialité' de la page 'Aide'.",
    },
  ];

  return (
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={faqStyles.container}>
        {faqData.map((faqItem, index) => (
          <View key={index} style={faqStyles.faqItem}>
            <Text style={faqStyles.question}>{faqItem.question}</Text>
            <Text style={faqStyles.answer}>{faqItem.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

export default FaqScreen;

