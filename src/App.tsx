import Header from "./components/Header/Header";
import PageCreateProduct from "./components/PageCreateProduct/PageCreateProduct";
import PageEditProduct from "./components/PageEditProduct/PageEditProduct";
import PageProduct from "./components/PageProduct/PageProduct";
import PageProducts from "./components/PageProducts/PageProducts";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<PageProducts />} />
        <Route path="/product/:id" element={<PageProduct />} />
        <Route path="/create-product" element={<PageCreateProduct />} />
        <Route path="/edit-product/:id" element={<PageEditProduct />} />
      </Routes>
    </>
  );
}

export default App;
