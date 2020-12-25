import { levenshteinDistance } from '../levenshteinDistance';

describe('levenshtein distance', () => {
    it('calculates the correct distance', () => {
        const { distance } = levenshteinDistance([..."capes"], [..."caps"]);
        expect(distance).toEqual(1);
    })

    it('calculates zero distance', () => {
        const { distance } = levenshteinDistance([..."abcde"], [..."abcde"]);
        expect(distance).toEqual(0);
    })

    it('calculates full distance', () => {
        const { distance } = levenshteinDistance([..."abc"], [..."def"]);
        expect(distance).toEqual(3);
    })

    it('traces a path to transform one string to another', () => {
        const { differences } = levenshteinDistance([..."onion"], [..."onus"])
        expect(differences.join("")).toEqual("øøssa")
    })
})