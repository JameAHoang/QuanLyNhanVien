import React from "react";
import { TablePagination } from "@material-ui/core";

const PaginationCustom = ({
  totalElements,
  page,
  setPage,
  rowPerPage,
  setRowPerPage,
}) => {
  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
    setPage(0);
  };
  return (
    <TablePagination
      component="div"
      count={totalElements}
      page={page}
      rowsPerPage={rowPerPage}
      rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} trong ${count}`
      }
      labelRowsPerPage="Số hàng mỗi trang:"
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default PaginationCustom;
