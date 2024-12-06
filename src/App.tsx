import CreateProduct from "./components/CreateProduct/CreateProduct";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
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
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
