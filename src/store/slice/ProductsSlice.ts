import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  like: boolean;
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

// Создание слайса
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShowLikedOnly: (state, action) => {
      state.showLikedOnly = action.payload;
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
export const { setShowLikedOnly } = productsSlice.actions;
export default productsSlice.reducer;
