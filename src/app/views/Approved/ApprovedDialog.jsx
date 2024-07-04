/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
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
import FormEmployeeInfor from "app/components/FormEmployeeInfor/FormEmployeeInfor";
export const PendingDialog = (props) => {
  const { openDialogApproved, handleCloseDialogApproved, employee } = props;

  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openDialogApproved}
        onClose={() => handleCloseDialogApproved()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Thông tin hồ sơ </span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseDialogApproved()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="pd-8 dialogContent">
          <FormEmployeeInfor
            employee={employee}
            certificatesDto={employee?.certificatesDto}
            employeeFamilyDtos={employee?.employeeFamilyDtos}
            isViewData={true}
          />
        </DialogContent>
        <DialogActions className="dialogActions">
          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseDialogApproved()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingDialog);
