import React from "react";
import s from "./ItemsPerPageSelector.module.scss";

interface ItemsPerPageSelectorProps {
  options: number[];
  currentOption: number;
  onOptionChange: (option: number) => void;
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
  options,
  currentOption,
  onOptionChange,
}) => {
  return (
    <div className={s.itemsPerPageSelector}>
      <label htmlFor="itemsPerPage">Товаров на странице:</label>
      <select
        id="itemsPerPage"
        value={currentOption}
        onChange={(e) => onOptionChange(Number(e.target.value))}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
