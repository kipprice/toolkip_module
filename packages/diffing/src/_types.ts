export const ADDITION = 'a';
export const DELETION = 'd';
export const SUBSTITUTION = 's';
export const NO_CHANGE = 'ø';


export type LevenshteinDiffType = typeof ADDITION | typeof DELETION | typeof SUBSTITUTION | typeof NO_CHANGE;

export type LevenshteinDiff = {

    /* 
        how far apart the provided strings were, 
        as calculated by the algorithm 
    */
    distance: number;

    /* 
        what differences needed to occur to transform 
        string A into string B 
    */
    differences?: LevenshteinDiffType[]
}


export type SimilarityScore = LevenshteinDiff & {

    /* the score out of 100 these two strings received */
    score: number;

    /* what the strings ended up being split by */
    splitBy: string | RegExp;
}