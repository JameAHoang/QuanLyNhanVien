/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Box, Tab } from "@material-ui/core";
import SalaryIncrease from "./SalaryIncrease";
import Process from "./Process";
import Proposal from "./Proposal";
import { getLeaders } from "app/redux/actions/LeaderActions";
import "../../../../styles/views/_form-update-progress.scss";
import { TAB_UPDATE_PROGRESS } from "app/utils/Constants";
export const FormUpdateProgress = (props) => {
  const { getLeaders, employee, isViewData } = props;
  const [value, setValue] = useState(TAB_UPDATE_PROGRESS.SALARY_INCREASE.id);

  useEffect(() => {
    getLeaders();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="boxProgress"
      >
        <TabList onChange={handleChangeTab}>
          <Tab
            label="Tăng lương"
            value={TAB_UPDATE_PROGRESS.SALARY_INCREASE.id}
            className="tabProgress"
          />
          <Tab
            label="Thăng chức"
            value={TAB_UPDATE_PROGRESS.PROCESS.id}
            className="tabProgress"
          />
          <Tab
            label="Đề xuất tham mưu"
            value={TAB_UPDATE_PROGRESS.PROPOSAL.id}
            className="tabProgress"
          />
        </TabList>
      </Box>
      <TabPanel value={TAB_UPDATE_PROGRESS.SALARY_INCREASE.id}>
        <SalaryIncrease employee={employee} isViewData={isViewData} />
      </TabPanel>
      <TabPanel value={TAB_UPDATE_PROGRESS.PROCESS.id}>
        <Process employee={employee} isViewData={isViewData} />
      </TabPanel>
      <TabPanel value={TAB_UPDATE_PROGRESS.PROPOSAL.id}>
        <Proposal employee={employee} isViewData={isViewData} />
      </TabPanel>
    </TabContext>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    getLeaders: () => dispatch(getLeaders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdateProgress);
