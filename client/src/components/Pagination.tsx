import React, { useMemo } from 'react';
import Wrapper from '../assets/wrappers/Pagination';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
} from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  curPage: number;
  disabled: boolean;
  setCurPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  curPage,
  totalPages,
  setCurPage,
  disabled,
}) => {
  const pages = useMemo<number[]>(
    () => getSurroundingPages(totalPages, curPage),
    [curPage, totalPages]
  );
  return (
    <Wrapper>
      {curPage > 2 && (
        <button onClick={() => setCurPage(1)} disabled={disabled}>
          <FaAngleDoubleLeft />
        </button>
      )}
      {curPage > 1 && (
        <button onClick={() => setCurPage(curPage - 1)} disabled={disabled}>
          <FaAngleLeft />
        </button>
      )}
      {pages.map((page) => {
        return (
          <button
            key={page}
            className={curPage === page ? 'activate' : ''}
            onClick={() => setCurPage(page)}
            disabled={disabled}
          >
            {page}
          </button>
        );
      })}
      {curPage < totalPages && (
        <button disabled={disabled}>
          <FaAngleRight onClick={() => setCurPage(curPage + 1)} />
        </button>
      )}
      {curPage < totalPages - 1 && (
        <button disabled={disabled}>
          <FaAngleDoubleRight onClick={() => setCurPage(totalPages)} />
        </button>
      )}
    </Wrapper>
  );
};

export default Pagination;

const getSurroundingPages = (totalPages: number, page: number) => {
  if (page < 1 || page > totalPages) {
    return [];
  }

  const leftPage = Math.max(1, page - 2);
  const rightPage = Math.min(totalPages, page + 2);

  const surroundingPages: number[] = [];
  for (let i = leftPage; i <= rightPage; ++i) {
    surroundingPages.push(i);
  }
  return surroundingPages;
};
