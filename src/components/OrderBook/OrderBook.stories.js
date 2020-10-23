import React from 'react';
import OrderBook from './OrderBook';

export default {
    title: 'Order Book',
    component: OrderBook
}

const Template = args => <OrderBook {...args} />;

export const Default = Template.bind({});
Default.args = {
    rows: [
        { buyQuantity: 200, buyPrice: 3000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 3000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 3000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 3000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 3000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 1},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 2000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 10},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 1000, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 200},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 1000},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 1000},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 1000},
        { buyQuantity: 200, buyPrice: 500, sellQuantity: 10, sellPrice: 1000},
    ]
};
