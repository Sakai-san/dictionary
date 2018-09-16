// @flow

/**
 * has duplication inconsistency
 * @desc    detect duplication and fork inconsistencies
 * @param   {Object}
 * @returns {boolean}
 */
export const hasDuplicationInconsistency = (dictionary: Object): boolean => {
  const withoutInconsistency = new Map(dictionary.terms);
  return dictionary.terms.length !== withoutInconsistency.size;
};

/**
 * has chain inconsistency
 * @desc    detect chain and cycle inconsistencies
 * @param   {Object}
 * @returns {boolean}
 */
export const hasChainInconsistency2 = (dictionary: Object): boolean => {
  const map = new Map(dictionary.terms);
  let hasInconsistency = false;
  map.forEach((val, key) => {
    if (map.get(val) !== undefined) {
      hasInconsistency = true;
      console.log("hasChainInconsistency", val);
      return;
    }
  });
  return hasInconsistency;
};

export const hasChainInconsistency = (dictionary: Object): boolean => {
  const map = new Map(dictionary.terms);
  let hasInconsistency = false;

  for (let [k, v] of map) {
    if (map.get(v) !== undefined) {
      hasInconsistency = true;
      break;
    }
  }
  return hasInconsistency;
};
