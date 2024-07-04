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
} from "@material-ui/core";
import { Letter } from "app/components/Form/Letter";
import { STATUS_OF_UPDATE_PROGRESS } from "app/utils/Constants";
import SendLeaderDialog from "app/views/RegisterEmployee/SendLeaderDialog";
export const LetterDialog = (props) => {
  const {
    type,
    salary,
    process,
    proposal,
    employee,
    openLetterDialog,
    handleCloseLetterDialog,
  } = props;

  const [openSendLeaderDialog, setOpenSendLeaderDialog] = useState(false);

  const handleCloseSendLeaderDialog = () => {
    setOpenSendLeaderDialog(false);
  };

  const closeAllDialog = () => {
    handleCloseSendLeaderDialog();
    handleCloseLetterDialog();
  };
  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openLetterDialog}
        onClose={() => handleCloseLetterDialog()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Biểu mẫu</span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseLetterDialog()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="pd-8 dialogContent">
          <Letter
            type={type}
            salary={salary}
            process={process}
            proposal={proposal}
            employee={employee}
          />
        </DialogContent>
        <DialogActions className="dialogActions">
          {!STATUS_OF_UPDATE_PROGRESS.includes(
            salary?.salaryIncreaseStatus ||
              process?.processStatus ||
              proposal?.proposalStatus
          ) && (
            <Button
              variant="contained"
              className="primary"
              onClick={() => setOpenSendLeaderDialog(true)}
            >
              Trình lãnh đạo
            </Button>
          )}

          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseLetterDialog()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {openSendLeaderDialog && (
        <SendLeaderDialog
          type={type}
          salary={salary}
          process={process}
          proposal={proposal}
          openSendLeaderDialog={openSendLeaderDialog}
          handleCloseSendLeaderDialog={handleCloseSendLeaderDialog}
          closeAllDialog={closeAllDialog}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LetterDialog);
