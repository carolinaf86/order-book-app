export const processOrders = orders => {
    const { buys = {}, sells = {} } = orders;

    const sortedBuys = sortOrders(buys, sortDesc).filter(hasQuantity);
    const sortedSells = sortOrders(sells, sortAsc).filter(hasQuantity);

    const longestArray = sortedBuys.length >= sortedSells.length ? sortedBuys : sortedSells;

    return longestArray.map((_, idx) => ({
        buyQuantity: sortedBuys[idx]?.quantity,
        buyPrice: sortedBuys[idx]?.price,
        sellQuantity: sortedSells[idx]?.quantity,
        sellPrice: sortedSells[idx]?.price,
    }));
};

const sortOrders = (ordersObject, compareFn) => {

    const ordersArray = Object.keys(ordersObject)
        .map(key => ({ price: +key, quantity: ordersObject[key] }));

    ordersArray.sort(compareFn);

    return ordersArray;
}

const sortAsc = (a, b) => (a.price > b.price) ? 1 : -1;
const sortDesc = (a, b) => (a.price < b.price) ? 1 : -1;
const hasQuantity = order => order.quantity > 0;
