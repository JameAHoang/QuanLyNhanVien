import React from "react";

import { Icon, IconButton } from "@material-ui/core";

import { formatExportDate } from "../FormatDate/FormatDate";
import {
  DELETE_STATUS,
  EDIT_STATUS,
  GENDER,
  STATUSES,
  STATUS_OF_ADD_EMPLOYEE,
  STATUS_OF_APPROVED,
  STATUS_OF_EMPLOYEE_END,
  STATUS_OF_EMPLOYEE_MANAGEMEMNT,
  STATUS_OF_PENDING,
  VISIBILITY_STATUS,
} from "app/utils/Constants";

const ColumnsEmployee = ({
  status,
  handleOpenDialogSubmit,
  handleOpenDeleteDialog,
  handleViewDetails,
  handleOpenEmployeeDialog,
  handleOpenDialogEmployeeEnd,
  handleOpenPendingDialog,
  handleOpenDialogApproved,
}) => {
  const ActionButtons = ({ data, status }) => {
    switch (status) {
      case STATUS_OF_ADD_EMPLOYEE:
        return (
          <>
            {EDIT_STATUS.toString().includes(data?.submitProfileStatus) && (
              <IconButton
                size="small"
                onClick={() => {
                  handleOpenDialogSubmit(data);
                }}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            )}
            {DELETE_STATUS.toString().includes(data?.submitProfileStatus) && (
              <IconButton
                size="small"
                onClick={() => {
                  handleOpenDeleteDialog(data.id);
                }}
              >
                <Icon color="error">delete</Icon>
              </IconButton>
            )}
            {VISIBILITY_STATUS.toString().includes(
              data?.submitProfileStatus
            ) && (
              <IconButton size="small" onClick={() => handleViewDetails(data)}>
                <Icon color="inherit">visibility</Icon>
              </IconButton>
            )}
          </>
        );

      case STATUS_OF_EMPLOYEE_MANAGEMEMNT:
        return (
          <>
            <IconButton
              size="small"
              onClick={() => handleOpenEmployeeDialog(data, "update")}
            >
              <Icon color="primary">update</Icon>
            </IconButton>

            <IconButton
              size="small"
              onClick={() => handleOpenEmployeeDialog(data, "watch")}
            >
              <Icon color="inherit">visibility</Icon>
            </IconButton>
          </>
        );

      case STATUS_OF_EMPLOYEE_END:
        return (
          <>
            <IconButton
              size="small"
              onClick={() => handleOpenDialogEmployeeEnd(data)}
            >
              <Icon color="inherit">visibility</Icon>
            </IconButton>
          </>
        );

      case STATUS_OF_PENDING:
        return (
          <>
            {STATUS_OF_PENDING.toString().includes(
              data?.submitProfileStatus
            ) && (
              <IconButton
                size="small"
                onClick={() => handleOpenPendingDialog(data)}
              >
                <Icon color="inherit">visibility</Icon>
              </IconButton>
            )}
          </>
        );

      case STATUS_OF_APPROVED:
        return (
          <>
            <IconButton
              size="small"
              onClick={() => handleOpenDialogApproved(data)}
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
      title: "Thao tác",
      field: "custom",
      width: "10%",
      align: "center",
      render: (data) => <ActionButtons data={data} status={status} />,
    },
    { title: "Họ và Tên", field: "name", width: "20%", align: "left" },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      width: "10%",
      align: "center",
      render: (data) => formatExportDate(data.dateOfBirth),
    },
    {
      title: "Giới tính",
      field: "gender",
      width: "10%",
      align: "center",

      render: (data) =>
        GENDER.find((item) => item.id === data.gender.toString())?.name,
    },
    {
      title: "Số điện thoại",
      field: "phone",
      width: "10%",
      align: "center",
    },
    {
      title: "Căn cước công dân",
      field: "citizenIdentificationNumber",
      width: "10%",
      align: "center",
    },
    {
      title: "Trạng thái",
      field: "submitProfileStatus",
      width: "20%",
      align: "left",
      render: (data) =>
        STATUSES.find((item) => item.id === +data.submitProfileStatus)?.name,
    },
  ];
  return columns;
};
export default ColumnsEmployee;
