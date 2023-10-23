import React, { useState, useEffect } from 'react';
import {
  PaginationContainer,
  PaginationUl,
  PaginationLi,
  StyledLink,
  NextPage,
  PreviousPage,
} from '../styles/PaginationStyles';
import { PAGES_TO_SHOW } from '../utils/constants.es6';

const Pagination = ({ currentPage, numPages, basePath, filter }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(numPages);
    const startPage = Math.max(currentPage - Math.floor(PAGES_TO_SHOW / 2), 1);
    const endPage = Math.min(startPage + PAGES_TO_SHOW - 1, totalPages);

    const numbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setPageNumbers(numbers);
  }, [currentPage, numPages]);

  const generatePrevPage = () => {
    if (currentPage === 1) return null;
    return (
      <PreviousPage to={`${basePath}/${filter}/page=${currentPage - 1}`} rel="prev">
        Previous
      </PreviousPage>
    );
  };

  const generateNextPage = () => {
    if (currentPage === numPages) return null;
    return <NextPage to={`${basePath}/${filter}/page=${currentPage + 1}`}>Next</NextPage>;
  };

  return (
    <PaginationContainer>
      {currentPage !== 1 && generatePrevPage()}
      <PaginationUl>
        {pageNumbers.map((pageNumber) => (
          <PaginationLi key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
            <StyledLink to={`${basePath}/${filter}/page=${pageNumber}`}>{pageNumber}</StyledLink>
          </PaginationLi>
        ))}
      </PaginationUl>
      {generateNextPage()}
    </PaginationContainer>
  );
};

export default Pagination;
