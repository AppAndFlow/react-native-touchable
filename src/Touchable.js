// @flow

import * as React from 'react';
import {
  BaseButton,
  RectButton,
  BorderlessButton,
} from 'react-native-gesture-handler';

type Props = {
  feedback: 'opacity' | 'highlight' | 'none',
  // Not currently supported.
  // native?: boolean,
  overflow?: boolean,
  onPress?: () => any,
  disabled?: boolean,
  hitSlop?: { top?: number, bottom?: number, left?: number, right?: number },
  style?: any,
  children?: React.Node,
  activeOpacity?: number,
  underlayColor?: string,
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
      overflow,
      onPress,
      disabled,
      hitSlop,
      activeOpacity,
      underlayColor,
      ...others
    } = this.props;
    if (feedback === 'opacity') {
      return (
        <BorderlessButton
          {...others}
          onPress={onPress}
          enabled={!disabled}
          hitSlop={hitSlop}
          borderless={overflow}
          activeOpacity={activeOpacity}
        />
      );
    } else if (feedback === 'highlight') {
      return (
        <RectButton
          {...others}
          onPress={onPress}
          enabled={!disabled}
          hitSlop={hitSlop}
          underlayColor={underlayColor}
        />
      );
    } else if (feedback === 'none') {
      return (
        <BaseButton
          enabled={!disabled}
          hitSlop={hitSlop}
          onPress={onPress}
          {...others}
        />
      );
    }
    throw new Error('Invalid feedback type');
  }
}
