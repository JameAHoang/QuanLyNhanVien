import React from "react";

import { Icon, IconButton } from "@material-ui/core";

import { formatExportDate } from "../FormatDate/FormatDate";
import {
  DELETE_STATUS_PROGRESS_EMPLOYYEE,
  PROPOSAL_PENDING,
  PROPOSAL_UPDATE_PROGRESS,
  STATUS_OF_ADDITIONAL_REQUEST,
  TYPE_OF_PROPOSAL,
  UPDATE_STATUS_PROGRESS_EMPLOYYEE,
} from "app/utils/Constants";

const ColumnsProposal = ({
  status,
  isViewData,
  handleOpenLetterDialog,
  handleUpdateProposal,
  handleOpenDeleteDialog,
  handleOpenPendingDialog,
}) => {
  const ActionButtons = ({ data, status, isViewData }) => {
    switch (status) {
      case PROPOSAL_UPDATE_PROGRESS:
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
                  data?.proposalStatus
                ) && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateProposal(data)}
                    >
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </>
                )}
                {DELETE_STATUS_PROGRESS_EMPLOYYEE.includes(
                  data?.proposalStatus
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
      case PROPOSAL_PENDING:
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
      title: "Ngày diễn biến",
      field: "proposalDate",
      render: (data) => formatExportDate(data?.proposalDate),
      width: "10%",
      align: "center",
    },
    {
      title: "Loại",
      field: "type",
      width: "10%",
      align: "center",

      render: (data) =>
        TYPE_OF_PROPOSAL.find((item) => item.id === data?.type)?.name,
    },
    {
      title: "Nội dung",
      field: "content",
      width: "30%",
      align: "center",
    },
    {
      title: "Mô tả chi tiết",
      field: "detailedDescription",
      width: "10%",
      align: "center",
    },
    {
      title: "Ghi chú",
      field: "note",
      width: "30%",
      align: "center",
    },
    {
      title: "Trạng thái",
      field: "proposalStatus",
      width: "10%",
      align: "left",
      render: (data) =>
        STATUS_OF_ADDITIONAL_REQUEST.find(
          (item) => item.id === data?.proposalStatus
        )?.name,
    },
  ];
  return columns;
};
export default ColumnsProposal;
