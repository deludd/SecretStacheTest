import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Pagination = ({ currentPage, numPages, basePath }) => {
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    setPageNumbers(Array.from(Array(numPages).keys()).slice(currentPage - 2, currentPage + 3).filter(page => page > 0));
  }, [currentPage, numPages]);

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPage = isFirst ? null : (
    <PreviousPage to={`${basePath}/page=${currentPage - 1}`} rel="prev">
      Previous
    </PreviousPage>
  );
  const nextPage = isLast ? null : (
    <NextPage to={`${basePath}/page=${currentPage + 1}`}>
      Next
    </NextPage>
  );

  return (
    <nav className="pagination">
      <PaginationContainer>
        {prevPage}
        <PaginationList>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
              <StyledLink to={`${basePath}/page=${pageNumber}`}>{pageNumber}</StyledLink>
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
    color: #fff;
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
