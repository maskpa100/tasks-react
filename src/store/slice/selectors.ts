import { RootState } from "../store";

export const selectProductById = (state: RootState, productId: number) => {
  return state.products.products.find((product) => product.id === productId);
};
