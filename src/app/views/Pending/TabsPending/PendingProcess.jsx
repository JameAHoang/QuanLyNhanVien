/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PROCESS_PENDING, SUCCESS } from "app/utils/Constants";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import { getProcessByCurrentLeader } from "app/services/ProcessServices";
import PendingDialog from "../PendingDialog";
import ColumnsProcess from "app/components/ColumnsCusTom/ColumnsProcess";

export const PendingProcess = (props) => {
  const { listProcess } = props;
  const type = "process";
  const [OpenDialogPending, setOpenDialogPending] = useState(false);
  const [employeeId, setEmployeeId] = useState({});
  const [process, setProcess] = useState({});
  const [Processes, setProcesses] = useState([]);

  useEffect(() => {
    handleGetProcessByCurrentLeader();
  }, [listProcess]);

  const handleOpenPendingDialog = (data) => {
    setProcess(data);
    setEmployeeId(data?.employeeId);
    setOpenDialogPending(true);
  };

  const handleClosePendingDialog = () => {
    setOpenDialogPending(false);
  };

  const handleGetProcessByCurrentLeader = async () => {
    const res = await getProcessByCurrentLeader();
    if (res?.data?.code === SUCCESS) {
      setProcesses(res?.data?.data);
    }
  };

  const columns = ColumnsProcess({
    status: PROCESS_PENDING,
    handleOpenPendingDialog: handleOpenPendingDialog,
  });

  return (
    <div className="m-sm-30" style={{ marginBottom: "10px" }}>
      <MaterialTableCustom
        title={" Danh sách chờ duyệt thăng chức"}
        columns={columns}
        data={Processes}
        height={"550px"}
        search={true}
        paging={true}
      />
      {OpenDialogPending && (
        <PendingDialog
          OpenDialogPending={OpenDialogPending}
          handleClosePendingDialog={handleClosePendingDialog}
          employeeId={employeeId}
          type={type}
          process={process}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  listProcess: state.process.listProcess,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingProcess);
