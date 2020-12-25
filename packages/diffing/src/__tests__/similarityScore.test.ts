import { calculateSimilarityScore } from '../similarityScore';

describe('similarity scores', () => {
    it('calculates a 100% match for the same word', () => {
        const { score } = calculateSimilarityScore("abc", "abc")
        expect(score).toEqual(100);
    })

    it ('calculates a 0% chance for completely different words', () => {
        const { score } = calculateSimilarityScore('abc', 'def')
        expect(score).toEqual(0);
    })

    it('calculates an appropriate match for similar words', () => {
        const { score } = calculateSimilarityScore('abcd', 'abdd');
        expect(score).toEqual(75)
    })
})