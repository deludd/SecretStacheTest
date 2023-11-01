import React, { useState, useEffect } from 'react';
import {
  PaginationContainer,
  PaginationUl,
  PaginationLi,
  StyledLink,
  NextPage,
  PreviousPage,
} from '../styles/PaginationStyles';
import { PAGES_TO_SHOW, BASE_PATH } from '../utils/constants.es6';

const Pagination = ({ currentPage, numPages, filter }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(numPages);
    let startPage;
    let endPage;

    if (currentPage + Math.floor(PAGES_TO_SHOW / 2) >= totalPages) {
      endPage = totalPages;
      startPage = Math.max(totalPages - PAGES_TO_SHOW + 1, 1);
    } else {
      startPage = Math.max(currentPage - Math.floor(PAGES_TO_SHOW / 2), 1);
      endPage = Math.min(startPage + PAGES_TO_SHOW - 1, totalPages);
    }

    const numbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setPageNumbers(numbers);
  }, [currentPage, numPages]);

  const generatePrevPage = () => {
    const isDisabled = currentPage === 1;
    return (
      <PreviousPage
        to={isDisabled ? '#' : `${BASE_PATH}/${filter}/page=${currentPage - 1}`}
        className={isDisabled ? 'disabled' : ''}
      >
        Previous
      </PreviousPage>
    );
  };

  const generateNextPage = () => {
    const isDisabled = currentPage === numPages;
    return (
      <NextPage
        to={isDisabled ? '#' : `${BASE_PATH}/${filter}/page=${currentPage + 1}`}
        className={isDisabled ? 'disabled' : ''}
      >
        Next
      </NextPage>
    );
  };

  const handlePageClick = (e, pageNumber) => {
    if (currentPage === pageNumber) {
      e.preventDefault();
    }
  };

  return (
    <PaginationContainer>
      {generatePrevPage()}
      <PaginationUl>
        {pageNumbers.map((pageNumber) => (
          <PaginationLi key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
            <StyledLink
              to={`${BASE_PATH}/${filter}/page=${pageNumber}`}
              onClick={(e) => handlePageClick(e, pageNumber)}
            >
              {pageNumber}
            </StyledLink>
          </PaginationLi>
        ))}
      </PaginationUl>
      {generateNextPage()}
    </PaginationContainer>
  );
};

export default Pagination;
