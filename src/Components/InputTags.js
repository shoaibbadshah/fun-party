import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

import validateTags from '../Utils/validateTags';

const InputTags = ({ message, setTags, setmessage, setMention }) => {
  const theme = useSelector((e) => e.theme);

  //const regex = /\@[a-zA-Z0-9_]+/;
  const format = /[ !#@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\n]/;

  const [testFormattedContent, setTestFormattedContent] = useState('');
  const refTextInput = useRef(null);

  const handleChangeText = (inputText) => {
    const retLines = inputText.split('\n');
    const formattedText = [];
    let tempTags = [];
    let tempMention = [];
    retLines.forEach((retLine, index) => {
      if (index !== 0) formattedText.push('\n');
      const words = retLine.split(' ');
      const contentLength = words.length;
      words.forEach((word, index) => {
        if (validateTags(word)) {
          tempTags.push(word);
          const hashMention = (
            <Text key={index} style={{ color: theme.indicator }}>
              {word}
            </Text>
          );
          if (index !== contentLength - 1) formattedText.push(hashMention, ' ');
          else formattedText.push(hashMention);
        } else if (word.startsWith('@') && !format.test(word.substr(1))) {
          tempMention.push(word);

          const mention = (
            <Text key={index} style={{ color: 'red' }}>
              {word}
            </Text>
          );
          if (index !== contentLength - 1) formattedText.push(mention, ' ');
          else formattedText.push(mention);
        } else {
          if (index !== contentLength - 1) return formattedText.push(word, ' ');
          else return formattedText.push(word);
        }
      });
    });
    setTestFormattedContent(formattedText);
    setTags(tempTags);
    setmessage(inputText);
    setMention(tempMention);
  };

  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        refTextInput.current.focus();
      }}
    >
      <Text style={{ ...styles.text, color: theme.text }}>
        {testFormattedContent}
      </Text>
      <TextInput
        ref={refTextInput}
        autoCorrect={false}
        placeholderTextColor='#B7B7B7'
        style={[styles.text_input]}
        onChangeText={handleChangeText}
        value={message}
        placeholder='Add message'
        multiline={true}
        textAlignVertical='top'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
    height: '100%',
  },
  text_input: {
    color: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    padding: 5,
  },
  text: {
    position: 'absolute',
    padding: 5,
  },
});
export default InputTags;
