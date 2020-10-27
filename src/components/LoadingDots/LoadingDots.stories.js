import React from 'react';
import LoadingDots from './LoadingDots';

export default {
    title: 'Loading Dots',
    component: LoadingDots
}

const Template = args => <LoadingDots {...args} />;

export const Default = Template.bind({});
