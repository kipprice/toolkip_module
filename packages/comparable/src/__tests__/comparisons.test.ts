import { equals } from "../comparisons"

describe('comparisons', () => {
    describe('equals', () => {
        it('handles primitives', () => {
            expect(equals('a', 'a')).toBeTruthy();
            expect(equals(1, 2)).toBeFalsy();
            expect(equals(undefined, undefined)).toBeTruthy();
        })

        it('handles equatables', () => {
            const objA = { equals: () => true };
            const objB = { name: 'A', equals: () => true };
            expect(equals(objA, objB));
        })

        it('handles dates', () => {
            const dtA = new Date('2020-10-10');
            const dtB = new Date('2020-10-10');
            expect(equals(dtA, dtB)).toBeTruthy();
        }),

        it('handles objects', () => {
            const objA = { name: 'Kip', age: 30 };
            const objB = { name: 'Kip', age: 30 };
            expect(equals(objA, objB)).toBeTruthy();
        })

        it('handles arrays', () => {
            const arrA = [{ name: 'A' }, {name:'b'}];
            const arrB = [{ name: 'A' }, {name:'b'}];
            expect(equals(arrA, arrB)).toBeTruthy();
        })
    })

    describe('lesser than', () => {

    })
})