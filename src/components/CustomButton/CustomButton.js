/**
 * CustomButton component is a reusable button component in React Native.
 * It accepts props such as onPress function, button text, type (PRIMARY, SECONDARY, TERTIARY),
 * background color (bgColor), and foreground color (fgColor). The styles are dynamically
 * applied based on the provided props, allowing for flexibility in button appearance.
 */

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
    /*backgroundColor: '#9999FF',*/
  },

  container_PRIMARY: {
    backgroundColor: '#6600CC',
    marginTop: 10,
  },

  container_SECONDARY: {
    backgroundColor: '#6600CC',
    marginTop: 10,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: 'white',
  },

  text_TERTIARY: {
    color: 'white',
  },
});

export default CustomButton;
