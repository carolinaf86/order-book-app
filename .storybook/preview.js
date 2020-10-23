import React from 'react';
import { addDecorator } from '@storybook/react';
import { GlobalStyle } from '../src/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../src/Theme';

addDecorator(s => <ThemeProvider theme={Theme}><GlobalStyle />{s()}</ThemeProvider>);
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
