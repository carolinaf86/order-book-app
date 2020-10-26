import React from 'react';
import OrderBook from './OrderBook';

export default {
    title: 'Order Book',
    component: OrderBook
}

const Template = args => <OrderBook {...args} />;

export const Default = Template.bind({});
Default.args = {
    orders: {
        buys: { 10: 100, 12: 20, 14: 24, 15: 40, 30: 30, 1: 40, 100: 10 },
        sells: { 15: 0, 20: 1000, 24: 10, 5: 60, 10: 0, 3: 90, 40: 10 }
    }

};

export const Loading = Template.bind({});
Loading.args = {
    orders: {},
    loading: true
}
