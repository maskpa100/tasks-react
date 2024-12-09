import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import {
  fetchProducts,
  removeProduct,
  toggleLike,
} from "../../store/slice/ProductsSlice";
import PageProducts from "./PageProducts";

function ContainerPageProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);

  const { products, loading, error, showLikedOnly, search } = useSelector(
    (state: RootState) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredProducts = products
    .filter((product) => !showLikedOnly || product.like)
    .filter((product) =>
      product.name.toLowerCase().includes(search?.toLowerCase() || "")
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (isFirstLoad.current && products.length === 0) {
      dispatch(fetchProducts());
      isFirstLoad.current = false;
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleToggleLike = (id: number) => {
    dispatch(toggleLike(id));
  };
  const handleRemoveProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (option: number) => {
    setItemsPerPage(option);
    setCurrentPage(1);
  };

  return (
    <PageProducts
      itemsPerPage={itemsPerPage}
      handleItemsPerPageChange={handleItemsPerPageChange}
      currentProducts={currentProducts}
      handleRemoveProduct={handleRemoveProduct}
      handleToggleLike={handleToggleLike}
      currentPage={currentPage}
      filteredProducts={filteredProducts}
      handlePageChange={handlePageChange}
    />
  );
}

export default ContainerPageProduct;
