import FormProduct from "../FormProduct/FormProduct";
import s from "./CreateProduct.module.scss";
function CreateProduct() {
  return (
    <div className={s.createProduct}>
      <h1>Добавление товара</h1>
      <FormProduct />
    </div>
  );
}

export default CreateProduct;
