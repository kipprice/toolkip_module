import { levenshteinDistance } from './levenshteinDistance';
import { genDiffArrayOfLength } from './helpers';
import { NO_CHANGE, SimilarityScore } from './_types';

/**
 * calculateSimilarityScore
 * ----------------------------------------------------------------------------
 * calculates how similar two strings as a percentage out of 100, via the 
 * Levenstein distance algorithm
 * 
 * @param   strA        The first string to compare
 * @param   strB        The second string to compare
 * @param   maxString   Point at which strings should get cut into words instead
 *                      of letters; defaults to 50
 * @returns A SimilarityScore object
 */
export const calculateSimilarityScore = (strA: string, strB: string, maxString: number = 50): SimilarityScore => {

    if (strA === strB) { 
        return {
            score: 100,
            distance: 0,
            differences: genDiffArrayOfLength(NO_CHANGE, strA.length),
            splitBy: ''
        }
    }

    const splitBy = (strA.length > maxString || strB.length > maxString) ? /(?=\W)/ : '';

    const splitA = strA.split(splitBy);
    const splitB = strB.split(splitBy);

    const { distance, differences } = levenshteinDistance( splitA, splitB );
    
    return {
        score: Math.floor(100 - 100 * (( distance * 2 ) / (splitA.length + splitB.length))),
        distance,
        splitBy,
        differences
    }
}
