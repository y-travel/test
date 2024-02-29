/**
 * return num % percent
 * @param num number
 * @param percent number could be between 0-1 or 0-100
 */
const getPercent = (num: number, percent: number): number => num - Math.round(num * (percent < 1 ? percent : percent / 100));

export { getPercent };
