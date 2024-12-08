import React, { useEffect, useRef, useState } from "react";
import s from "./PageProducts.module.scss";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchProducts,
  removeProduct,
  toggleLike,
} from "../../store/slice/ProductsSlice";

import ItemsPerPageSelector from "../ItemsPerPageSelector/ItemsPerPageSelector";
import Pagination from "../Pagination/Pagination";

function PageProducts() {
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
    <div className={s.products}>
      <Filter />
      <div className={s.container}>
        <ItemsPerPageSelector
          options={[2, 4, 6, 8, 10]}
          currentOption={itemsPerPage}
          onOptionChange={handleItemsPerPageChange}
        />
        {currentProducts.map((item) => (
          <div className={s.product} key={item.id}>
            <div className={s.icons}>
              <IoMdCloseCircleOutline
                className={s.close}
                onClick={() => handleRemoveProduct(item.id)}
              />
              {item.like ? (
                <FaHeart
                  className={s.like}
                  onClick={() => handleToggleLike(item.id)}
                />
              ) : (
                <FaRegHeart
                  className={s.like}
                  onClick={() => handleToggleLike(item.id)}
                />
              )}
            </div>
            <Link to={`/product/${item.id}`} className={s.link}>
              <img src={item.img} alt="Product" />
              <div className={s.name}>{item.name}</div>
              <div className={s.price}>{item.price} руб</div>
            </Link>
          </div>
        ))}
        <Pagination
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PageProducts;
