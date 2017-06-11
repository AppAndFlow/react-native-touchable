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
  disabled?: boolean,
};

export default class Touchable extends Component {
  props: Props;
  render() {
    const {
      feedback,
      native = true,
      overflow = false,
      onPress,
      disabled,
      ...others
    } = this.props;
    if (native && Platform.OS === 'android' && Platform.Version >= 21) {
      if (disabled) {
        return <View {...others} />;
      }
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(undefined, overflow)}
          disabled={disabled}
          onPress={onPress}
        >
          <View {...others} />
        </TouchableNativeFeedback>
      );
    } else if (feedback === 'opacity') {
      return (
        <TouchableOpacity {...others} onPress={onPress} disabled={disabled} />
      );
    } else if (feedback === 'highlight') {
      const { style, children, ...othersWithoutStyle } = others;
      return (
        <TouchableHighlight
          onPress={onPress}
          disabled={disabled}
          {...othersWithoutStyle}
        >
          <View style={style}>{children}</View>
        </TouchableHighlight>
      );
    } else if (feedback === 'none') {
      return (
        <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
          <View {...others} />
        </TouchableWithoutFeedback>
      );
    }
    throw new Error('Invalid feedback type');
  }
}
