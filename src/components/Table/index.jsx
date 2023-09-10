import React, { useState } from "react";
import './style.less'

export const Table = ({ data, columns, itemsPerPage = 10 }) => {
  const [searchText, setSearchText] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (columnKey) => {
    if (sortedColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
      setSortedColumn(columnKey);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const filteredData = data.filter((item) => {
  //   const values = Object.values(item);
  //   return values.some((value) =>
  //     value.toString().toLowerCase().includes(searchText.toLowerCase())
  //   );
  // });

  const sortedData = data.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
    } else {
      return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  // const slicedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="table-container">
      <div className="search-container">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Enter search text"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} onClick={() => handleSort(column.key, column?.sort)}>
                  {column.name}
                  {sortedColumn === column.key && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}
