import css from "./Pagination.module.css";
import type { ComponentType } from "react";
import ReactPaginatedModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };

const PaginatedModule = ReactPaginatedModule as unknown as ModuleWithDefault<
  ComponentType<ReactPaginateProps>
>;

const ReactPagination = PaginatedModule.default;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

const Pagination = ({
  totalPages,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  return (
    <ReactPagination
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};
export default Pagination;
