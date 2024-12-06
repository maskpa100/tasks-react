import { useDispatch, useSelector } from "react-redux";
import s from "./Filter.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { setShowLikedOnly } from "../../store/slice/ProductsSlice";
function Filter() {
  const dispatch = useDispatch<AppDispatch>();
  const { showLikedOnly } = useSelector((state: RootState) => state.products);

  const toggleFilter = () => {
    dispatch(setShowLikedOnly(!showLikedOnly));
  };
  return (
    <div className={s.filter}>
      <div className={s.like} onClick={toggleFilter}>
        {showLikedOnly ? "Показать все" : "Показать избранное"}
      </div>
      <h3>Фильтр</h3>
    </div>
  );
}

export default Filter;
