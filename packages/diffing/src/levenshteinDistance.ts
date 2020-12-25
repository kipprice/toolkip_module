import { LevenshteinDiff, LevenshteinDiffType, ADDITION, DELETION } from './_types';
import { findDifferences } from './findDifferences';
import { genDiffArrayOfLength, calculateLetterDiff, calculateMinPastDiff } from './helpers';


/**
 * levenshtein distance
 * ----------------------------------------------------------------------------
 * generic levenshtein distance function that takes into accounts things that 
 * are similar but not exactly the same for purposes of trying to render those
 * differences to the user
 * 
 * @param   strA            A string array of elements to compare; can be tokenized at 
 *                           the letter or at word boundaries
 * 
 * @param   strB            A string array of elements to compare to strA; can be 
 *                          tokenized at the letter or at word boundaries
 * 
 * @param   skipDifferences If true, doesn't return the difference array
 * 
 * @returns An object containing 
 */
export const levenshteinDistance = (strA: string[], strB: string[], skipDifferences?: boolean): LevenshteinDiff => {
    
    // handle a variety of null and empty cases
    const baseCase = checkForBaseCase(strA, strB);
    if (baseCase) { return baseCase; }

    const matrix: number[][] = [];

    for (let aIdx = 0; aIdx < strA.length; aIdx += 1) {

        // initialize the sub array
        matrix[aIdx] = [];

        for (let bIdx = 0; bIdx < strB.length; bIdx += 1) {

            const myDiff = calculateLetterDiff(strA[aIdx], strB[bIdx]);
            const minPastDiff = calculateMinPastDiff(aIdx, bIdx, matrix);

            matrix[aIdx][bIdx] = (myDiff + minPastDiff);
        }
    }

    const distance =  matrix[strA.length - 1][strB.length - 1];
    if (skipDifferences) { return noDiffResult(distance); }
    
    // generate the differences by traversing the matrix backwards
    const differences = findDifferences(matrix, [strA.length - 1, strB.length - 1]); 

    return {
        distance,
        differences
    }
}

const checkForBaseCase = (strA: string[], strB: string[]): LevenshteinDiff => {

    // ==> null cases
    if (!strA && !strB) { return noDiffResult(); }
    if (!strA || strA.length === 0) { return singleStringResult(strB, ADDITION); }
    if (!strB || strB.length === 0) { return singleStringResult(strA, DELETION); }

    // all other cases can run the algorithm
    return null;
}

const noDiffResult = (distance: number = 0) => {
    return {
        distance,
        differences: []
    }
}

const singleStringResult = (str: string[], diffType: LevenshteinDiffType): LevenshteinDiff => {
    return {
        distance: str.length,
        differences: genDiffArrayOfLength(diffType, str.length)
    }
}