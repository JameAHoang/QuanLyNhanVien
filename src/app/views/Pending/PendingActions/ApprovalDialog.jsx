/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
  FormControlLabel,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { STATUS_EMPLOYEE, STATUS_OF_PENDING, TYPE } from "app/utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Checkbox from "@material-ui/core/Checkbox";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
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
    setEmployee,
    openDialogApprove,
    handleCloseDialogApprove,
    handleClosePendingDialog,
    updateEmployeeApproval,
    type,
    salary,
    process,
    proposal,
    updateSalaryIncreaseApproval,
    updateProcessApproval,
    updateProposalApproval,
  } = props;

  const [checked, setChecked] = useState(true);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  useEffect(() => {
    handleApproveEmployee();
  }, [employee?.id]);

  const handleApproveEmployee = () => {
    setEmployee({
      ...employee,
      appointmentDate: new Date().toISOString().slice(0, 10),
    });
  };

  const handleSubmit = () => {
    //Duyệt nhân viên thêm mới
    if (checked) {
      if (
        employee?.submitProfileStatus ===
        STATUS_EMPLOYEE.PENDING_STATUS.id.toString()
      ) {
        const dataEmployee = {
          ...employee,
          submitProfileStatus: STATUS_EMPLOYEE.APPROVED_STATUS.id,
        };

        updateEmployeeApproval(dataEmployee, STATUS_OF_PENDING);
      } else if (type === TYPE.SALARY_INCREASE) {
        const dataSalary = {
          ...salary,
          acceptanceDate: employee.appointmentDate,
          salaryIncreaseStatus: STATUS_EMPLOYEE.APPROVED_STATUS.id,
        };

        updateSalaryIncreaseApproval(dataSalary);
      } else if (type === TYPE.PROCESS) {
        const dataProcess = {
          ...process,
          acceptanceDate: employee.appointmentDate,
          processStatus: STATUS_EMPLOYEE.APPROVED_STATUS.id,
        };
        updateProcessApproval(dataProcess);
      } else if (type === TYPE.PROPOSAL) {
        const dataProposal = {
          ...proposal,
          acceptanceDate: employee.appointmentDate,
          proposalStatus: STATUS_EMPLOYEE.APPROVED_STATUS.id,
        };
        updateProposalApproval(dataProposal);
      } else {
        const dataEmployee = {
          ...employee,
          submitProfileStatus: STATUS_EMPLOYEE.APPROVED_ENDING_STATUS.id,
        };
        updateEmployeeApproval(dataEmployee, STATUS_OF_PENDING);
      }
      handleCloseDialogApprove();
      handleClosePendingDialog();
    } else {
      toast.error("Chưa đủ điều kiện phê duyệt");
    }
  };
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openDialogApprove}
        onClose={() => handleCloseDialogApprove()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 title">Phê duyệt</span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseDialogApprove()}
          >
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
                      Ngày phê duyệt
                    </span>
                  }
                  type="date"
                  value={employee?.appointmentDate || ""}
                  name="appointmentDate"
                  size="small"
                  validators={["required"]}
                  errorMessages={["Trường này không được để trống"]}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      name="checked"
                      color="primary"
                    />
                  }
                  label="Đã đủ điều kiện phê duyệt"
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
              onClick={() => handleCloseDialogApprove()}
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
    updateEmployeeApproval: (data, status) =>
      dispatch(updateEmployee(data, status)),
    updateSalaryIncreaseApproval: (salaryIncrease) => {
      dispatch(updateSalaryIncrease(salaryIncrease));
    },
    updateProcessApproval: (process) => {
      dispatch(updateProcess(process));
    },
    updateProposalApproval: (process) => {
      dispatch(updateProposal(process));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalDialog);
