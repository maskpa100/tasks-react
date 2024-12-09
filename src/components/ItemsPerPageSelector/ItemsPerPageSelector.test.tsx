import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemsPerPageSelector from "./ItemsPerPageSelector";

describe("ItemsPerPageSelector Component", () => {
  let onOptionChange: jest.Mock;

  beforeEach(() => {
    onOptionChange = jest.fn();
  });

  it("renders the ItemsPerPageSelector component with options", () => {
    const options = [10, 20, 30];
    const currentOption = 10;

    render(
      <ItemsPerPageSelector
        options={options}
        currentOption={currentOption}
        onOptionChange={onOptionChange}
      />
    );

    expect(screen.getByLabelText("Товаров на странице:")).toBeInTheDocument();
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue(currentOption.toString());

    // Проверка всех опций
    options.forEach((option) => {
      expect(
        screen.getByRole("option", { name: option.toString() })
      ).toBeInTheDocument();
    });
  });

  it("calls onOptionChange when a new option is selected", () => {
    const options = [10, 20, 30];
    const currentOption = 10;

    render(
      <ItemsPerPageSelector
        options={options}
        currentOption={currentOption}
        onOptionChange={onOptionChange}
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "20" } });

    expect(onOptionChange).toHaveBeenCalledWith(20);
  });

  it("renders the correct selected option", () => {
    const options = [10, 20, 30];
    const currentOption = 20;

    render(
      <ItemsPerPageSelector
        options={options}
        currentOption={currentOption}
        onOptionChange={onOptionChange}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue(currentOption.toString());
  });
});
