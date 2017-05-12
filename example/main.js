import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Touchable from '@appandflow/touchable';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up main.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
