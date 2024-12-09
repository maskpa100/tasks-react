import { IoMdCloseCircleOutline } from "react-icons/io";
import Filter from "../../components/Filter/Filter";
import ItemsPerPageSelector from "../../components/ItemsPerPageSelector/ItemsPerPageSelector";
import s from "./PageProducts.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Product } from "../../store/slice/ProductsSlice";

type Props = {
  itemsPerPage: number;
  handleItemsPerPageChange: (option: number) => void;
  currentProducts: Product[];
  handleRemoveProduct: (id: number) => void;
  handleToggleLike: (id: number) => void;
  currentPage: number;
  filteredProducts: Product[];
  handlePageChange: (page: number) => void;
};

function PageProducts({
  itemsPerPage,
  handleItemsPerPageChange,
  currentProducts,
  handleRemoveProduct,
  handleToggleLike,
  currentPage,
  filteredProducts,
  handlePageChange,
}: Props) {
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
