import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Error = ({ message = 'Something went wrong!' }) => {
  return (
    <View>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 20
  }
})

export default Error;