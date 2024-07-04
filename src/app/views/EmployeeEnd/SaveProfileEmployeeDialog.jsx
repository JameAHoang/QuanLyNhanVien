/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { STATUS_EMPLOYEE, STATUS_OF_EMPLOYEE_END } from "app/utils/Constants";
import moment from "moment";
export const SaveProfileEmployeeDialog = (props) => {
  const {
    openSaveProfileEmployeeDialog,
    handleCloseSaveProfile,
    handleCloseDialogEmployeeEnd,
    employee,
    updateEmployee,
  } = props;

  const [dataSaveProfile] = useState({
    decisionDay: new Date().toISOString().slice(0, 10),
    numberSaved: `NL${moment(new Date()).format("MM")}${moment(
      new Date()
    ).format("YYYY")}/${employee?.id.toString().slice(-3)}`,
    submitProfileStatus: STATUS_EMPLOYEE.DEPOSIT_STATUS.id,
  });

  const closeAllDialog = () => {
    handleCloseSaveProfile();
    handleCloseDialogEmployeeEnd();
  };

  const handleSubmit = () => {
    const dataEmployee = {
      ...employee,
      decisionDay: dataSaveProfile.decisionDay,
      submitProfileStatus: dataSaveProfile.submitProfileStatus,
      numberSaved: dataSaveProfile.numberSaved,
    };
    updateEmployee(dataEmployee, STATUS_OF_EMPLOYEE_END);
    closeAllDialog();
  };
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openSaveProfileEmployeeDialog}
        onClose={() => handleCloseSaveProfile()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Lưu hồ sơ</span>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent className="dialogContent">
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Ngày quyết định
                    </span>
                  }
                  type="date"
                  value={dataSaveProfile?.decisionDay || ""}
                  name="decisionDay"
                  size="small"
                  validators={["required"]}
                  errorMessages={["Ngày quyết định không được để trống"]}
                />
              </Grid>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Số lưu
                    </span>
                  }
                  type="text"
                  value={dataSaveProfile?.numberSaved || ""}
                  name="numberSaved"
                  size="small"
                  validators={["required"]}
                  errorMessages={["Số lưu không được để trống"]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialogActions">
            <Button variant="contained" color="primary" type="submit">
              Xác nhận
            </Button>

            <Button
              variant="contained"
              className="error"
              onClick={() => handleCloseSaveProfile()}
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
    updateEmployee: (data, status) => dispatch(updateEmployee(data, status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveProfileEmployeeDialog);
