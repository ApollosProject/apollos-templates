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
