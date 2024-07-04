/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { formatImportDate } from "app/components/FormatDate/FormatDate";
import { SALARY_INCREASE_PENDING, SUCCESS } from "app/utils/Constants";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import { getSalaryByCurrentLeader } from "app/services/SalaryIncreaseServices";
import PendingDialog from "../PendingDialog";
import ColumnsSalaryIncrease from "app/components/ColumnsCusTom/ColumnsSalaryIncrease";

export const PendingSalaryIncrease = (props) => {
  const type = "salary";
  const { listSalaryIncrease } = props;
  const [OpenDialogPending, setOpenDialogPending] = useState(false);
  const [employeeId, setEmployeeId] = useState({});
  const [salary, setSalary] = useState({});
  const [salaryIncreases, setSalaryIncreases] = useState([]);
  useEffect(() => {
    handleGetSalaryByCurrentLeader();
  }, [listSalaryIncrease]);

  const handleOpenPendingDialog = (data) => {
    setSalary(data);
    setEmployeeId(data?.employeeId);
    setOpenDialogPending(true);
  };

  const handleClosePendingDialog = () => {
    setOpenDialogPending(false);
  };

  const handleGetSalaryByCurrentLeader = async () => {
    const res = await getSalaryByCurrentLeader();
    if (res?.data?.code === SUCCESS) {
      const dataSalaryIncrease = res?.data?.data;
      let resDataSalaryIncrease = [];
      if (dataSalaryIncrease.length > 0) {
        resDataSalaryIncrease = dataSalaryIncrease.map((item) => {
          return {
            ...item,
            startDate: formatImportDate(item.startDate),
          };
        });
      }
      setSalaryIncreases(resDataSalaryIncrease);
    }
  };

  const columns = ColumnsSalaryIncrease({
    status: SALARY_INCREASE_PENDING,
    handleOpenPendingDialog: handleOpenPendingDialog,
  });

  return (
    <div className="m-sm-30" style={{ marginBottom: "10px" }}>
      <MaterialTableCustom
        title={" Danh sách chờ duyệt tăng lương"}
        columns={columns}
        data={salaryIncreases}
        height={"550px"}
        search={true}
        paging={true}
      />
      {OpenDialogPending && (
        <PendingDialog
          OpenDialogPending={OpenDialogPending}
          handleClosePendingDialog={handleClosePendingDialog}
          employeeId={employeeId}
          salary={salary}
          type={type}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  listSalaryIncrease: state.salary.listSalaryIncrease,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingSalaryIncrease);
