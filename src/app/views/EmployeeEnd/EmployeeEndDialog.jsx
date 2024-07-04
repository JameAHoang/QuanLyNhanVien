/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import FormEmployeeInfor from "app/components/FormEmployeeInfor/FormEmployeeInfor";
import { STATUS_EMPLOYEE } from "app/utils/Constants";
import { formatExportDate } from "app/components/FormatDate/FormatDate";
import SaveProfileEmployeeDialog from "./SaveProfileEmployeeDialog";
export const EmployeeEndDialog = (props) => {
  const { openDialogEmployeeEnd, handleCloseDialogEmployeeEnd, employee } =
    props;
  const [openSaveProfileEmployeeDialog, setOpenSaveProfileEmployeeDialog] =
    useState(false);

  const handleOpenSaveProfile = () => {
    setOpenSaveProfileEmployeeDialog(true);
  };
  const handleCloseSaveProfile = () => {
    setOpenSaveProfileEmployeeDialog(false);
  };
  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openDialogEmployeeEnd}
        onClose={() => handleCloseDialogEmployeeEnd()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">
            {employee?.submitProfileStatus ===
            STATUS_EMPLOYEE.APPROVED_ENDING_STATUS.id.toString()
              ? "Thông tin hồ sơ"
              : "Thông tin hồ sơ (đã lưu hồ sơ)"}
            {employee?.submitProfileStatus !==
              STATUS_EMPLOYEE.APPROVED_ENDING_STATUS.id.toString() && (
              <span
                style={{
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "#7467ef",
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              >
                Ngày quyết định: {formatExportDate(employee?.decisionDay)} - Số
                lưu: {employee?.numberSaved}
              </span>
            )}
          </span>
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
          {employee?.submitProfileStatus ===
            STATUS_EMPLOYEE.APPROVED_ENDING_STATUS.id.toString() && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenSaveProfile()}
            >
              Nộp lưu hồ sơ
            </Button>
          )}

          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseDialogEmployeeEnd()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {openSaveProfileEmployeeDialog && (
        <SaveProfileEmployeeDialog
          openSaveProfileEmployeeDialog={openSaveProfileEmployeeDialog}
          handleCloseSaveProfile={handleCloseSaveProfile}
          handleCloseDialogEmployeeEnd={handleCloseDialogEmployeeEnd}
          employee={employee}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEndDialog);
