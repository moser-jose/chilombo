import type { Theme } from '@react-navigation/native/src/types';
import { fonts } from '@react-navigation/native/src/theming/fonts';

export const DarkThemeUI: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgba(18, 18, 18, 0.96)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 1)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts,
};