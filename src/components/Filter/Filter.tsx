import s from "./Filter.module.scss";
function Filter() {
  return (
    <div className={s.filter}>
      <button className={s.like}>Показать избранное</button>
      <h3>Фильтр</h3>
    </div>
  );
}

export default Filter;
