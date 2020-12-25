import { LevenshteinDiffType } from './_types';

export const genDiffArrayOfLength = (diffType: LevenshteinDiffType, length: number) => {
    const out: LevenshteinDiffType[] = [];
    for (let i = 0; i < length; i += 1) {
        out.push(diffType);
    }
    return out;
}

export const calculateLetterDiff = (letterA: string, letterB: string): number => {
    return (letterA === letterB ? 0 : 1);
}

export const calculateMinPastDiff = (x: number, y: number, matrix: number[][]) => {
    const points = [[0, -1], [-1, 0], [-1, -1]];

    const diffs: number[] = [];

    for (let pIdx = 0; pIdx < points.length; pIdx += 1) {

        const [a, b] = points[pIdx];
        const value = getMatrixValue([x + a, y + b], matrix);
        if (value === null) { continue; }

        diffs.push(value);

    }

    if (diffs.length === 0) { diffs.push(0) }

    return Math.min(...diffs);
}

export const getMatrixValue = (point: number[], matrix: number[][]) => {
    const [a, b] = point;
    const row = matrix[a];
    if (!row) { return null; }
            
    const val = row[b];
    if (val === undefined) { return null; }

    return val;
}