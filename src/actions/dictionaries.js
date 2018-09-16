// @flow
import dictionaries from "../dictionaries.json";

export const FETCHING_DICTIONARIES: string = "dictionaries/fetching";
export const FETCH_DICTIONARIES: string = "dictionaries/fetch";
export const UPDATE_DICTIONARY: string = "dictionaries/update";

export const fetchDictionaries: Function = (): Function => {
  return (dispatch: Function): void => {
    dispatch({
      type: FETCHING_DICTIONARIES
    });

    Promise.resolve(dictionaries).then(
      (dictionaries): Promise<any> => {
        dispatch({
          type: FETCH_DICTIONARIES,
          dictionaries
        });
        return dictionaries;
      }
    );
  };
};

export const updateDictionary: Function = (
  dictionaryName: string,
  terms: Array<Array<string>>
): Object => ({
  type: UPDATE_DICTIONARY,
  payload: {
    dictionaryName,
    terms
  }
});
