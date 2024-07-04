import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Icon,
} from "@material-ui/core";
import ResignationLetter from "app/components/Form/ResignationLetter";
import { STATUS_EMPLOYEE } from "app/utils/Constants";

export const EndFormDialog = (props) => {
  const {
    openEmployeeEndDialog,
    handleCloseEmployeeEndDialog,
    handleCloseEmployeeDialog,
    employee,
    isViewData,
  } = props;
  const submitRef = useRef();

  const closeAllDialog = () => {
    handleCloseEmployeeEndDialog();
    handleCloseEmployeeDialog();
  };

  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openEmployeeEndDialog}
        onClose={() => handleCloseEmployeeEndDialog()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Biểu mẫu</span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseEmployeeEndDialog()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="pd-8 dialogContent">
          <ResignationLetter
            employee={employee}
            submitRef={submitRef}
            closeAllDialog={closeAllDialog}
            isViewData={isViewData}
          />
        </DialogContent>
        <DialogActions className="dialogActions">
          {!STATUS_EMPLOYEE.PENDING_END_STATUS.id
            .toString()
            .includes(employee?.submitProfileStatus) && (
            <Button
              variant="contained"
              className="primary"
              type="submit"
              onClick={() => submitRef.current.click()}
            >
              Trình lãnh đạo
            </Button>
          )}

          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseEmployeeEndDialog()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndFormDialog);
