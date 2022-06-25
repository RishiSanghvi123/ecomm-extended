import { CATEGORIES_ACTION_TYPE } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error));
    }
  };
};
