// @flow

import * as React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
  StyleSheet,
} from 'react-native';

// Touchable highlight is tricky and certain style props must be included
// either on the Touchable component or the inner container view. Some must also
// be included on both.
const OUTER_VIEW_KEYS = new Set([
  'margin',
  'marginHorizontal',
  'marginVertical',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
]);
const BOTH_VIEW_KEYS = new Set([
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
]);

function separateStyle(style) {
  if (!style) {
    return { inner: style, outer: null };
  }

  const resolvedStyle = StyleSheet.flatten(style);
  if (!resolvedStyle) {
    return { inner: null, outer: null };
  }
  const inner = {};
  const outer = {};

  Object.keys(resolvedStyle).forEach(key => {
    if (BOTH_VIEW_KEYS.has(key)) {
      outer[key] = resolvedStyle[key];
      inner[key] = resolvedStyle[key];
    } else if (OUTER_VIEW_KEYS.has(key)) {
      outer[key] = resolvedStyle[key];
    } else {
      inner[key] = resolvedStyle[key];
    }
  });

  return { inner, outer };
}

type Props = {
  feedback: 'opacity' | 'highlight' | 'none',
  native?: boolean,
  overflow?: boolean,
  onPress?: () => any,
  onLongPress?: () => any,
  disabled?: boolean,
  hitSlop?: { top?: number, bottom?: number, left?: number, right?: number },
  tintColor?: string,
  style?: any,
  children?: React.Node,
};

export default class Touchable extends React.Component<Props> {
  static defaultProps = {
    native: true,
    overflow: false,
    disabled: false,
  };

  render() {
    const {
      feedback,
      native,
      overflow,
      onPress,
      onLongPress,
      disabled,
      hitSlop,
      tintColor,
      ...others
    } = this.props;
    if (native && Platform.OS === 'android' && Platform.Version >= 21) {
      if (disabled) {
        return <View {...others} />;
      }
      return (
        <TouchableNativeFeedback
          // eslint-disable-next-line babel/new-cap
          background={TouchableNativeFeedback.Ripple(tintColor, overflow)}
          disabled={disabled}
          hitSlop={hitSlop}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View {...others} />
        </TouchableNativeFeedback>
      );
    } else if (feedback === 'opacity') {
      return (
        <TouchableOpacity
          {...others}
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
          hitSlop={hitSlop}
        />
      );
    } else if (feedback === 'highlight') {
      const { style, children, ...othersWithoutStyle } = others;
      const { inner, outer } = separateStyle(style);
      return (
        <TouchableHighlight
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
          hitSlop={hitSlop}
          {...othersWithoutStyle}
          style={outer}
        >
          <View style={inner}>
            {children}
          </View>
        </TouchableHighlight>
      );
    } else if (feedback === 'none') {
      return (
        <TouchableWithoutFeedback
          disabled={disabled}
          hitSlop={hitSlop}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View {...others} />
        </TouchableWithoutFeedback>
      );
    }
    throw new Error('Invalid feedback type');
  }
}
