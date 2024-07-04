/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { STATUS_OF_EMPLOYEE_MANAGEMEMNT } from "app/utils/Constants";
import {
  getEmployeeById,
  getEmployees,
} from "app/redux/actions/EmployeeActions";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import { Breadcrumb } from "egret";
import EmployeeManagementDialog from "./EmployeeManagementDialog";
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

  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
  const [type, setType] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const handleOpenEmployeeDialog = (employee, type) => {
    setOpenEmployeeDialog(true);
    getEmployeeById(employee?.id);
    if (type === "update") {
      setType(true);
    }
  };

  const handleCloseEmployeeDialog = () => {
    setOpenEmployeeDialog(false);
    setType(false);
  };

  useEffect(() => {
    getAllEmployeeByStatus({
      status: STATUS_OF_EMPLOYEE_MANAGEMEMNT,
      page: page + 1,
      rowPerPage: rowPerPage,
      keyword: keywords,
    });
  }, [page, rowPerPage]);

  const columns = ColumnsEmployee({
    status: STATUS_OF_EMPLOYEE_MANAGEMEMNT,
    handleOpenEmployeeDialog: handleOpenEmployeeDialog,
  });

  return (
    <div className="m-sm-30" style={{ marginBottom: "10px" }}>
      <Breadcrumb
        routeSegments={[{ name: "Quản lý", path: "/" }, { name: " nhân viên" }]}
      />

      <div className="mt-16 mb-16 flex flex-space-between flex-bottom">
        <div>
          <Typography variant="h6">Danh sách nhân viên</Typography>
        </div>

        <SearchCustom
          keywords={keywords}
          setKeywords={setKeywords}
          status={STATUS_OF_EMPLOYEE_MANAGEMEMNT}
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

      {openEmployeeDialog && (
        <EmployeeManagementDialog
          openEmployeeDialog={openEmployeeDialog}
          handleCloseEmployeeDialog={handleCloseEmployeeDialog}
          employee={employeeReducer}
          type={type}
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
