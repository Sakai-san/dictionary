// @flow
import {
  FETCHING_DICTIONARIES,
  FETCH_DICTIONARIES,
  UPDATE_DICTIONARY
} from "../actions/dictionaries";

type DictionariesState = {
  [dictionaryName: string]: Object & {
    name: string,
    id: number,
    terms: Array<Array<string>>
  },
  isFetching?: boolean
};

export default (state: DictionariesState = {}, action: Object): Object => {
  if (action.type === FETCHING_DICTIONARIES) {
    return { ...state, isFetching: true };
  } else if (action.type === UPDATE_DICTIONARY) {
    return {
      ...state,
      [action.payload.dictionaryName]: {
        ...state[action.payload.dictionaryName],
        terms: action.payload.terms
      }
    };
  } else if (action.type === FETCH_DICTIONARIES) {
    return action.dictionaries;
  } else {
    return state;
  }
};
