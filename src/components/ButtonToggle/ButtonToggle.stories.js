import React from 'react';
import ButtonToggle from './ButtonToggle';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Button Toggle',
    component: ButtonToggle
}

const Template = args => <ButtonToggle {...args} />;

export const Default = Template.bind({});
Default.args = {
    onChange: action('onChange')
}

export const SellSelected = Template.bind({});
SellSelected.args = {
    ...Default.args,
    value: 'sell'
}
