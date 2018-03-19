# @appandflow/touchable

[![npm (scoped)](https://img.shields.io/npm/v/@appandflow/touchable.svg)](https://www.npmjs.com/package/@appandflow/touchable) [![Travis branch](https://img.shields.io/travis/AppAndFlow/react-native-touchable/master.svg)](https://travis-ci.org/AppAndFlow/react-native-touchable)

A wrapper for react-native `Touchable` components to simplify the API and make the Android ripple effect work by default. Based on [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler).

## Why use this library?

It lets you import only component and forget about which platform you are using, it will default to the best behavior for the platform.

## Installation

`yarn add @appandflow/touchable`

## Usage

`import Touchable from '@appandflow/touchable';`

If you are using things like `ScrollView` make sure to use the one included in react-native-gesture-handler for better interactions.

## Props

### feedback

* opacity
* highlight
* none

### disabled

You can disable the touch by passing disabled `true`. Default `false`.

### native [Android only]

TODO: This doesn't work anymore as of V2

Toggle whether or not to use the ripple effects on Android. By default this is true on Android.

**If false don't forget to add a feedback**

## History

### v2.0.0

* This version now uses [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler). If you are using Expo it is included by default, otherwise you will need to install it. For a version that uses RN primitives use @^1.0.0.

* native={false} is not currently implemented.

* onLongPress is no longer supported, use LongPressGestureHandler from react-native-gesture-handler instead.

## Example

Take a look at example folder. [Link](https://github.com/AppAndFlow/react-native-touchable/blob/master/example)

```js
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import Touchable from '@appandflow/touchable';

class App extends Component {
  _handleAlert = feedback => {
    Alert.alert(`You touch the feedback: ${feedback}`);
  };
  render() {
    return (
      <View style={styles.container}>
        <Touchable
          feedback="opacity"
          style={[styles.button, styles.opacity]}
          onPress={() => this._handleAlert('opacity')}
        >
          <Text style={styles.buttonText}>OPACITY</Text>
        </Touchable>
        <Touchable
          feedback="highlight"
          style={[styles.button, styles.highlight]}
          onPress={() => this._handleAlert('highlight')}
        >
          <Text style={styles.buttonText}>HIGHLIGHT</Text>
        </Touchable>
        <Touchable
          feedback="none"
          style={[styles.button, styles.none]}
          onPress={() => this._handleAlert('none')}
        >
          <Text style={styles.buttonText}>NONE</Text>
        </Touchable>
      </View>
    );
  }
}
```
