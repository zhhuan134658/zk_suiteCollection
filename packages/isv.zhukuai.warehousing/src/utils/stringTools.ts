const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};

const uniqueCharacters = (str: string): string => {
  return str
    .split('')
    .filter((char, index, arr) => arr.indexOf(char) === index)
    .join('');
};

const countEachUniqueCharacter = (str: string): string => {
  const charMap = new Map();
  for (const char of str) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  }
  return JSON.stringify(charMap);
};

export { reverseString, uniqueCharacters, countEachUniqueCharacter };
