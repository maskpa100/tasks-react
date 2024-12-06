import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  like: boolean;
  descriptions: string;
  weight: number;
  country_manufacture: string;
  time: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  showLikedOnly: boolean; // поле для фильтрации
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  showLikedOnly: false, // по умолчанию не фильтруем
};

// Асинхронный экшен для получения продуктов
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:3000/products/receive.json");
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShowLikedOnly: (state, action) => {
      state.showLikedOnly = action.payload;
    },
    toggleLike: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (product) {
        product.like = !product.like;
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});
export const { setShowLikedOnly, toggleLike, removeProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
