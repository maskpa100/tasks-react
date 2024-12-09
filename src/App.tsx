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
        <Route
          path="/tasks-react/"
          element={<Navigate to="/products" replace />}
        />
        <Route
          path="/tasks-react/products"
          element={<ContainerPageProduct />}
        />
        <Route path="/tasks-react/product/:id" element={<PageProduct />} />
        <Route
          path="/tasks-react/create-product"
          element={<PageCreateProduct />}
        />
        <Route
          path="/tasks-react/edit-product/:id"
          element={<PageEditProduct />}
        />
      </Routes>
    </>
  );
}

export default App;
