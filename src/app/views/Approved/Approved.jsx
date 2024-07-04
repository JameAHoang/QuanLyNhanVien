/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { STATUS_OF_APPROVED } from "app/utils/Constants";
import {
  getEmployeeById,
  getEmployees,
} from "app/redux/actions/EmployeeActions";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import ApprovedDialog from "./ApprovedDialog";
import { Breadcrumb } from "egret";
import ColumnsEmployee from "app/components/ColumnsCusTom/ColumnsEmployee";
import { Typography } from "@material-ui/core";
import SearchCustom from "app/components/SearchCustom/SearchCustom";
import PaginationCustom from "app/components/PaginationCustom/PaginationCustom";

export const Approved = (props) => {
  const {
    getAllEmployeeByStatus,
    listEmployee,
    getEmployeeById,
    employeeReducer,
    totalElements,
  } = props;

  const [openDialogApproved, setOpendialogApproved] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  useEffect(() => {
    getAllEmployeeByStatus({
      status: STATUS_OF_APPROVED,
      page: page + 1,
      rowPerPage: rowPerPage,
      keyword: keywords,
    });
  }, [page, rowPerPage]);

  const handleOpenDialogApproved = (employee) => {
    setOpendialogApproved(true);
    getEmployeeById(employee?.id);
  };

  const handleCloseDialogApproved = () => {
    setOpendialogApproved(false);
  };

  const columns = ColumnsEmployee({
    status: STATUS_OF_APPROVED,
    handleOpenDialogApproved: handleOpenDialogApproved,
  });
  return (
    <div className="m-sm-30" style={{ marginBottom: "10px" }}>
      <Breadcrumb
        routeSegments={[{ name: "Lãnh đạo", path: "/" }, { name: "Đã duyệt" }]}
      />
      <div className="mt-16 mb-16 flex flex-space-between flex-bottom">
        <div>
          <Typography variant="h6">Danh sách đã duyệt</Typography>
        </div>

        <SearchCustom
          keywords={keywords}
          setKeywords={setKeywords}
          status={STATUS_OF_APPROVED}
        />
      </div>
      <MaterialTableCustom
        title={false}
        columns={columns}
        data={listEmployee}
        height="550px"
      />

      <PaginationCustom
        totalElements={totalElements}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />
      {openDialogApproved && (
        <ApprovedDialog
          openDialogApproved={openDialogApproved}
          handleCloseDialogApproved={handleCloseDialogApproved}
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

export default connect(mapStateToProps, mapDispatchToProps)(Approved);
