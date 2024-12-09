import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Filter from "./Filter";
import { setShowLikedOnly } from "../../store/slice/ProductsSlice";

const mockStore = configureStore([]);

describe("Filter Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      products: {
        showLikedOnly: false,
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders the Filter component with initial state", () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    expect(screen.getByText("Показать избранное")).toBeInTheDocument();
  });

  it("toggles the filter when clicked", () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    const toggleButton = screen.getByText("Показать избранное");
    fireEvent.click(toggleButton);
    expect(store.dispatch).toHaveBeenCalledWith(setShowLikedOnly(true));
  });

  it("renders 'Показать все' when showLikedOnly is true", () => {
    store = mockStore({
      products: {
        showLikedOnly: true,
      },
    });

    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    expect(screen.getByText("Показать все")).toBeInTheDocument();
  });
});
