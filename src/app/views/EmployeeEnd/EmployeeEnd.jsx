/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { STATUS_OF_EMPLOYEE_END } from "app/utils/Constants";
import {
  getEmployeeById,
  getEmployees,
} from "app/redux/actions/EmployeeActions";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import { Breadcrumb } from "egret";
import EmployeeEndDialog from "./EmployeeEndDialog";
import ColumnsEmployee from "app/components/ColumnsCusTom/ColumnsEmployee";
import SearchCustom from "app/components/SearchCustom/SearchCustom";
import { Typography } from "@material-ui/core";
import PaginationCustom from "app/components/PaginationCustom/PaginationCustom";

export const EmployeeManagement = (props) => {
  const {
    getAllEmployeeByStatus,
    listEmployee,
    getEmployeeById,
    employeeReducer,
    totalElements,
  } = props;
  const [openDialogEmployeeEnd, setOpenDialogEmployeeEnd] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  useEffect(() => {
    getAllEmployeeByStatus({
      status: STATUS_OF_EMPLOYEE_END,
      page: page + 1,
      rowPerPage: rowPerPage,
      keyword: keywords,
    });
  }, [page, rowPerPage]);

  const handleOpenDialogEmployeeEnd = (employee) => {
    getEmployeeById(employee?.id);
    setOpenDialogEmployeeEnd(true);
  };

  const handleCloseDialogEmployeeEnd = () => {
    setOpenDialogEmployeeEnd(false);
  };

  const columns = ColumnsEmployee({
    status: STATUS_OF_EMPLOYEE_END,
    handleOpenDialogEmployeeEnd: handleOpenDialogEmployeeEnd,
  });

  return (
    <div className="m-sm-30" style={{ marginBottom: "10px" }}>
      <Breadcrumb
        routeSegments={[{ name: "Quản lý", path: "/" }, { name: " kết thúc" }]}
      />
      <div className="mt-16 mb-16 flex flex-space-between flex-bottom">
        <div>
          <Typography variant="h6">Danh sách kết thúc</Typography>
        </div>

        <SearchCustom
          keywords={keywords}
          setKeywords={setKeywords}
          status={STATUS_OF_EMPLOYEE_END}
        />
      </div>
      <MaterialTableCustom
        title={false}
        columns={columns}
        data={listEmployee}
        height={"520px"}
      />

      <PaginationCustom
        totalElements={totalElements}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />

      {openDialogEmployeeEnd && (
        <EmployeeEndDialog
          openDialogEmployeeEnd={openDialogEmployeeEnd}
          handleCloseDialogEmployeeEnd={handleCloseDialogEmployeeEnd}
          employee={employeeReducer}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  listEmployee: state.employee.listEmployee,
  employeeReducer: state.employee.employee,
  totalElements: state.employee.totalElements,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployeeByStatus: (data) => dispatch(getEmployees(data)),
    getEmployeeById: (id) => {
      dispatch(getEmployeeById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeManagement);
