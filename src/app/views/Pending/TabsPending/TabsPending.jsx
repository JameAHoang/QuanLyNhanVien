import React, { useState } from "react";
import { connect } from "react-redux";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Box, Tab } from "@material-ui/core";
import Pending from "../Pending";
import PendingSalaryIncrease from "./PendingSalaryIncrease";
import PendingProcess from "./PendingProcess";
import PendingProposal from "./PendingProposal";
import { TAB_PENDING } from "app/utils/Constants";
export const TabsPending = (props) => {
  const [value, setValue] = useState(TAB_PENDING.PENDING.id);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChangeTab}>
          <Tab
            label="Chờ duyệt"
            value={TAB_PENDING.PENDING.id}
            className="tab"
          />
          <Tab
            label="Chờ duyệt tăng lương"
            value={TAB_PENDING.PENDING_SALARY_INCREASE.id}
            className="tab"
          />
          <Tab
            label="Chờ duyệt thăng chức"
            value={TAB_PENDING.PENDING_PROCESS.id}
            className="tab"
          />
          <Tab
            label="Chờ duyệt đề xuất tham mưu"
            value={TAB_PENDING.PENDING_PROPOSAL.id}
            className="tab"
          />
        </TabList>
      </Box>
      <TabPanel value={TAB_PENDING.PENDING.id}>
        <Pending />
      </TabPanel>
      <TabPanel value={TAB_PENDING.PENDING_SALARY_INCREASE.id}>
        <PendingSalaryIncrease />
      </TabPanel>
      <TabPanel value={TAB_PENDING.PENDING_PROCESS.id}>
        <PendingProcess />
      </TabPanel>
      <TabPanel value={TAB_PENDING.PENDING_PROPOSAL.id}>
        <PendingProposal />
      </TabPanel>
    </TabContext>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TabsPending);
