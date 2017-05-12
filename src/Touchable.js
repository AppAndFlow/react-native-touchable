// @flow

import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
} from 'react-native';

type Props = {
  feedback: 'opacity' | 'highlight' | 'none',
  native?: boolean,
  overflow?: boolean,
  onPress?: () => any,
};

export default class Touchable extends Component {
  props: Props;
  render() {
    const {
      feedback,
      native = true,
      overflow = false,
      onPress,
      ...others
    } = this.props;
    if (native && Platform.OS === 'android' && Platform.Version >= 21) {
      if (others.disabled) {
        return <View {...others} />;
      }
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(undefined, overflow)}
          onPress={onPress}
        >
          <View {...others} />
        </TouchableNativeFeedback>
      );
    } else if (feedback === 'opacity') {
      return <TouchableOpacity {...others} onPress={onPress} />;
    } else if (feedback === 'highlight') {
      return (
        <TouchableHighlight onPress={onPress} {...others}>
          <View {...others} />
        </TouchableHighlight>
      );
    } else if (feedback === 'none') {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View {...others} />
        </TouchableWithoutFeedback>
      );
    }
    throw new Error('Invalid feedback type');
  }
}
