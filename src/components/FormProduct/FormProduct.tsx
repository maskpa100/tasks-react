import s from "./FormProduct.module.scss";

function FormProduct() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      name: String(formData.get("name")),
      price: String(formData.get("price")),
      weight: Number(formData.get("weight")),
      country_manufacture: Number(formData.get("country_manufacture")),
      time: Number(formData.get("time")),
      descriptions: String(formData.get("descriptions")),
    };
    console.log(data);
  };
  return (
    <form className={s.formProduct} onSubmit={handleSubmit}>
      <div className={s.block}>
        <label htmlFor="name">Названия товара</label>
        <input id="name" type="text" name="name" defaultValue="" required />
      </div>
      <div className={s.block}>
        <label htmlFor="price">Цена</label>
        <input id="price" type="number" name="price" defaultValue="" required />
      </div>
      <div className={s.block}>
        <label htmlFor="weight">Вес</label>
        <input
          id="weight"
          type="number"
          name="weight"
          defaultValue=""
          required
        />
      </div>
      <div className={s.block}>
        <label htmlFor="country_manufacture">Страна производитель</label>
        <input
          id="country_manufacture"
          type="text"
          name="country_manufacture"
          defaultValue=""
          required
        />
      </div>
      <div className={s.block}>
        <label htmlFor="time">Время добавления</label>
        <input id="time" type="text" name="time" defaultValue="" required />
      </div>
      <div className={s.block}>
        <label htmlFor="descriptions">Описания</label>
        <textarea
          id="descriptions"
          rows={4}
          name="descriptions"
          defaultValue=""
          required
        />
      </div>
      <button className={s.button} type="submit">
        Добавить товар
      </button>
    </form>
  );
}

export default FormProduct;
