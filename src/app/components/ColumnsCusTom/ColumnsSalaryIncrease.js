import React from "react";

import { Icon, IconButton } from "@material-ui/core";

import { formatExportDate } from "../FormatDate/FormatDate";
import {
  DELETE_STATUS_PROGRESS_EMPLOYYEE,
  SALARY_INCREASE_PENDING,
  SALARY_INCREASE_UPDATE_PROGRESS,
  STATUS_OF_ADDITIONAL_REQUEST,
  UPDATE_STATUS_PROGRESS_EMPLOYYEE,
} from "app/utils/Constants";

const ColumnsSalaryIncrease = ({
  status,
  isViewData,
  handleOpenLetterDialog,
  handleUpdateSalaryIncrease,
  handleOpenDeleteDialog,
  handleOpenPendingDialog,
}) => {
  const ActionButtons = ({ data, status, isViewData }) => {
    switch (status) {
      case SALARY_INCREASE_UPDATE_PROGRESS:
        return (
          <>
            {isViewData ? null : (
              <>
                <IconButton
                  size="small"
                  onClick={() => handleOpenLetterDialog(data)}
                >
                  <Icon color="inherit">visibility</Icon>
                </IconButton>
                {UPDATE_STATUS_PROGRESS_EMPLOYYEE.includes(
                  data?.salaryIncreaseStatus
                ) && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateSalaryIncrease(data)}
                    >
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </>
                )}
                {DELETE_STATUS_PROGRESS_EMPLOYYEE.includes(
                  data?.salaryIncreaseStatus
                ) && (
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDeleteDialog(data.id)}
                  >
                    <Icon color="error">delete</Icon>
                  </IconButton>
                )}
              </>
            )}
          </>
        );
      case SALARY_INCREASE_PENDING:
        return (
          <>
            <IconButton
              size="small"
              onClick={() => handleOpenPendingDialog(data)}
            >
              <Icon color="inherit">visibility</Icon>
            </IconButton>
          </>
        );
      default:
        return null;
    }
  };

  const columns = [
    {
      title: "STT",
      render: (data) => data.tableData.id + 1,
      width: "10%",
      align: "center",
    },
    {
      title: "Thao tác",
      field: "action",
      align: "center",
      width: "10%",
      render: (data) => (
        <ActionButtons data={data} status={status} isViewData={isViewData} />
      ),
    },

    { title: "Lương cũ", field: "oldSalary", width: "10%", align: "center" },
    {
      title: "Lương mới",
      field: "newSalary",
      width: "10%",
      align: "center",
    },
    {
      title: "Ngày tăng lương",
      field: "startDate",
      render: (data) => formatExportDate(data?.startDate),
      width: "10%",
      align: "center",
    },
    {
      title: "Lý do",
      field: "reason",
      width: "20%",
      align: "center",
    },
    {
      title: "Ghi chú",
      field: "note",
      width: "30%",
      align: "center",
    },
    {
      title: "Trạng thái",
      field: "salaryIncreaseStatus",
      width: "10%",
      align: "left",
      render: (data) =>
        STATUS_OF_ADDITIONAL_REQUEST.find(
          (item) => item.id === data?.salaryIncreaseStatus
        )?.name,
    },
  ];
  return columns;
};
export default ColumnsSalaryIncrease;
