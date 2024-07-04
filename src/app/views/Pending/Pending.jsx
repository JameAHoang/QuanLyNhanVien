/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { STATUS_OF_PENDING } from "app/utils/Constants";
import { getEmployees } from "app/redux/actions/EmployeeActions";
import PendingDialog from "./PendingDialog";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import ColumnsEmployee from "app/components/ColumnsCusTom/ColumnsEmployee";
import { Typography } from "@material-ui/core";
import SearchCustom from "app/components/SearchCustom/SearchCustom";
import PaginationCustom from "app/components/PaginationCustom/PaginationCustom";

export const Pending = (props) => {
  const { getAllEmployeeByStatus, listEmployee, totalElements } = props;
  const [OpenDialogPending, setOpenDialogPending] = useState(false);
  const [employeeId, setEmployeeId] = useState({});
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  useEffect(() => {
    getAllEmployeeByStatus({
      status: STATUS_OF_PENDING,
      page: page + 1,
      rowPerPage: rowPerPage,
      keyword: keywords,
    });
  }, [page, rowPerPage]);

  const handleOpenPendingDialog = (employee) => {
    setEmployeeId(employee?.id);
    setOpenDialogPending(true);
  };

  const handleClosePendingDialog = () => {
    setOpenDialogPending(false);
  };

  const columns = ColumnsEmployee({
    status: STATUS_OF_PENDING,
    handleOpenPendingDialog: handleOpenPendingDialog,
  });

  return (
    <div className="m-sm-30" style={{ marginBottom: "10px" }}>
      <div className="mt-16 mb-16 flex flex-space-between flex-bottom">
        <div>
          <Typography variant="h6">Danh sách chờ duyệt</Typography>
        </div>

        <SearchCustom
          keywords={keywords}
          setKeywords={setKeywords}
          status={STATUS_OF_PENDING}
        />
      </div>
      <MaterialTableCustom
        title={false}
        columns={columns}
        data={listEmployee}
        height={"550px"}
      />

      <PaginationCustom
        totalElements={totalElements}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />
      {OpenDialogPending && (
        <PendingDialog
          OpenDialogPending={OpenDialogPending}
          handleClosePendingDialog={handleClosePendingDialog}
          employeeId={employeeId}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  listEmployee: state.employee.listEmployee,
  totalElements: state.employee.totalElements,
});

const mapDispatchToProps = (dispatch) => {
  return { getAllEmployeeByStatus: (data) => dispatch(getEmployees(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
