import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

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
  const nextPage = isLast ? null : (
    <NextPage to={`${basePath}/${filter}/page=${currentPage + 1}`}>
      Next
    </NextPage>
  );

  return (
    <nav className="pagination">
      <PaginationContainer>
        {currentPage !== 1 && prevPage}
        <PaginationList>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
              <StyledLink to={`${basePath}/${filter}/page=${pageNumber}`}>{pageNumber}</StyledLink>
            </li>
          ))}
        </PaginationList>
        {nextPage}
      </PaginationContainer>
    </nav>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviousPage = styled(Link)`
  display: inline-block;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;

  &.active {
    background-color: #000;
    color: #fff;
  }
`;

const NextPage = styled(Link)`
  display: inline-block;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;

  &.active {
    background-color: #000;
    color: #fff;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &.active {
    background-color: #000;
    color: white;
  }
`;

const PaginationList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  align-items: center;

  li {
    display: inline-block;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0;
    cursor: pointer;

    &.active {
      background-color: #000;
      color: white;
    }
  }
`;

export default Pagination;
