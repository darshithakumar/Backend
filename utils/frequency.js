// utils/frequency.js

/**
 * Count frequencies of keywords in an array
 * @param {string[]} arr - Array of keyword strings
 * @returns {Object} - Map of keyword -> frequency count
 */
function countKeywordFrequencies(arr) {
  return arr.reduce((freqMap, keyword) => {
    const key = keyword.toLowerCase();
    freqMap[key] = (freqMap[key] || 0) + 1;
    return freqMap;
  }, {});
}

module.exports = {
  countKeywordFrequencies
}

// Example usage
// const keywords = ['python', 'javascript', 'Python', 'React', 'javascript'];
// console.log(countKeywordFrequencies(keywords));
// Output: { python: 2, javascript: 2, react: 1 }
