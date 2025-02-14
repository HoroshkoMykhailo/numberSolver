import { readFileSync } from 'fs';
import path from 'path';

export class FileHandler {
    public static readNumbersFromFile(filePath: string): string[] {
        try {
            const fullPath = path.resolve(filePath);
            const content = readFileSync(fullPath, "utf-8");
            const numbers = content
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0);

            const invalidLines = numbers.filter((line) => !/^\d+$/.test(line));
            if (invalidLines.length > 0) {
              throw new Error(
                `Invalid number(s) found: ${invalidLines.join(", ")}`
              );
            }
            
            return numbers;
        } catch (error) {
            console.error('Error reading file:', error);
            throw new Error('Failed to read numbers from file');
        }
    }
}