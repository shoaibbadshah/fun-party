import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useDispatch } from 'react-redux';

import Followers from './Followers';
import { DarkMode, LightMode } from '../Store/Actions/theme';

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme === 'dark') {
        dispatch(DarkMode());
      } else {
        dispatch(LightMode());
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return <Followers />;
};

export default LandingPage;
