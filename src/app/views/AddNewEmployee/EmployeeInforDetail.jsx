/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
import { getEmployeeById } from "app/redux/actions/EmployeeActions";
export const EmployeeInforDetail = (props) => {
  const {
    openEmployeeDetail,
    handleCloseViewDetails,
    employee,
    getEmployeeById,
    employeeReducer,
  } = props;

  useEffect(() => {
    getEmployeeById(employee?.id);
  }, []);
  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openEmployeeDetail}
        onClose={() => handleCloseViewDetails()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Thông tin hồ sơ</span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseViewDetails()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="pd-8 dialogContent">
          <FormEmployeeInfor
            employee={employee}
            certificatesDto={employeeReducer?.certificatesDto}
            employeeFamilyDtos={employeeReducer?.employeeFamilyDtos}
            isViewData={true}
          />
        </DialogContent>
        <DialogActions className="dialogActions">
          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseViewDetails()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeInforDetail);
