/**
 * Utility functions for CSV operations in Playwright API tests
 * 
 * This module provides reusable CSV handling functions following
 * Playwright best practices for test utilities and helpers.
 */

import * as fs from 'fs/promises';

/**
 * Reads a CSV file from the specified path and parses its contents into an array of objects.
 * Each object represents a row in the CSV, with keys corresponding to the header columns.
 *
 * @param csvPath - The path to the CSV file to read.
 * @returns A promise that resolves to an array of records, where each record is an object mapping column names to cell values.
 *
 * @example
 * // Given a CSV file with content:
 * // name,age
 * // Alice,30
 * // Bob,25
 * const rows = await readCsvSimple('path/to/file.csv');
 * // rows = [
 * //   { name: 'Alice', age: '30' },
 * //   { name: 'Bob', age: '25' }
 * // ]
 */
export async function readCsvSimple(csvPath: string): Promise<Record<string, string>[]> {
  const raw = await fs.readFile(csvPath, 'utf-8');
  const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
  const header = lines[0].split(',').map(h => h.trim());

  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',').map(c => c.trim());
    const row: Record<string, string> = {};
    header.forEach((h, idx) => (row[h] = cells[idx]));
    rows.push(row);
  }
  return rows;
}

/**
 * Checks if a file exists at the given path.
 *
 * @param p - The path to the file to check. Should be a string representing the file system location.
 * @returns A promise that resolves to `true` if the file exists, or `false` if it does not.
 *
 * @remarks
 * - Uses `fs.access` to check for file existence.
 * - Does not throw if the file is missing; returns `false` instead.
 * - Input: string path to the file.
 * - Output: Promise<boolean> indicating existence.
 */
export async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensures that the specified directory exists. If the directory structure does not exist, it is created recursively.
 *
 * @param dirPath - The path of the directory to ensure exists.
 * @returns A promise that resolves when the directory has been created or already exists.
 */
export async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * Appends a row to a CSV file, creating the file and writing headers if it does not exist.
 *
 * @param filePath - The path to the CSV file.
 * @param headers - An array of header strings to write if the file is created.
 * @param values - An array of values for the row; `undefined` values are converted to empty strings.
 * @remarks
 * - Values are converted to strings and joined by commas.
 * - If the file does not exist, headers are written as the first line.
 * - Commas inside values are not escaped; ensure values do not contain commas for correct parsing.
 * - The function appends the row to the file using UTF-8 encoding.
 */
export async function appendCsvRow(filePath: string, headers: string[], values: (string | number | boolean | undefined)[]) {
  const exists = await fileExists(filePath);
  let content = '';

  if (!exists) {
    content += headers.join(',') + '\n';
  }
  
  // Convert undefined to empty string, and ensure no commas inside values (per our simple parser)
  const row = values.map(v => (v === undefined ? '' : String(v))).join(',');
  content += row + '\n';

  await fs.appendFile(filePath, content, { encoding: 'utf-8' });
}