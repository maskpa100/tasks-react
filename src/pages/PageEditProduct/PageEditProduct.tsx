import { useParams } from "react-router-dom";
import FormProduct from "../../components/FormProduct/FormProduct";
import { useSelector } from "react-redux";
import { selectProductById } from "../../store/slice/selectors";

function PageEditProduct() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const product = useSelector((state: any) =>
    selectProductById(state, productId)
  );

  if (!productId || !product) {
    return <div>Ошибка: параметр id не найден или продукт не найден</div>;
  }

  return <FormProduct page="edit" product={product} />;
}

export default PageEditProduct;
