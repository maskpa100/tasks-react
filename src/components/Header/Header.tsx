import s from "./Header.module.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Header() {
  return (
    <div className={s.header}>
      <Link className={s.logo} to="/tasks-react/products">
        Магазин товаров
      </Link>
      <Link className={s.button} to="/tasks-react/create-product">
        Создать товар
      </Link>
    </div>
  );
}

export default Header;
