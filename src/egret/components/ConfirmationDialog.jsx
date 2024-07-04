import React from "react";
import { Dialog, Button, DialogActions } from "@material-ui/core";
import "../../styles/views/_dialog.scss";
const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = "confirm",
  onYesClick,
  Yes,
  No,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div className="pt-24 px-20 pb-8">
        <h4 className="capitalize">{title}</h4>
        <p>{text}</p>
        <div>
          <DialogActions className="dialogActions">
            <div className="flex flex-space-between flex-middle">
              <Button
                onClick={onYesClick}
                className={"primary"}
                variant="contained"
              >
                {Yes}
              </Button>
              {No && (
                <Button
                  onClick={onConfirmDialogClose}
                  variant="contained"
                  // color="secondary"
                  className="error ml-16"
                >
                  {No}
                </Button>
              )}
            </div>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
