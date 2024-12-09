import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import s from "./PageProduct.module.scss";
import { removeProduct } from "../../store/slice/ProductsSlice";

function PageProduct() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <div className={s.notFound}>Продукт не найден</div>;
  }

  const currentIndex = products.findIndex((item) => item.id === productId);
  const prevProduct = products[currentIndex - 1];
  const nextProduct = products[currentIndex + 1];

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProduct(id));

    if (nextProduct) {
      navigate(`/product/${nextProduct.id}`);
    } else if (prevProduct) {
      navigate(`/product/${prevProduct.id}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className={s.productPage}>
      <div className={s.navigation}>
        {prevProduct ? (
          <Link to={`/product/${prevProduct.id}`} className={s.back}>
            Предыдущий товар
          </Link>
        ) : (
          <div className={`${s.back} ${s.disabled}`}>Предыдущий товар</div>
        )}
        <Link to="/" className={s.home}>
          На главную
        </Link>
        {nextProduct ? (
          <Link to={`/product/${nextProduct.id}`} className={s.next}>
            Следующий товар
          </Link>
        ) : (
          <div className={`${s.next} ${s.disabled}`}>Следующий товар</div>
        )}
      </div>
      <div className={s.product}>
        <img src={product.img} alt={product.name} className={s.image} />
        <div className={s.info}>
          <h1>{product.name}</h1>
          <p>
            <b>Цена:</b> {product.price} руб
          </p>
          <p>
            <b>Вес:</b> {product.weight}
          </p>
          <p>
            <b> Страна производитель:</b> {product.country_manufacture}
          </p>
          <p>
            <b>Время добавления:</b> {product.time}
          </p>
          <p>
            <b>Описания:</b> {product.descriptions}
          </p>
          <div className={s.actions}>
            <Link to={`/edit-product/${id}`} className={s.edit}>
              Редактировать
            </Link>
            <div
              className={s.delete}
              onClick={() => handleRemoveProduct(product.id)}>
              Удалить
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageProduct;
