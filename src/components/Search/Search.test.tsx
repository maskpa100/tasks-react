import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Search from "./Search";
import { setSearch } from "../../store/slice/ProductsSlice";

const mockStore = configureStore([]);

describe("Search Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      products: {
        searchQuery: "",
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders the Search component", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(screen.getByText("Поиск")).toBeInTheDocument();
    expect(screen.getByLabelText("Поиск по названиям:")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("dispatches setSearch when input value changes", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Тест" } });

    expect(store.dispatch).toHaveBeenCalledWith(setSearch("Тест"));
  });
});
