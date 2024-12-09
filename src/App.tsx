import Header from "./components/Header/Header";
import PageCreateProduct from "./pages/PageCreateProduct/PageCreateProduct";
import PageEditProduct from "./pages/PageEditProduct/PageEditProduct";
import PageProduct from "./pages/PageProduct/PageProduct";
import ContainerPageProduct from "./pages/PageProducts/ContainerPageProduct";

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
        <Route path="/products" element={<ContainerPageProduct />} />
        <Route path="/product/:id" element={<PageProduct />} />
        <Route path="/create-product" element={<PageCreateProduct />} />
        <Route path="/edit-product/:id" element={<PageEditProduct />} />
      </Routes>
    </>
  );
}

export default App;
