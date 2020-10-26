import React from 'react';
import OrderEntry from './OrderEntry';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Order Entry',
    component: OrderEntry
}

const Template = args => <OrderEntry {...args} />;

export const Default = Template.bind({});
Default.args = {
    onSubmit: action('onSubmit')
}
