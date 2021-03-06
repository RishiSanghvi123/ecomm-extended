import { Routes, Route } from "react-router-dom";
import "./shop.styles.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
//import { setCategories } from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesAsync } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
