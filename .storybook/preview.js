import React from 'react';
import { addDecorator } from '@storybook/react';
import { GlobalStyle } from '../src/GlobalStyle';

addDecorator(s => <><GlobalStyle />{s()}</>);
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
