/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { Button } from "@material-ui/core";
import AddNewEmployeeDialog from "./AddNewEmployeeDialog";
import {
  deleteEmployee,
  getEmployees,
} from "app/redux/actions/EmployeeActions";
import { STATUS_OF_ADD_EMPLOYEE } from "app/utils/Constants";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import EmployeeInforDetail from "./EmployeeInforDetail";
import ColumnsEmployee from "app/components/ColumnsCusTom/ColumnsEmployee";
import SearchCustom from "app/components/SearchCustom/SearchCustom";
import PaginationCustom from "app/components/PaginationCustom/PaginationCustom";

export const AddNewEmployee = (props) => {
  const {
    getAllEmployeeByStatus,
    listEmployee,
    deleteEmployee,
    employeeReducer,
    totalElements,
  } = props;

  const [openDialogSubmit, setOpenDialogSubmit] = useState(false);
  const [employee, setEmployee] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [openEmployeeDetail, setOpenEmployeeDetail] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const handleOpenDialogSubmit = (employee) => {
    setOpenDialogSubmit(true);
    setEmployee(employee);
  };

  useEffect(() => {
    setEmployee(employeeReducer);
  }, [employeeReducer]);

  const handleCloseDialogSubmit = () => {
    setOpenDialogSubmit(false);
  };

  useEffect(() => {
    getAllEmployeeByStatus({
      status: STATUS_OF_ADD_EMPLOYEE,
      page: page + 1,
      rowPerPage: rowPerPage,
      keyword: keywords,
    });
  }, [page, rowPerPage]);

  const handleOpenDeleteDialog = (id) => {
    setIsDelete(true);
    setEmployeeId(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  const handleDeleteEmployee = () => {
    deleteEmployee(employeeId);
    setIsDelete(false);
  };

  const handleViewDetails = (employee) => {
    setOpenEmployeeDetail(true);
    setEmployee(employee);
  };

  const handleCloseViewDetails = () => {
    setOpenEmployeeDetail(false);
  };

  const columns = ColumnsEmployee({
    status: STATUS_OF_ADD_EMPLOYEE,
    handleOpenDialogSubmit: handleOpenDialogSubmit,
    handleOpenDeleteDialog: handleOpenDeleteDialog,
    handleViewDetails: handleViewDetails,
  });

  return (
    <>
      <div className="m-sm-30" style={{ marginBottom: "10px" }}>
        <Breadcrumb
          routeSegments={[
            { name: "Quản lý", path: "/" },
            { name: "Thêm mới nhân viên" },
          ]}
        />
        {openDialogSubmit && (
          <AddNewEmployeeDialog
            openDialogSubmit={openDialogSubmit}
            handleOpenDialogSubmit={handleOpenDialogSubmit}
            handleCloseDialogSubmit={handleCloseDialogSubmit}
            employee={employee}
            setEmployee={setEmployee}
          />
        )}
        <div className="mt-16 mb-16 flex flex-space-between flex-bottom">
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialogSubmit({})}
            >
              Thêm mới
            </Button>
          </div>
          <SearchCustom
            keywords={keywords}
            setKeywords={setKeywords}
            status={STATUS_OF_ADD_EMPLOYEE}
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

        {isDelete && (
          <ConfirmationDialog
            title={"Xác nhận xóa"}
            open={isDelete}
            onConfirmDialogClose={handleCloseDeleteDialog}
            onYesClick={handleDeleteEmployee}
            text={"Bạn chắc chắn muốn xóa nhân viên ?"}
            Yes={"Xác nhận"}
            No={"Hủy"}
          />
        )}

        {openEmployeeDetail && (
          <EmployeeInforDetail
            openEmployeeDetail={openEmployeeDetail}
            handleCloseViewDetails={handleCloseViewDetails}
            employee={employee}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  listEmployee: state.employee.listEmployee,
  employeeReducer: state.employee.employee,
  totalElements: state.employee.totalElements,
  loading: state.employee.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployeeByStatus: (data) => dispatch(getEmployees(data)),
    deleteEmployee: (id) => dispatch(deleteEmployee(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewEmployee);
