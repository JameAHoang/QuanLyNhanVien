import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  IconButton,
  Icon,
} from "@material-ui/core";
import { GENDER, RELATIONSHIP } from "app/utils/Constants";

import "../../../../styles/views/_style.scss";
import "../../../../styles/views/_dialog.scss";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmationDialog } from "egret";
import {
  createFamilyRelationship,
  deleteFamilyRelationship,
  updateFamilyRelationship,
} from "app/redux/actions/FamilyRelationshipActions";
import { formatExportDate } from "app/components/FormatDate/FormatDate";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

export const FamilyRelationshipInfor = (props) => {
  const {
    employee,
    employeeFamilyDtos,
    createFamilyRelationShip,
    updateFamilyRelationShip,
    deleteFamilyRelationShip,
  } = props;
  const [employeeFamily, setEmployeeFamily] = useState([]);
  const [isEditEmployeeFamily, setIsEditEmployeeFamily] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [employeeFamilyId, setEmployeeFamilyId] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEmployeeFamily({
      ...employeeFamily,
      [name]: value,
    });
  };

  const handleUpdateFamilyRelationShip = (data) => {
    setEmployeeFamily(data);
    setIsEditEmployeeFamily(true);
  };

  const handleSubmit = () => {
    if (isEditEmployeeFamily) {
      updateFamilyRelationShip(employeeFamily);
    } else {
      createFamilyRelationShip(employee?.id, [employeeFamily]);
    }
    handleReset();
  };

  const handleReset = () => {
    setEmployeeFamily({});
    setIsEditEmployeeFamily(false);
  };

  const handleOpenDeleteFamilyRelationship = (data) => {
    setIsDelete(true);
    setEmployeeFamilyId(data);
  };

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  const handleDeleteEmployeeFamily = () => {
    deleteFamilyRelationShip(employeeFamilyId?.id);
    handleCloseDeleteDialog();
    handleReset();
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
      width: "250",
      align: "center",

      render: (data) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() => {
                handleUpdateFamilyRelationShip(data);
              }}
            >
              <Icon color="primary">edit</Icon>
            </IconButton>

            <IconButton
              size="small"
              onClick={() => {
                handleOpenDeleteFamilyRelationship(data);
              }}
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          </>
        );
      },
    },
    { title: "Tên", field: "name", width: "150", align: "center" },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      width: "150",
      align: "center",

      render: (data) => formatExportDate(data?.dateOfBirth),
    },
    {
      title: "Giới tính",
      field: "gender",
      width: "150",
      align: "center",

      render: (data) =>
        GENDER.find((item) => item.id === data?.gender.toString())?.name,
    },
    {
      title: "Mối quan hệ",
      field: "relationShip",
      width: "150",
      align: "center",

      render: (data) =>
        RELATIONSHIP.find((item) => item.id === data?.relationShip.toString())
          ?.name,
    },
    {
      title: "Căn cước công dân",
      field: "citizenIdentificationNumber",
      width: "150",
      align: "center",
    },
    {
      title: "Số điện thoại",
      field: "phoneNumber",
      width: "150",
      align: "center",
    },
    {
      title: "Địa chỉ",
      field: "address",
      width: "150",
      align: "center",
    },
  ];

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Tên
                </span>
              }
              type="text"
              value={employeeFamily?.name || ""}
              name="name"
              size="small"
              placeholder="VD: Nguyễn Văn Anh"
              validators={[
                "required",
                'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                "maxStringLength:30",
              ]}
              errorMessages={[
                "Tên không được để trống",
                "Tên không chứa số và kí tự đặc biệt",
                "Tên không được quá 30 ký tự",
              ]}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Email
                </span>
              }
              type="email"
              placeholder="VD: nguyenvananh@gmail.com"
              value={employeeFamily?.email || ""}
              name="email"
              size="small"
              validators={["required", "isEmail"]}
              errorMessages={[
                "Email không được để trống",
                "Email không đúng định dạng",
              ]}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <SelectValidator
                className="w-100"
                variant="outlined"
                size="small"
                label={
                  <span className="font">
                    <span className="red"> * </span>
                    Giới tính
                  </span>
                }
                value={employeeFamily?.gender || ""}
                name="gender"
                validators={["required"]}
                errorMessages={["Giới tính không được bỏ trống"]}
                onChange={handleOnChange}
              >
                {GENDER &&
                  GENDER.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </SelectValidator>
            </FormControl>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Ngày sinh
                </span>
              }
              type="date"
              value={employeeFamily?.dateOfBirth || ""}
              name="dateOfBirth"
              size="small"
              validators={["required", "isStartDateValid"]}
              errorMessages={[
                "Ngày sinh không được để trống",
                "Ngày sinh không được là ngày tương lai",
              ]}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Căn cước công dân
                </span>
              }
              type="text"
              placeholder="VD: 001099005326"
              value={employeeFamily?.citizenIdentificationNumber || ""}
              name="citizenIdentificationNumber"
              size="small"
              validators={["required", "matchRegexp:^(?:\\d{9}|\\d{12})$"]}
              errorMessages={[
                "CCCD không được để trống",
                "CCCD phải là 9 hoặc 12 số",
              ]}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Địa chỉ
                </span>
              }
              type="text"
              placeholder="467 Nguyễn Trãi - Thanh Xuân - Hà Nội"
              value={employeeFamily?.address || ""}
              name="address"
              size="small"
              validators={["required", "maxStringLength:60"]}
              errorMessages={[
                "Địa chỉ không được để trống",
                "Địa chỉ không được quá 60 ký tự",
              ]}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Số điện thoại
                </span>
              }
              type="text"
              placeholder="VD: 0985092425"
              value={employeeFamily?.phoneNumber || ""}
              name="phoneNumber"
              size="small"
              validators={["required", "matchRegexp:^0[0-9]{9,10}$"]}
              errorMessages={[
                "Số điện thoại không được để trống",
                "Số điện thoại chưa đúng định dạng",
              ]}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item lg={2} md={2} sm={12} xs={12}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <SelectValidator
                className="w-100"
                variant="outlined"
                size="small"
                label={
                  <span className="font">
                    <span className="red"> * </span>
                    Mối quan hệ
                  </span>
                }
                value={employeeFamily?.relationShip || ""}
                name="relationShip"
                validators={["required"]}
                errorMessages={["Mối quan hệ không được bỏ trống"]}
                onChange={handleOnChange}
              >
                {RELATIONSHIP &&
                  RELATIONSHIP.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </SelectValidator>
            </FormControl>
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
        data={employeeFamilyDtos}
        columns={columns}
        dialog={true}
        height="300px"
        search={true}
        paging={true}
      />

      {isDelete && (
        <ConfirmationDialog
          title={"Xác nhận xóa"}
          open={isDelete}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDeleteEmployeeFamily}
          text={"Bạn chắc chắn muốn xóa quan hệ gia đình ?"}
          Yes={"Xác nhận"}
          No={"Hủy"}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  familyRelationship: state.family.listFamilyRelationship,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createFamilyRelationShip: (employeeId, familyRelationship) =>
      dispatch(createFamilyRelationship(employeeId, familyRelationship)),
    updateFamilyRelationShip: (familyRelationship) =>
      dispatch(updateFamilyRelationship(familyRelationship)),
    deleteFamilyRelationShip: (id) => dispatch(deleteFamilyRelationship(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyRelationshipInfor);
