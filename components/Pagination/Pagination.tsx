// import type { ComponentType } from 'react';
import css from './Pagination.module.css';
// import  ReactPaginateModule, { type ReactPaginateProps } from "react-paginate";
 import ReactPaginate from "react-paginate";
interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}
// type ModuleWithDefault<T> = { default: T };

// const ReactPaginate = (
//   ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
// ).default;

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
    pageCount={pageCount}
    pageRangeDisplayed={3}
    marginPagesDisplayed={1}
    forcePage={currentPage - 1}
    onPageChange={(e) => onPageChange(e.selected+1)}
    containerClassName={css.pagination}
    activeClassName={css.active}
    nextLabel=">"
    previousLabel="<"
    breakLabel="..."
  />)
}