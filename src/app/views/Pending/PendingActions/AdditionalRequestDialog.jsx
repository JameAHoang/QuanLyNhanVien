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
import { STATUS_EMPLOYEE, STATUS_OF_PENDING, TYPE } from "app/utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../styles/views/_style.scss";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { updateSalaryIncrease } from "app/redux/actions/SalaryIncreaseActions";
import { updateProcess } from "app/redux/actions/ProcessActions";
import { updateProposal } from "app/redux/actions/ProposalActions";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

export const AdditionalRequestDialog = (props) => {
  const {
    employee,
    openDialogAdditionalRequest,
    handleCloseAdditionalRequest,
    handleClosePendingDialog,
    updateEmployeeAdditional,
    type,
    salary,
    process,
    proposal,
    updateSalaryIncreaseAdditional,
    updateProcessAdditional,
    updateProposalAdditional,
  } = props;

  const [additionalRequset, setAdditionalRequset] = useState("");
  const handleOnChange = (e) => {
    const { value } = e.target;
    setAdditionalRequset(value);
  };

  const handleSubmit = () => {
    if (
      employee?.submitProfileStatus ===
      STATUS_EMPLOYEE.PENDING_STATUS.id.toString()
    ) {
      //Yêu cầu bổ sung thêm mới
      const dataEmployee = {
        ...employee,
        additionalRequset: additionalRequset,
        submitProfileStatus: STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
      };
      updateEmployeeAdditional(dataEmployee, STATUS_OF_PENDING);
    } else if (type === TYPE.SALARY_INCREASE) {
      const dataSalary = {
        ...salary,
        additionalRequset: additionalRequset,
        salaryIncreaseStatus: STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
      };
      updateSalaryIncreaseAdditional(dataSalary);
    } else if (type === TYPE.PROCESS) {
      const dataProcess = {
        ...process,
        additionalRequset: additionalRequset,
        processStatus: STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
      };
      updateProcessAdditional(dataProcess);
    } else if (type === TYPE.PROPOSAL) {
      const dataProposal = {
        ...proposal,
        additionalRequset: additionalRequset,
        proposalStatus: STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
      };
      updateProposalAdditional(dataProposal);
    } else {
      // yêu cầu bổ sung kết thúc
      const dataEmployee = {
        ...employee,
        additionalRequset: additionalRequset,
        submitProfileStatus:
          STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_ENDING_STATUS.id,
      };
      updateEmployeeAdditional(dataEmployee, STATUS_OF_PENDING);
    }
    handleCloseAdditionalRequest();
    handleClosePendingDialog();
  };
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openDialogAdditionalRequest}
        onClose={() => handleCloseAdditionalRequest()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 title">Yêu cầu bổ sung</span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseAdditionalRequest()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent className="dialogContent">
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Nội dung yêu cầu
                    </span>
                  }
                  type="text"
                  value={additionalRequset || ""}
                  name="additionalRequset"
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
              onClick={() => handleCloseAdditionalRequest()}
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
    updateEmployeeAdditional: (data, status) =>
      dispatch(updateEmployee(data, status)),
    updateSalaryIncreaseAdditional: (salaryIncrease) => {
      dispatch(updateSalaryIncrease(salaryIncrease));
    },
    updateProcessAdditional: (process) => {
      dispatch(updateProcess(process));
    },
    updateProposalAdditional: (process) => {
      dispatch(updateProposal(process));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalRequestDialog);
