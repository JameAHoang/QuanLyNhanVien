/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Tab,
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import "../../../styles/views/_dialog.scss";
import "../../../styles/views/_style.scss";
import EmployeeInfor from "./FormInformation/EmployeeInfor";
import CertificateInfor from "./FormInformation/CertificateInfor";
import FamilyRelationshipInfor from "./FormInformation/FamilyRelationshipInfor";
import RegisterEmployee from "../RegisterEmployee/RegisterEmployee";
import { getCertificates } from "app/redux/actions/CertificateActions";
import { getFamilyRelationship } from "app/redux/actions/FamilyRelationshipActions";
import { formatImportDate } from "app/components/FormatDate/FormatDate";
import { toast } from "react-toastify";
import { updateEmployee } from "app/redux/actions/EmployeeActions";
import { STATUS_OF_ADD_EMPLOYEE, TAB_EMPLOYYEE } from "app/utils/Constants";

export const AddNewEmployeeDialog = (props) => {
  const {
    openDialogSubmit,
    handleCloseDialogSubmit,
    employee,
    setEmployee,
    getCertificateByEmployee,
    getFamilyRelationShipByEmployee,
    certificateReducer,
    familyRelationship,
    updateEmployee,
  } = props;
  const submitRef = useRef();
  const [employeeFamilyDtos, setEmployeeFamilyDtos] = useState([]);
  const [certificatesDto, setCertificatesDto] = useState([]);
  const [value, setValue] = useState(TAB_EMPLOYYEE.EMPLOYEE_INFOR.id);
  const [openDialogRegister, setOpenDialogRegister] = useState(false);

  const handleChangeTab = (event, newValue) => {
    if (employee?.id) {
      setValue(newValue);
    } else {
      toast.warning("Vui lòng thêm thông tin nhân viên");
    }
  };

  const handleOpenDialogRegister = () => {
    updateEmployee(employee, STATUS_OF_ADD_EMPLOYEE);
    setOpenDialogRegister(true);
  };
  const handleCloseDialogRegister = () => {
    setOpenDialogRegister(false);
  };

  useEffect(() => {
    if (employee?.id) {
      getCertificateByEmployee(employee?.id);
      getFamilyRelationShipByEmployee(employee?.id);
    }
  }, []);

  useEffect(() => {
    if (employee?.id) {
      handleGetCertificate();
    }
  }, [certificateReducer]);

  const handleGetCertificate = () => {
    const dataCertificate = certificateReducer;
    let resDataCertificate = [];
    if (dataCertificate.length > 0) {
      resDataCertificate = dataCertificate.map((item) => {
        return {
          ...item,
          issueDate: formatImportDate(item.issueDate),
        };
      });
    }
    setCertificatesDto(resDataCertificate);
  };

  useEffect(() => {
    if (employee?.id) {
      handleGetFamilyRelationship();
    }
  }, [familyRelationship]);

  const handleGetFamilyRelationship = () => {
    const dataFamilyRelationship = familyRelationship;
    let resDataEmployeeFamily = [];
    if (dataFamilyRelationship.length > 0) {
      resDataEmployeeFamily = dataFamilyRelationship.map((item) => {
        return {
          ...item,
          gender: item.gender.toString(),
          relationShip: item.relationShip.toString(),
          dateOfBirth: formatImportDate(item.dateOfBirth),
        };
      });
    }
    setEmployeeFamilyDtos(resDataEmployeeFamily);
  };

  const handleSubmit = () => {
    updateEmployee(employee, STATUS_OF_ADD_EMPLOYEE);
  };

  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openDialogSubmit}
        onClose={() => handleCloseDialogSubmit()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">
            {employee?.id ? "Sửa thông tin nhân viên" : "Thêm mới nhân viên"}
          </span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseDialogSubmit()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialogContent pd-none">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChangeTab} className="styleColor">
                <Tab
                  label="Thông tin nhân viên"
                  value={TAB_EMPLOYYEE.EMPLOYEE_INFOR.id}
                  className="tab"
                />
                <Tab
                  label="Thông tin chứng chỉ"
                  value={TAB_EMPLOYYEE.CETIFICATE.id}
                  className="tab"
                />
                <Tab
                  label="Quan hệ gia đình"
                  value={TAB_EMPLOYYEE.FAMILY_RELATIONSHIP.id}
                  className="tab"
                />
              </TabList>
            </Box>
            <TabPanel value={TAB_EMPLOYYEE.CETIFICATE.id}>
              <CertificateInfor
                employee={employee}
                setEmployee={setEmployee}
                certificatesDto={certificatesDto}
              />
            </TabPanel>
            <TabPanel value={TAB_EMPLOYYEE.FAMILY_RELATIONSHIP.id}>
              <FamilyRelationshipInfor
                employee={employee}
                setEmployee={setEmployee}
                employeeFamilyDtos={employeeFamilyDtos}
              />
            </TabPanel>
            <TabPanel value={TAB_EMPLOYYEE.EMPLOYEE_INFOR.id}>
              <EmployeeInfor
                employee={employee}
                setEmployee={setEmployee}
                submitRef={submitRef}
                employeeFamilyDtos={employeeFamilyDtos}
                certificatesDto={certificatesDto}
              />
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions className="dialogActions">
          <Button
            variant="contained"
            className="primary"
            type="submit"
            onClick={() =>
              value === TAB_EMPLOYYEE.EMPLOYEE_INFOR.id
                ? submitRef?.current.click()
                : handleSubmit()
            }
          >
            Lưu
          </Button>
          {employee?.id && (
            <Button
              variant="contained"
              className="secondary"
              onClick={() => handleOpenDialogRegister()}
            >
              Đăng ký
            </Button>
          )}
          <Button
            variant="contained"
            className="error"
            onClick={() => handleCloseDialogSubmit()}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {openDialogRegister && (
        <RegisterEmployee
          employee={employee}
          setEmployee={setEmployee}
          openDialogRegister={openDialogRegister}
          handleCloseDialogRegister={handleCloseDialogRegister}
          handleCloseEmployeeDialogSubmit={handleCloseDialogSubmit}
          certificatesDto={certificatesDto}
          employeeFamilyDtos={employeeFamilyDtos}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  certificateReducer: state.certificate.listCertificate,
  familyRelationship: state.family.listFamilyRelationship,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCertificateByEmployee: (id) => {
      dispatch(getCertificates(id));
    },
    getFamilyRelationShipByEmployee: (id) => {
      dispatch(getFamilyRelationship(id));
    },
    updateEmployee: (data, status) => dispatch(updateEmployee(data, status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewEmployeeDialog);
