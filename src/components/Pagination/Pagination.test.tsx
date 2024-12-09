import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChange = jest.fn();

  it("renders pagination buttons correctly", () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(5);

    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it("highlights the current page button", () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons[2]).toHaveClass("active");
  });

  it("calls onPageChange when a page button is clicked", () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
