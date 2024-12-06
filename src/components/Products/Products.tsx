import s from "./Products.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useRef } from "react";
import {
  fetchProducts,
  removeProduct,
  toggleLike,
} from "../../store/slice/ProductsSlice";
function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const isFirstLoad = useRef(true);

  const { products, loading, error, showLikedOnly } = useSelector(
    (state: RootState) => state.products
  );

  const filteredProducts = showLikedOnly
    ? products.filter((item) => item.like)
    : products;

  useEffect(() => {
    if (isFirstLoad.current) {
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
  return (
    <div className={s.products}>
      <Filter />
      <div className={s.container}>
        {filteredProducts.map((item) => (
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
      </div>
    </div>
  );
}

export default Products;
