import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Grid, IconButton, Icon } from "@material-ui/core";
import "../../../../styles/views/_certificate-infor.scss";
import "../../../../styles/views/_style.scss";
import "../../../../styles/views/_dialog.scss";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../components/Validate/Validate";
import { ConfirmationDialog } from "egret";
import { formatExportDate } from "app/components/FormatDate/FormatDate";
import {
  createCertificate,
  deleteCertificate,
  updateCertificate,
} from "app/redux/actions/CertificateActions";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
export const CertificateInfor = (props) => {
  const {
    certificatesDto,
    employee,
    createCertificate,
    updateCertificate,
    deleteCertificate,
  } = props;
  const [certificate, setCertificate] = useState({});
  const [isEditCertificate, setIsEditCertificate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [certificateId, setCertificateId] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCertificate({
      ...certificate,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (isEditCertificate) {
      updateCertificate(certificate);
    } else {
      createCertificate(employee?.id, [certificate]);
    }
    handleReset();
  };

  const handleUpdateCertificate = (data) => {
    setCertificate(data);
    setIsEditCertificate(true);
  };

  const handleOpenDeleteCertificate = (data) => {
    setIsDelete(true);
    setCertificateId(data);
  };

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  const handleDeleteCertificate = () => {
    deleteCertificate(certificateId.id);
    handleReset();
    handleCloseDeleteDialog();
  };

  const handleReset = () => {
    setCertificate({});
    setIsEditCertificate(false);
  };

  let columns = [
    {
      title: "STT",
      width: "10%",
      align: "center",
      render: (data) => data.tableData.id + 1,
    },
    {
      title: "Thao tác",
      field: "custom",
      width: "10%",
      align: "center",
      render: (data) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() => {
                handleUpdateCertificate(data);
              }}
            >
              <Icon color="primary">edit</Icon>
            </IconButton>

            <IconButton
              size="small"
              onClick={() => {
                handleOpenDeleteCertificate(data);
              }}
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          </>
        );
      },
    },

    {
      title: "Tên chứng chỉ",
      field: "certificateName",
      width: "20%",
      align: "center",
    },
    {
      title: "Lĩnh vực",
      field: "field",
      width: "20%",
      align: "center",
    },

    {
      title: "Nội dung",
      field: "content",
      width: "20%",
      align: "center",
    },
    {
      title: "Ngày cấp",
      field: "issueDate",
      width: "20%",
      align: "center",

      render: (data) => formatExportDate(data?.issueDate),
    },
  ];
  return (
    <>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Tên chứng chỉ
                </span>
              }
              type="text"
              placeholder="Nhập tên chứng chỉ"
              value={certificate?.certificateName || ""}
              name="certificateName"
              size="small"
              validators={["required"]}
              errorMessages={["Tên chứng chỉ không được để trống"]}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Lĩnh vực
                </span>
              }
              type="text"
              placeholder="Nhập lĩnh vực"
              value={certificate?.field || ""}
              name="field"
              size="small"
              validators={["required", "maxStringLength:60"]}
              errorMessages={[
                "Lĩnh vực không được để trống",
                "Lĩnh vực không được quá 60 ký tự",
              ]}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Nội dung
                </span>
              }
              type="text"
              placeholder="Nhập nội dung"
              value={certificate?.content || ""}
              name="content"
              size="small"
              validators={["required", "maxStringLength:500"]}
              errorMessages={[
                "Nội dung không được để trống",
                "Nội dung không được quá 500 ký tự",
              ]}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Ngày cấp
                </span>
              }
              type="date"
              value={certificate?.issueDate || ""}
              name="issueDate"
              size="small"
              validators={["required", "isStartDateValid"]}
              errorMessages={[
                "Ngày cấp không được để trống",
                "Ngày cấp không được là ngày tương lai",
              ]}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item lg={2} md={2} sm={12} xs={12} className="dialogActions">
            <Button variant="contained" className="primary mr-8" type="submit">
              Lưu
            </Button>
            <Button
              variant="contained"
              onClick={() => handleReset()}
              className=" error"
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>

      <MaterialTableCustom
        title={false}
        data={certificatesDto}
        columns={columns}
        dialog={true}
        height="300x"
        search={true}
        paging={true}
      />

      {isDelete && (
        <ConfirmationDialog
          title={"Xác nhận xóa"}
          open={isDelete}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDeleteCertificate}
          text={"Bạn chắc chắn muốn xóa chứng chỉ ?"}
          Yes={"Xác nhận"}
          No={"Hủy"}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    createCertificate: (employeeId, certificate) =>
      dispatch(createCertificate(employeeId, certificate)),
    updateCertificate: (certificate) =>
      dispatch(updateCertificate(certificate)),
    deleteCertificate: (id) => dispatch(deleteCertificate(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificateInfor);
