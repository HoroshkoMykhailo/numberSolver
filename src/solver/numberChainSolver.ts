import { NumberPair, ChainResult } from '../types';

export class NumberChainSolver {
    private numbers: string[];
    private prefixMap: Map<string, NumberPair[]>;
    private suffixMap: Map<string, NumberPair[]>;
    private memo: Map<number, ChainResult>;

    constructor(numbers: string[]) {
        this.numbers = numbers;
        this.prefixMap = new Map();
        this.suffixMap = new Map();
        this.memo = new Map();
        this._buildMaps();
    }

    private _buildMaps(): void {
        this.numbers.forEach((num, index) => {
            const prefix = num.slice(0, 2);
            const suffix = num.slice(-2);
            
            if (!this.prefixMap.has(prefix)) {
                this.prefixMap.set(prefix, []);
            }
            if (!this.suffixMap.has(suffix)) {
                this.suffixMap.set(suffix, []);
            }
            
            this.prefixMap.get(prefix)?.push([index, num]);
            this.suffixMap.get(suffix)?.push([index, num]);
        });
    }

    public findLongestChain(): ChainResult {
        let maxLength = 0;
        let bestChain: string[] = [];

        for (let i = 0; i < this.numbers.length; i++) {
            const result = this._dfs(i, new Set<number>());
            if (result.length > maxLength) {
                maxLength = result.length;
                bestChain = result.chain;
            }
        }
        return { chain: bestChain, length: maxLength };
    }

    private _dfs(index: number, used: Set<number>): ChainResult {
        if (this.memo.has(index)) return this.memo.get(index)!;
        
        used.add(index);
        const currentNum = this.numbers[index];
        const suffix = currentNum.slice(-2);
        let maxLength = 1;
        let bestChain = [currentNum];

        for (const [nextIdx, _nextNum] of this.prefixMap.get(suffix) || []) {
            if (!used.has(nextIdx)) {
                const result = this._dfs(nextIdx, new Set(used));
                if (result.length + 1 > maxLength) {
                    maxLength = result.length + 1;
                    bestChain = [currentNum, ...result.chain];
                }
            }
        }

        const result: ChainResult = { chain: bestChain, length: maxLength };
        this.memo.set(index, result);
        return result;
    }

    public formatChain(chain: string[]): string {
        if (chain.length === 0) return "";

        let result = chain[0];
        for (let i = 1; i < chain.length; i++) {
            result += chain[i].slice(2);
        }

        return result;
    }
}