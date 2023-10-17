import React, { useState, useEffect } from 'react';
import {
  PaginationContainer,
  PaginationUl,
  PaginationLi,
  StyledLink,
  NextPage,
  PreviousPage,
} from '../styles/PaginationStyles';

const Pagination = ({ currentPage, numPages, basePath, filter }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const pagesToShow = 4;

  useEffect(() => {
    const totalPages = Math.ceil(numPages);
    const startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    setPageNumbers(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
  }, [currentPage, numPages, pagesToShow]);

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPage = isFirst ? null : (
    <PreviousPage to={`${basePath}/${filter}/page=${currentPage - 1}`} rel="prev">
      Previous
    </PreviousPage>
  );
  const nextPage = isLast ? null : <NextPage to={`${basePath}/${filter}/page=${currentPage + 1}`}>Next</NextPage>;

  return (
    <PaginationContainer>
      {currentPage !== 1 && prevPage}
      <PaginationUl>
        {pageNumbers.map((pageNumber) => (
          <PaginationLi key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
            <StyledLink to={`${basePath}/${filter}/page=${pageNumber}`}>{pageNumber}</StyledLink>
          </PaginationLi>
        ))}
      </PaginationUl>
      {nextPage}
    </PaginationContainer>
  );
};

export default Pagination;
