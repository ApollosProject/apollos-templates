import { Animated } from 'react-native';
import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import 'react-native/Libraries/Animated/src/bezier';

ApollosConfig.loadJs({
  FRAGMENTS,
  ONE_SIGNAL_KEY: 'doesntmatter',
});

Animated.timing = (value, config) => ({
  start: (callback) => {
    value.setValue(config.toValue);
    callback && callback({ finished: true });
  },
  stop: () => ({}),
});
Animated.spring = (value, config) => ({
  start: (callback) => {
    value.setValue(config.toValue);
    callback && callback({ finished: true });
  },
  stop: () => ({}),
});

jest.mock('./src/client/index');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  const Easing = {
    exp: jest.fn(),
    out: jest.fn(),
  };

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  Reanimated.Easing = Easing;
  Reanimated.EasingNode = Easing;

  return Reanimated;
});

global.__reanimatedWorkletInit = jest.fn();
