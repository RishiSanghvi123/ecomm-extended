//import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/cateogry-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

//import Spinner from "../../components/spinner/spinner.components";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  //const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
