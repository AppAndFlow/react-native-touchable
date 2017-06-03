# @appandflow/touchable

[![npm (scoped)](https://img.shields.io/npm/v/@appandflow/touchable.svg)](https://www.npmjs.com/package/@appandflow/touchable) [![Travis branch](https://img.shields.io/travis/AppAndFlow/react-native-touchable/master.svg)](https://travis-ci.org/AppAndFlow/react-native-touchable)

An helper to react-native touchable element. Work with all the feedback provided by react-native and add the ripple effect for android by default.

## Why use this library?

Let you import only one component and don't care about the platform. Also get native feedback by default for android. Don't worry you can disabled this effect by passing `native={false}`

## Installation

`yarn add @appandflow/touchable`

## Usage

`import Touchable from '@appandflow/touchable';`

Touchable become like a view and have access to all his props.

## Props

### feedback

- opacity
- highlight
- none

### disabled

You can disabled the touch by passing disabled true. Default false.

### native [Android only]

For don't get the native effect just pass native false. By default this is true.

**If false don't forget to add a feedback**

## Example

Play with on [Expo](https://exp.host/@equimper/example)

Take a look at example folder also. [Link](https://github.com/AppAndFlow/react-native-touchable/blob/master/example)

```js
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import Touchable from '@appandflow/touchable';

class App extends Component {
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
```
