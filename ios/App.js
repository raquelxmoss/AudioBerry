import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Sound from 'react-native-sound';

import Player from './Player';

// TODO - typescript
const Book = {
  title: 'Crazy Rich Asians',
  author: 'Kevin Kwan',
  filename: 'crazy-rich-asians.mp3',
  coverart: ''
}

export default function App () {
  return (
    <View style={styles.container}>
      <Player book={Book} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
