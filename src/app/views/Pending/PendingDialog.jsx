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
} from "@material-ui/core";
import FormEmployeeInfor from "app/components/FormEmployeeInfor/FormEmployeeInfor";
import { STATUS_EMPLOYEE } from "app/utils/Constants";
import ApprovalDialog from "./PendingActions/ApprovalDialog";
import { getEmployeeById } from "app/redux/actions/EmployeeActions";
import AdditionalRequestDialog from "./PendingActions/AdditionalRequestDialog";
import RejectDialog from "./PendingActions/RejectDialog";
import ResignationLetter from "app/components/Form/ResignationLetter";
import { Letter } from "app/components/Form/Letter";
export const PendingDialog = (props) => {
  const {
    OpenDialogPending,
    handleClosePendingDialog,
    employeeId,
    getEmployeeById,
    employeeReducer,
    type,
    salary,
    process,
    proposal,
  } = props;

  const [openDialogApprove, setOpenDialogApprove] = useState(false);
  const [openDialogAdditionalRequest, setOpenDialogAdditionalRequest] =
    useState(false);
  const [isShowInfor, setIsShowInfor] = useState(false);

  const [openDialogReject, setOpenDialogReject] = useState(false);
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    getEmployeeById(employeeId);
  }, []);

  useEffect(() => {
    setEmployee(employeeReducer);
  }, [employeeReducer]);

  const handleCloseDialog = () => {
    setOpenDialogApprove(false);
    setOpenDialogAdditionalRequest(false);
    setOpenDialogReject(false);
  };

  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={OpenDialogPending}
        onClose={() => handleClosePendingDialog()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Biểu mẫu </span>
          <IconButton
            className="iconClose"
            onClick={() => handleClosePendingDialog()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="pd-8 dialogContent">
          {(employeeReducer?.submitProfileStatus ===
            STATUS_EMPLOYEE.PENDING_STATUS.id.toString() ||
            isShowInfor) && (
            <FormEmployeeInfor
              employee={employee}
              certificatesDto={employee?.certificatesDto}
              employeeFamilyDtos={employee?.employeeFamilyDtos}
              isViewData={true}
            />
          )}
          {type && !isShowInfor && (
            <Letter
              type={type}
              salary={salary}
              process={process}
              proposal={proposal}
              employee={employee}
            />
          )}
          {employeeReducer?.submitProfileStatus ===
            STATUS_EMPLOYEE.PENDING_END_STATUS.id.toString() &&
            !isShowInfor && (
              <ResignationLetter employee={employee} isViewData={true} />
            )}
        </DialogContent>
        <DialogActions className="dialogActions">
          {employeeReducer?.submitProfileStatus !==
            STATUS_EMPLOYEE.PENDING_STATUS.id.toString() && (
            <Button
              variant="contained"
              className="green"
              onClick={() => setIsShowInfor(!isShowInfor)}
            >
              {!isShowInfor ? "Xem hồ sơ" : "Xem biểu mẫu"}
            </Button>
          )}

          <Button
            variant="contained"
            className="primary"
            onClick={() => setOpenDialogApprove(true)}
          >
            Phê duyệt
          </Button>
          <Button
            variant="contained"
            className="primary"
            onClick={() => setOpenDialogAdditionalRequest(true)}
          >
            Yêu cầu bổ sung
          </Button>
          <Button
            variant="contained"
            className="secondary"
            onClick={() => setOpenDialogReject(true)}
          >
            Từ chối
          </Button>

          <Button
            variant="contained"
            className="error"
            onClick={() => handleClosePendingDialog()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {openDialogApprove && (
        <ApprovalDialog
          employee={employee}
          setEmployee={setEmployee}
          openDialogApprove={openDialogApprove}
          handleCloseDialogApprove={handleCloseDialog}
          handleClosePendingDialog={handleClosePendingDialog}
          type={type}
          salary={salary}
          process={process}
          proposal={proposal}
        />
      )}

      {openDialogAdditionalRequest && (
        <AdditionalRequestDialog
          employee={employee}
          setEmployee={setEmployee}
          openDialogAdditionalRequest={openDialogAdditionalRequest}
          handleCloseAdditionalRequest={handleCloseDialog}
          handleClosePendingDialog={handleClosePendingDialog}
          type={type}
          salary={salary}
          process={process}
          proposal={proposal}
        />
      )}
      {openDialogReject && (
        <RejectDialog
          employee={employee}
          setEmployee={setEmployee}
          openDialogReject={openDialogReject}
          handleCloseReject={handleCloseDialog}
          handleClosePendingDialog={handleClosePendingDialog}
          type={type}
          salary={salary}
          process={process}
          proposal={proposal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  employeeReducer: state.employee.employee,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeeById: (id) => {
      dispatch(getEmployeeById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingDialog);
