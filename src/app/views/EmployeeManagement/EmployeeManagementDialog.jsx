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
} from "@material-ui/core";
import FormEmployeeInfor from "app/components/FormEmployeeInfor/FormEmployeeInfor";
import UpdateEmployeeProgress from "./UpdateEmployeeProgress";
import EndFormDialog from "./EndFormDialog";
import EmployeeInforDetail from "../AddNewEmployee/EmployeeInforDetail";
import { STATUS_EMPLOYEE } from "app/utils/Constants";
export const EmployeeManagementDialog = (props) => {
  const { openEmployeeDialog, handleCloseEmployeeDialog, employee, type } =
    props;
  const [openEmployeeEndDialog, setOpenEmployeeEndDialog] = useState(false);
  const [openEmployeeDetail, setOpenEmployeeDetail] = useState(false);
  const [isViewData, setIsViewData] = useState(false);

  const handleOpenEmployeeEndDialog = (type) => {
    if (type === "watch") {
      setIsViewData(true);
    }
    setOpenEmployeeEndDialog(true);
  };

  const handleCloseEmployeeEndDialog = () => {
    setOpenEmployeeEndDialog(false);
  };
  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openEmployeeDialog}
        onClose={() => handleCloseEmployeeDialog()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">
            {type ? "Cập nhât diễn biến" : "Thông tin hồ sơ"}
          </span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseEmployeeDialog()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="pd-8 dialogContent">
          {type ? (
            <UpdateEmployeeProgress employee={employee} />
          ) : (
            <FormEmployeeInfor
              employee={employee}
              certificatesDto={employee?.certificatesDto}
              employeeFamilyDtos={employee?.employeeFamilyDtos}
              isViewData={true}
            />
          )}
        </DialogContent>
        <DialogActions className="dialogActions">
          {type && (
            <>
              <Button
                variant="contained"
                className="green"
                onClick={() => setOpenEmployeeDetail(true)}
              >
                Xem hồ sơ
              </Button>
              {STATUS_EMPLOYEE.PENDING_END_STATUS.id
                .toString()
                .includes(employee?.submitProfileStatus) ? (
                <Button
                  variant="contained"
                  className="primary"
                  onClick={() => handleOpenEmployeeEndDialog("watch")}
                >
                  Biểu mẫu kết thúc
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="primary"
                  onClick={() => handleOpenEmployeeEndDialog("")}
                >
                  Kết thúc
                </Button>
              )}
            </>
          )}

          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseEmployeeDialog()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {openEmployeeEndDialog && (
        <EndFormDialog
          openEmployeeEndDialog={openEmployeeEndDialog}
          handleCloseEmployeeEndDialog={handleCloseEmployeeEndDialog}
          handleCloseEmployeeDialog={handleCloseEmployeeDialog}
          employee={employee}
          isViewData={isViewData}
        />
      )}

      {openEmployeeDetail && (
        <EmployeeInforDetail
          employee={employee}
          openEmployeeDetail={openEmployeeDetail}
          handleCloseViewDetails={() => setOpenEmployeeDetail(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeManagementDialog);
