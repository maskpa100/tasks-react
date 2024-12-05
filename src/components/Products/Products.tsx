import s from "./Products.module.scss";
function Products() {
  return (
    <>
      <h1>Products</h1>
      <div className={s.container}>
        <div className={s.product}>
          <img src="" alt="Product" />
        </div>
      </div>
    </>
  );
}

export default Products;
