import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Box, Tab } from "@material-ui/core";
import Profile from "app/views/RegisterEmployee/FormRegisterEmployee/Profile";
import Resume from "app/views/RegisterEmployee/FormRegisterEmployee/Resume";
import Diploma from "app/views/RegisterEmployee/FormRegisterEmployee/Diploma";
import "../../../styles/views/_dialog.scss";
import "../../../styles/views/_register-employee.scss";
import { TAB_REGISTER_EMPLOYEE } from "app/utils/Constants";

export const FormEmployeeInfor = (props) => {
  const {
    employee,
    setEmployee,
    certificatesDto,
    employeeFamilyDtos,
    submitRef,
    isViewData,
  } = props;
  const [value, setValue] = useState(TAB_REGISTER_EMPLOYEE.PROFILE.id);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1300);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Kiểm tra ban đầu khi component được mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TabContext value={value}>
      <Box sx={{ borderRight: 1, borderColor: "divider" }} className="box">
        <TabList
          className="tabList"
          orientation={isDesktop ? "vertical" : "divider"}
          variant="scrollable"
          onChange={handleChangeTab}
        >
          <Tab
            label="Hồ sơ"
            value={TAB_REGISTER_EMPLOYEE.PROFILE.id}
            className="tab"
          />
          <Tab
            label="Sơ yếu lý lịch"
            value={TAB_REGISTER_EMPLOYEE.RESUME.id}
            className="tab"
          />
          <Tab
            label="Văn bằng"
            value={TAB_REGISTER_EMPLOYEE.DIPLOMA.id}
            className="tab"
          />
        </TabList>

        <TabPanel value={TAB_REGISTER_EMPLOYEE.PROFILE.id} className="tabPanel">
          <Profile
            employee={employee}
            setEmployee={setEmployee}
            submitRef={submitRef}
            isViewData={isViewData}
          />
        </TabPanel>
        <TabPanel value={TAB_REGISTER_EMPLOYEE.RESUME.id} className="tabPanel">
          <Resume employeeFamilyDtos={employeeFamilyDtos} employee={employee} />
        </TabPanel>
        <TabPanel value={TAB_REGISTER_EMPLOYEE.DIPLOMA.id} className="tabPanel">
          <Diploma certificatesDto={certificatesDto} />
        </TabPanel>
      </Box>
    </TabContext>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FormEmployeeInfor);
