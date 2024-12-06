import s from "./Products.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchProducts } from "../../store/slice/ProductsSlice";
function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, showLikedOnly } = useSelector(
    (state: RootState) => state.products
  );

  // Отфильтровать продукты, если фильтр активен
  const filteredProducts = showLikedOnly
    ? products.filter((item) => item.like)
    : products;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={s.products}>
      <Filter />
      <div className={s.container}>
        {filteredProducts.map((item) => (
          <div className={s.product} key={item.id}>
            <div className={s.icons}>
              <IoMdCloseCircleOutline className={s.close} />
              {item.like ? (
                <FaHeart className={s.like} />
              ) : (
                <FaRegHeart className={s.like} />
              )}
            </div>
            <Link to={`/product/${item.id}`} className={s.link}>
              <img src={item.img} alt="Product" />
            </Link>
            <div className={s.name}>{item.name}</div>
            <div className={s.price}>{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
