/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Grid,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { STATUS_EMPLOYEE, STATUS_OF_PENDING, TYPE } from "app/utils/Constants";
import { updateSalaryIncrease } from "app/redux/actions/SalaryIncreaseActions";
import { updateProcess } from "app/redux/actions/ProcessActions";
import { updateProposal } from "app/redux/actions/ProposalActions";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

export const ApprovalDialog = (props) => {
  const {
    employee,
    openDialogReject,
    handleCloseReject,
    handleClosePendingDialog,
    updateEmployeeReject,
    type,
    salary,
    process,
    proposal,
    updateSalaryIncreaseReject,
    updateProcessReject,
    updateProposalReject,
  } = props;
  const [rejectEmployee, setRejectEmployee] = useState({
    rejectionDate: new Date().toISOString().slice(0, 10),
    reasonForRejection: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRejectEmployee({ ...rejectEmployee, [name]: value });
  };

  const handleSubmit = () => {
    if (
      employee?.submitProfileStatus ===
      STATUS_EMPLOYEE.PENDING_STATUS.id.toString()
    ) {
      //Từ chối nhân viên thêm mới
      const dataEmployee = {
        ...employee,
        rejectionDate: rejectEmployee?.rejectionDate,
        reasonForRejection: rejectEmployee.reasonForRejection,
        submitProfileStatus: STATUS_EMPLOYEE.REJECT_STATUS.id,
      };
      updateEmployeeReject(dataEmployee, STATUS_OF_PENDING);
    } else if (type === TYPE.SALARY_INCREASE) {
      const dataSalary = {
        ...salary,
        salaryIncreaseStatus: STATUS_EMPLOYEE.REJECT_STATUS.id,
        rejectionDate: rejectEmployee?.rejectionDate,
        reasonForRefusal: rejectEmployee.reasonForRejection,
      };
      updateSalaryIncreaseReject(dataSalary);
    } else if (type === TYPE.PROCESS) {
      const dataProcess = {
        ...process,
        processStatus: STATUS_EMPLOYEE.REJECT_STATUS.id,
        rejectionDate: rejectEmployee?.rejectionDate,
        reasonForRefusal: rejectEmployee.reasonForRejection,
      };
      updateProcessReject(dataProcess);
    } else if (type === TYPE.PROPOSAL) {
      const dataProposal = {
        ...proposal,
        proposalStatus: STATUS_EMPLOYEE.REJECT_STATUS.id,
        rejectionDate: rejectEmployee?.rejectionDate,
        reasonForRefusal: rejectEmployee.reasonForRejection,
      };
      updateProposalReject(dataProposal);
    } else {
      //Từ chối nhân viên nghỉ việc
      const dataEmployee = {
        ...employee,
        rejectionDate: rejectEmployee?.rejectionDate,
        reasonForRejection: rejectEmployee.reasonForRejection,
        submitProfileStatus: STATUS_EMPLOYEE.REJECT_ENDING_STATUS.id,
      };
      updateEmployeeReject(dataEmployee, STATUS_OF_PENDING);
    }
    handleCloseReject();
    handleClosePendingDialog();
  };
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openDialogReject}
        onClose={() => handleCloseReject()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 title">Từ chối</span>
          <IconButton className="iconClose" onClick={() => handleCloseReject()}>
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent className="dialogContent">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Ngày từ chối
                    </span>
                  }
                  type="date"
                  value={rejectEmployee?.rejectionDate || ""}
                  name="rejectionDate"
                  size="small"
                  validators={["required"]}
                  errorMessages={["Trường này không được để trống"]}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Lý do từ chối
                    </span>
                  }
                  type="text"
                  value={rejectEmployee?.reasonForRejection || ""}
                  name="reasonForRejection"
                  size="small"
                  validators={["required"]}
                  errorMessages={["Trường này không được để trống"]}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialogActions">
            <Button variant="contained" className="primary" type="submit">
              Xác nhận
            </Button>

            <Button
              variant="contained"
              className="error"
              onClick={() => handleCloseReject()}
            >
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmployeeReject: (data, status) =>
      dispatch(updateEmployee(data, status)),
    updateSalaryIncreaseReject: (salaryIncrease) => {
      dispatch(updateSalaryIncrease(salaryIncrease));
    },
    updateProcessReject: (process) => {
      dispatch(updateProcess(process));
    },
    updateProposalReject: (process) => {
      dispatch(updateProposal(process));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalDialog);
