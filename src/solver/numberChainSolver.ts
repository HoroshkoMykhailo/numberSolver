import { NumberPair, ChainResult } from '../types';

export class NumberChainSolver {
    private numbers: string[];
    private prefixMap: Map<string, NumberPair[]>;
    private suffixMap: Map<string, NumberPair[]>;

    constructor(numbers: string[]) {
        this.numbers = numbers;
        this.prefixMap = new Map();
        this.suffixMap = new Map();
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

        this.numbers.forEach((startNum, startIdx) => {
            const used = new Set<number>([startIdx]);
            const chain: string[] = [startNum];
            let current = startNum;

            while (true) {
                const suffix = current.slice(-2);
                let foundNext = false;

                const possibleNextNumbers = this.prefixMap.get(suffix) || [];
                for (const [nextIdx, nextNum] of possibleNextNumbers) {
                    if (!used.has(nextIdx)) {
                        used.add(nextIdx);
                        chain.push(nextNum);
                        current = nextNum;
                        foundNext = true;
                        break;
                    }
                }

                if (!foundNext) break;
            }

            if (chain.length > maxLength) {
                maxLength = chain.length;
                bestChain = [...chain];
            }
        });

        return { chain: bestChain, length: maxLength };
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