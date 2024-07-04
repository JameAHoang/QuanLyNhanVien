import React from "react";

import { Icon, IconButton } from "@material-ui/core";

import { formatExportDate } from "../FormatDate/FormatDate";
import {
  DELETE_STATUS_PROGRESS_EMPLOYYEE,
  LIST_POSITION,
  PROCESS_PENDING,
  PROCESS_UPDATE_PROGRESS,
  STATUS_OF_ADDITIONAL_REQUEST,
  UPDATE_STATUS_PROGRESS_EMPLOYYEE,
} from "app/utils/Constants";

const ColumnsProcess = ({
  status,
  isViewData,
  handleOpenLetterDialog,
  handleUpdateProcess,
  handleOpenDeleteDialog,
  handleOpenPendingDialog,
}) => {
  const ActionButtons = ({ data, status, isViewData }) => {
    switch (status) {
      case PROCESS_UPDATE_PROGRESS:
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
                  data?.processStatus
                ) && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateProcess(data)}
                    >
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </>
                )}

                {DELETE_STATUS_PROGRESS_EMPLOYYEE.includes(
                  data?.processStatus
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
      case PROCESS_PENDING:
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
      render: (data) => (
        <ActionButtons data={data} status={status} isViewData={isViewData} />
      ),
      width: "10%",
    },
    {
      title: "Ngày thăng chức",
      field: "promotionDay",
      render: (data) => formatExportDate(data?.promotionDay),
      width: "10%",
      align: "center",
    },
    {
      title: "Vị trí hiện tại",
      field: "currentPosition",
      width: "10%",
      align: "center",

      render: (data) =>
        LIST_POSITION.find((item) => item.id === data?.currentPosition)?.name,
    },
    {
      title: "Vị trí mới",
      field: "newPosition",
      width: "30%",
      align: "center",

      render: (data) =>
        LIST_POSITION.find((item) => +item.id === data?.newPosition)?.name,
    },
    {
      title: "Ghi chú",
      field: "note",
      width: "30%",
      align: "center",
    },
    {
      title: "Trạng thái",
      field: "processStatus",
      width: "10%",
      align: "left",

      render: (data) =>
        STATUS_OF_ADDITIONAL_REQUEST.find(
          (item) => item?.id.toString() === data?.processStatus
        )?.name,
    },
  ];
  return columns;
};
export default ColumnsProcess;
