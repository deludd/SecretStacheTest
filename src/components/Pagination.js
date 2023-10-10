import React from 'react';
import { Link } from 'gatsby';

const Pagination = ({ currentPage, numPages, basePath }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPage = isFirst ? null : (
    <Link to={`${basePath}=${currentPage - 1}`} rel="prev">
      ← Previous
    </Link>
  );
  const nextPage = isLast ? null : (
    <Link to={`${basePath}=${currentPage + 1}`}>
      Next →
    </Link>
  );

  const pageNumbers = [];
  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(
      <li key={i} className={currentPage === i ? 'active' : ''}>
        <Link to={`${basePath}=${i}`}>{i}</Link>
      </li>
    );
  }

  return (
    <nav className="pagination">
      {prevPage}
      <ul className="pagination-list">
        {pageNumbers}
      </ul>
      {nextPage}
    </nav>
  );
};


export default Pagination