import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Touchable from '@appandflow/touchable';

class App extends React.Component {
  _handleAlert = feedback => {
    Alert.alert(`You touch the feedback: ${feedback}`)
  }
  render() {
    return (
      <View style={styles.container}>
        <Touchable feedback="opacity" style={[styles.button, styles.opacity]} onPress={() => this._handleAlert('opacity')}>
          <Text style={styles.buttonText}>OPACITY</Text>
        </Touchable>
        <Touchable feedback="highlight" style={[styles.button, styles.highlight]} onPress={() => this._handleAlert('highlight')}>
          <Text style={styles.buttonText}>HIGHLIGHT</Text>
        </Touchable>
        <Touchable feedback="none" style={[styles.button, styles.none]} onPress={() => this._handleAlert('none')}>
          <Text style={styles.buttonText}>NONE</Text>
        </Touchable>
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
  button: {
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 12,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  opacity: {
    backgroundColor: 'cyan'
  },
  highlight: {
    backgroundColor: 'turquoise'
  },
  none: {
    backgroundColor: 'gray'
  }
});

Expo.registerRootComponent(App);
