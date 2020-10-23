import { processOrders } from './process-orders';

describe('processOrders', () => {
    it('returns a sorted list of order rows', () => {
        const orders = {
            buys: { 10: 100, 12: 20, 14: 24 },
            sells: { 15: 1, 20: 1000, 24: 10 },
        };
        const rows = processOrders(orders);
        expect(rows).not.toBeNull();
        expect(rows).toHaveLength(3);
        expect(rows[0]).toEqual({ buyPrice: 14, buyQuantity: 24, sellPrice: 15, sellQuantity: 1 });
        expect(rows[1]).toEqual({ buyPrice: 12, buyQuantity: 20, sellPrice: 20, sellQuantity: 1000 });
        expect(rows[2]).toEqual({ buyPrice: 10, buyQuantity: 100, sellPrice: 24, sellQuantity: 10 });
    });
    it('removes orders with 0 quantity', () => {
        const orders = {
            buys: { 10: 100, 12: 20, 14: 24 },
            sells: { 15: 0, 20: 1000, 24: 10 },
        };
        const rows = processOrders(orders);
        expect(rows).not.toBeNull();
        expect(rows).toHaveLength(3);
        expect(rows[0]).toEqual({ buyPrice: 14, buyQuantity: 24, sellPrice: 20, sellQuantity: 1000 });
        expect(rows[1]).toEqual({ buyPrice: 12, buyQuantity: 20, sellPrice: 24, sellQuantity: 10 });
        expect(rows[2]).toEqual({ buyPrice: 10, buyQuantity: 100 });
    });
    it('returns an empty array if orders object is empty', () => {
        const orders = {};
        const rows = processOrders(orders);
        expect(rows).not.toBeNull();
        expect(rows).toHaveLength(0);
    });
    it('handles buys or sells being empty objects', () => {
        [{ buys: { 1: 20 }, sells: {} }, { sells: { 1: 20 }, buys: {} }].forEach((orders, idx) => {
            const rows = processOrders(orders);
            expect(rows).not.toBeNull();
            expect(rows).toHaveLength(1);
            if (idx === 0) {
                expect(rows[0]).toEqual({ buyPrice: 1, buyQuantity: 20 });
            } else {
                expect(rows[0]).toEqual({ sellPrice: 1, sellQuantity: 20 });
            }
        });

    });
});
