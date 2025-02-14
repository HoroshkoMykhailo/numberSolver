import { FileHandler } from './utils/fileHandler';
import { solvePuzzle } from './puzzle/puzzleSolver';

function main() {
    try {
        const numbersFromFile = FileHandler.readNumbersFromFile('./static/numbers.txt');
        const fileResult = solvePuzzle(numbersFromFile);
        console.log('Result from file:');
        console.log('The chain is:', fileResult.chain);
        console.log('The length of the chain is:', fileResult.length, 'numbers');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();