import { useDispatch } from "react-redux";
import s from "./Search.module.scss";
import { setSearch } from "../../store/slice/ProductsSlice";
function Search() {
  const dispatch = useDispatch();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };
  return (
    <div className={s.search}>
      <h3>Поиск</h3>
      <label htmlFor="search">Поиск по названиям:</label>
      <input id="search" type="text" onChange={handleSearchChange} />
    </div>
  );
}

export default Search;
