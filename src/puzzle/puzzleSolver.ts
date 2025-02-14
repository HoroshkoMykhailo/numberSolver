import { PuzzleResult } from '../types';
import { NumberChainSolver } from '../solver/numberChainSolver';

export function solvePuzzle(numbers: string[]): PuzzleResult {
    const solver = new NumberChainSolver(numbers);
    const { chain, length } = solver.findLongestChain();
    return {
        chain: solver.formatChain(chain),
        length
    };
}