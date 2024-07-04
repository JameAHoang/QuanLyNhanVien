/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
} from "@material-ui/core";
import "../../../styles/views/_dialog.scss";
import SendLeaderDialog from "./SendLeaderDialog";
import FormEmployeeInfor from "app/components/FormEmployeeInfor/FormEmployeeInfor";
import { TYPE } from "app/utils/Constants";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
export const RegisterEmployee = (props) => {
  const {
    employee,
    openDialogRegister,
    handleCloseDialogRegister,
    handleCloseEmployeeDialogSubmit,
    setEmployee,
    certificatesDto,
    employeeFamilyDtos,
    updateEmployee,
  } = props;
  const submitRef = useRef();
  const [openSendLeaderDialog, setOpenSendLeaderDialog] = useState(false);

  useEffect(() => {
    setEmployee({
      ...employee,
      certificatesDto: certificatesDto,
      employeeFamilyDtos: employeeFamilyDtos,
    });
  }, [employee?.id]);

  const handleUpdateEmployee = () => {
    const dataEmployee = {
      ...employee,
      skill: employee.skill.trim(),
      activity: employee.activity.trim(),
    };
    updateEmployee(dataEmployee);
    setOpenSendLeaderDialog(true);
  };

  const handleCloseSendLeaderDialog = () => {
    setOpenSendLeaderDialog(false);
  };

  const closeAllDialog = () => {
    handleCloseSendLeaderDialog();
    handleCloseDialogRegister();
    handleCloseEmployeeDialogSubmit();
  };
  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openDialogRegister}
        onClose={() => handleCloseDialogRegister()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Thông tin hồ sơ </span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseDialogRegister()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="pd-8 dialogContent">
          {employee?.id && (
            <FormEmployeeInfor
              employee={employee}
              setEmployee={setEmployee}
              certificatesDto={certificatesDto}
              employeeFamilyDtos={employeeFamilyDtos}
              submitRef={submitRef}
              isViewData={false}
            />
          )}
        </DialogContent>
        <DialogActions className="dialogActions">
          <Button
            variant="contained"
            className="primary"
            type="submit"
            onClick={() => submitRef?.current?.click()}
          >
            Lưu
          </Button>
          {employee?.skill && employee?.activity && (
            <Button
              variant="contained"
              className="secondary"
              onClick={() => handleUpdateEmployee()}
            >
              Trình lãnh đạo
            </Button>
          )}
          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseDialogRegister()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      {openSendLeaderDialog && (
        <SendLeaderDialog
          openSendLeaderDialog={openSendLeaderDialog}
          handleCloseSendLeaderDialog={handleCloseSendLeaderDialog}
          closeAllDialog={closeAllDialog}
          employee={employee}
          setEmployee={setEmployee}
          type={TYPE.REGISTER_EMPLOYEE}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmployee: (data, status) => dispatch(updateEmployee(data, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmployee);
