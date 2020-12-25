import { LevenshteinDiffType, SUBSTITUTION, DELETION, ADDITION, NO_CHANGE } from './_types';
import { getMatrixValue } from './helpers';

const points = [[0, -1], [-1, 0], [-1, -1]];
const types: LevenshteinDiffType[] = [ DELETION, ADDITION, SUBSTITUTION ];

export const findDifferences = (matrix: number[][], startPoint: number[]): LevenshteinDiffType[] => {
    const out: LevenshteinDiffType[] = [];
    let [a, b] = startPoint;

    // loop until we hit the top left corner
    while (a >= 0 || b >= 0) {

        const curValue = getMatrixValue([a, b], matrix);

        // initialize some vars that will get updated through the
        // loop
        let min = -1;
        let minType: LevenshteinDiffType = curValue === 0 ? NO_CHANGE : SUBSTITUTION;
        let minPoint = [-1, -1];

        const typeCounts: Partial<Record<LevenshteinDiffType, number>> = {};

        // find the min point and type
        for (let pIdx = 0; pIdx < points.length; pIdx += 1) {
            const [pA, pB] = points[pIdx];

            const val = getMatrixValue([a + pA, b + pB], matrix);
            if (val === null) { continue; }

            if (min === -1 || val < min) {
                min = val;
                minType = types[pIdx];
                minPoint = [pA, pB];
            } 
            
            // update how many times we've seen this particular type
            // this become relevant when we need to break a tie
            typeCounts[types[pIdx]] = val;

        }

        // if there is an option where there was no difference
        // then swap to the diagonal approach if available
        if (min === curValue && min === typeCounts[SUBSTITUTION]) {
            minType = 'ø';
            minPoint = [-1, -1];
        }

        // update the point
        a += minPoint[0];
        b += minPoint[1]

        // update the out array
        out.push(minType);
    }


    return out.reverse();
}


