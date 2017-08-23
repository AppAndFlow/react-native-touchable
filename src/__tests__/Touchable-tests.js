// @flow

import * as React from 'react';
import { Platform, View } from 'react-native';
import renderer from 'react-test-renderer';

import Touchable from '../Touchable';

// TODO: remove this when Blob is properly mocked.
jest.mock('Blob', () => ({})).mock('URL', () => ({}));

const FEEDBACKS = ['opacity', 'highlight', 'none'];

function createTestForAllFeedbacks(spec, test) {
  FEEDBACKS.forEach(feedback => {
    it(`${spec} with ${feedback} feedback`, () => {
      test(feedback);
    });
  });

  it(`${spec} with native feedback`, () => {
    Platform.OS = 'android';
    test('none');
    Platform.OS = 'ios';
  });
}

describe('Touchable', () => {
  createTestForAllFeedbacks('renders correctly', feedback => {
    const component = renderer
      .create(
        <Touchable feedback={feedback}>
          <View />
        </Touchable>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  createTestForAllFeedbacks('supports multiple children', feedback => {
    const component = renderer
      .create(
        <Touchable feedback={feedback}>
          <View />
          <View />
          <View />
          <View />
        </Touchable>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  createTestForAllFeedbacks('passes style properly', feedback => {
    const component = renderer
      .create(
        <Touchable feedback={feedback} style={{ flex: 1 }}>
          <View />
        </Touchable>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
