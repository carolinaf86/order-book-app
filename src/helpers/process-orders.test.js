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
        expect(rows[0]).toEqual([ 24, 14, 15, 1 ]);
        expect(rows[1]).toEqual([ 20, 12, 20, 1000 ]);
        expect(rows[2]).toEqual([ 100, 10, 24, 10 ]);
    });
    it('removes orders with 0 quantity', () => {
        const orders = {
            buys: { 10: 100, 12: 20, 14: 24 },
            sells: { 15: 0, 20: 1000, 24: 10 },
        };
        const rows = processOrders(orders);
        expect(rows).not.toBeNull();
        expect(rows).toHaveLength(3);
        expect(rows[0]).toEqual([ 24, 14, 20, 1000 ]);
        expect(rows[1]).toEqual([ 20, 12, 24, 10 ]);
        expect(rows[2]).toEqual([ 100, 10, undefined, undefined ]);
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
                expect(rows[0]).toEqual([ 20, 1, undefined, undefined ]);
            } else {
                expect(rows[0]).toEqual([ undefined, undefined, 1, 20 ]);
            }
        });

    });
});
