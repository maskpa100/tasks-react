import React from "react";
import s from "./Pagination.module.scss";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={s.pagination}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`${s.pageButton} ${
              currentPage === page ? s.active : ""
            }`}
            onClick={() => onPageChange(page)}>
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
