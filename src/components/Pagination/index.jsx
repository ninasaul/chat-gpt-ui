import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';
import './style'

export function Pagination(props) {
  const { currentPage, totalPages, onPageChange, itemsPerPage, onPageCountChange } = props
  const [pageInput, setPageInput] = useState('');
  const pageNumbers = [1, 2, 3, 4, 5];
  const MAX_PAGES = 5; // maximum number of pages to show at once

  // calculate the range of page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + MAX_PAGES - 1);

  // if there are fewer pages than MAX_PAGES, adjust the startPage and endPage
  if (totalPages < MAX_PAGES) {
    startPage = 1;
    endPage = totalPages;
  }

  // create an array of page numbers to display
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // calculate the start and end item index for the current page
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage - 1, onPageCountChange(totalPages, currentPage, itemsPerPage));

  const handlePageInput = (event) => {
    setPageInput(event.target.value);
  };

  const handlePageSubmit = (event) => {
    event.preventDefault();
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
    setPageInput('');
  };

  const handleItemCountChange = (event) => {
    const count = parseInt(event.target.value);
    onPageCountChange(totalPages, currentPage, count);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <Button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </Button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page} className={`page-item${currentPage === page ? ' active' : ''}`}>
            <Button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </Button>
          </li>
        ))}
        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
          <Button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </Button>
        </li>
        <li className="page-item">
          <form onSubmit={handlePageSubmit}>
            <Input
              type="number"
              min="1"
              max={totalPages}
              className="form-control"
              placeholder={`Page (1-${totalPages})`}
              value={pageInput}
              onChange={handlePageInput}
            />
            <Button type="submit" className="btn btn-primary mt-2">
              Go
            </Button>
          </form>
        </li>
        <li className="page-item">
          <Select isMulti={true} options={[5, 10, 20]} />
        </li>
      </ul>
      <p className="text-muted">
        Showing {startItem + 1} to {endItem + 1}
        of {onPageCountChange(totalPages, currentPage, itemsPerPage)} entries
      </p>
    </nav>
  );
};


