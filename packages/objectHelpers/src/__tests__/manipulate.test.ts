import { map } from '..';

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
})