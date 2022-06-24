import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// export const selectCategories = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => categoriesSlice.categories
// );

export const selectCategoriesMap = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) =>
    categoriesSlice.categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
