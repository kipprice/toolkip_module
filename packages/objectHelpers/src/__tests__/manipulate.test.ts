import { map } from '..';
import { filter } from '../manipulate';

describe('map', () => {
    it('returns an array from mapped object', () => {
        const obj = { a: 'A', b: 'B' };
        const out = map(obj, (v) => v);
        expect(out).toMatchObject([ 'A', 'B' ])
    })

    it('returns array from mapped array', () => {
        const obj = ['A', 'B'];
        const out = map(obj, (v) => v.toLowerCase());
        expect(out).toMatchObject([ 'a', 'b' ])
    })

    it('does not require a callback', () => {
        const obj = { a: 'A', b: 'B' };
        const out = map(obj);
        expect(out).toMatchObject([ 'A', 'B' ]);
    })

})

describe('filter', () => {
    it('filters out values', () => {
        const obj = [ 1, 2, 3, 4, 5, 6 ];
        const out = filter(obj, (v: number) => v % 2 === 0 ? true : false);
        expect(out).toMatchObject([ 2, 4, 6 ]);
    })
})

