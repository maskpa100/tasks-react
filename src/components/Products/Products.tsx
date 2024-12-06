import s from "./Products.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { products } from "./data";
import Filter from "../Filter/Filter";
function Products() {
  return (
    <div className={s.products}>
      <Filter />
      <div className={s.container}>
        {products.map((item) => (
          <div className={s.product} key={item.id}>
            <div className={s.icons}>
              <IoMdCloseCircleOutline className={s.close} />
              {item.like ? (
                <FaHeart className={s.like} />
              ) : (
                <FaRegHeart className={s.like} />
              )}
            </div>
            <div className={s.img}>
              <img src={item.img} alt="Product" />
            </div>
            <div className={s.name}>Ноутбук E10 ETBook</div>
            <div className={s.price}>580 руб</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
