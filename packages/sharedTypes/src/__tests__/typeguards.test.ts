import { isUndefined, isTruthy, isFalsy } from '../_typeGuards';

describe('shared typeguards', () => {
    describe('isUndefined', () => {
        it('succeeds for undefined value', () => {
            expect(isUndefined(undefined)).toBeTruthy();
        })

        it('fails for all other values', () => {
            expect(isUndefined(null)).toBeFalsy();
            expect(isUndefined(0)).toBeFalsy();
            expect(isUndefined('')).toBeFalsy();
            expect(isUndefined({})).toBeFalsy();
        })
    })

    describe('isFalsy', () => {
        it('evaluates correctly on truthy values', () => {
            expect(isFalsy('hello')).toBeFalsy();
            expect(isFalsy(1)).toBeFalsy();
            expect(isFalsy({})).toBeFalsy();
            expect(isFalsy([])).toBeFalsy();
        })

        it('evaluates correctly on non-truthy values without overrides', () => {
            expect(isFalsy(0)).toBeTruthy();
            expect(isFalsy(null)).toBeTruthy();
            expect(isFalsy(undefined)).toBeTruthy();
            expect(isFalsy("")).toBeTruthy();
        })

        it('evaluates correctly on non-truthy values when other overrides are included', () => {
            expect(isFalsy(0, [null, undefined, ''])).toBeTruthy();
            expect(isFalsy(null, [0, undefined, ''])).toBeTruthy();
            expect(isFalsy(undefined, [0, null, ''])).toBeTruthy();
            expect(isFalsy("", [0, null, undefined])).toBeTruthy();
        })

        it('evaluates correctly with overrides', () => {
            expect(isFalsy(0, [0])).toBeFalsy();
            expect(isFalsy(null, [null])).toBeFalsy();
            expect(isFalsy(undefined, [undefined])).toBeFalsy();
            expect(isFalsy("", [''])).toBeFalsy();
        })
    })

    describe('isTruthy', () => {
        it('evaluates correctly on truthy values', () => {
            expect(isTruthy('hello')).toBeTruthy();
            expect(isTruthy(1)).toBeTruthy();
            expect(isTruthy({})).toBeTruthy();
            expect(isTruthy([])).toBeTruthy();
        })

        it('allows overriding falsy values', () => {
            expect(isTruthy(0, [0])).toBeTruthy();
            expect(isTruthy(null, [null])).toBeTruthy();
            expect(isTruthy(undefined, [undefined])).toBeTruthy();
            expect(isTruthy("", [''])).toBeTruthy();
        })

        it('evaluates non-overidden falsy values', () => {
            expect(isTruthy(0)).toBeFalsy();
            expect(isTruthy(null)).toBeFalsy();
            expect(isTruthy(undefined)).toBeFalsy();
            expect(isTruthy("")).toBeFalsy();
        })
    })
})