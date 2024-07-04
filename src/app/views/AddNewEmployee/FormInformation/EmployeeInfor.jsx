/* eslint-disable react-hooks/exhaustive-deps */
import "../../../../styles/views/_employee-infor.scss";
import "../../../../styles/views/_style.scss";
import { Avatar, Button, FormControl, Grid, MenuItem } from "@material-ui/core";
import { GENDER, STATUS_OF_ADD_EMPLOYEE, TEAMS } from "app/utils/Constants";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
} from "app/redux/actions/EmployeeActions";
import React from "react";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { connect } from "react-redux";
import "../../../components/Validate/Validate";
import moment from "moment";
import { toast } from "react-toastify";
export const EmployeeInfor = (props) => {
  const {
    employee,
    setEmployee,
    submitRef,
    createEmployee,
    updateEmployee,
    certificatesDto,
    employeeFamilyDtos,
  } = props;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const sizeImage = 2 * 1024 * 1024;
    const typeImage = ["image/png", "image/jpeg"];
    if (name === "image") {
      const files = e?.target?.files[0];
      if (!typeImage.includes(files.type)) {
        toast.error(
          "Không đúng định dạng ảnh. Vui lòng chọn định dạng PNG hoặc JPEG"
        );
      } else if (files.size > sizeImage) {
        toast.error(
          "Kích cỡ ảnh quá lớn. Vui lòng chọn ảnh có kích cỡ nhỏ hơn 2MB"
        );
      } else {
        setEmployee({
          ...employee,
          image: URL.createObjectURL(e.target.files[0]),
          files: e.target.files[0],
        });
      }
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataEmployee = {
      ...employee,
      employeeFamilyDtos: employee?.id ? employeeFamilyDtos : [],
      certificatesDto: employee?.id ? certificatesDto : [],
    };
    if (employee?.id) {
      updateEmployee(dataEmployee, STATUS_OF_ADD_EMPLOYEE);
    } else {
      createEmployee(dataEmployee);
    }
  };

  return (
    <Grid container>
      <Grid
        container
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Avatar src={employee?.image || ""} className="avatar" />
        <Button variant="contained" className="upload-image" component="label">
          Tải ảnh đại diện
          <input
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            name="image"
            onChange={handleOnChange}
          />
        </Button>
      </Grid>
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span className="red"> * </span>
                    Mã nhân viên
                  </span>
                }
                type="text"
                value={employee?.code || ""}
                name="code"
                size="small"
                placeholder="VD: NV23123"
                validators={[
                  "required",
                  `matchRegexp:^NV${moment().format("YY")}\\d{3}$`,
                ]}
                errorMessages={[
                  "Mã nhân viên không được bỏ trống",
                  "Mã nhân viên phải là NV23 và 3 kí tự cuối là số",
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
                    Tên nhân viên
                  </span>
                }
                type="text"
                value={employee?.name || ""}
                name="name"
                size="small"
                placeholder="VD: Nguyễn Đức Hoàng Anh"
                validators={[
                  "required",
                  'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                  "maxStringLength:30",
                ]}
                errorMessages={[
                  "Tên nhân viên không được bỏ trống",
                  "Tên không chứa số và kí tự đặc biệt",
                  "Tên không được quá 30 ký tự",
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
                    Email
                  </span>
                }
                type="email"
                value={employee?.email || ""}
                name="email"
                size="small"
                placeholder="VD: hoanganhdev99@gmail.com"
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Email không được để trống",
                  "Email không đúng định dạng",
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
                    Số điện thoại
                  </span>
                }
                type="text"
                value={employee?.phone || ""}
                name="phone"
                size="small"
                placeholder="VD: 0985092425"
                validators={["required", "matchRegexp:^0[0-9]{9,10}$"]}
                errorMessages={[
                  "Số điện thoại không được để trống",
                  "Số điện thoại chưa đúng định dạng",
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
                    Ngày sinh
                  </span>
                }
                type="date"
                value={employee?.dateOfBirth || ""}
                name="dateOfBirth"
                size="small"
                validators={["required", "equalEighteenYearsAgo"]}
                errorMessages={[
                  "Ngày sinh không được để trống",
                  "Ngày sinh phải trên 18 tuổi",
                ]}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                  value={employee?.gender || ""}
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
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span className="red"> * </span>
                    Dân tộc
                  </span>
                }
                type="text"
                value={employee?.ethnic || ""}
                name="ethnic"
                size="small"
                placeholder="VD: Kinh"
                validators={[
                  "required",
                  'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                  "maxStringLength:30",
                ]}
                errorMessages={[
                  "Dân tộc không được để trống",
                  "Dân tộc không được là số hoặc ký tự đặc biệt",
                  "Dân tộc không được quá 30 ký tự",
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
                    Tôn giáo
                  </span>
                }
                type="text"
                value={employee?.religion || ""}
                name="religion"
                size="small"
                placeholder="VD: Không"
                validators={[
                  "required",
                  'matchRegexp:^[^0-9!@#$%^&*(),.?":{}|<>]+$',
                  "maxStringLength:30",
                ]}
                errorMessages={[
                  "Tôn giáo không được để trống",
                  "Tôn giáo không được là số hoặc ký tự đặc biệt",
                  "Tôn giáo không được quá 30 ký tự",
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
                    Căn cước công dân
                  </span>
                }
                type="text"
                placeholder="VD: 001099005326"
                value={employee?.citizenIdentificationNumber || ""}
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
                value={employee?.dateOfIssuanceCard || ""}
                name="dateOfIssuanceCard"
                size="small"
                validators={["required", "isStartDateValid"]}
                errorMessages={[
                  "Ngày cấp không được để trống",
                  "Ngày cấp không được là ngày tương lai",
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
                    Nơi cấp
                  </span>
                }
                type="text"
                value={employee?.placeOfIssueCard || ""}
                name="placeOfIssueCard"
                size="small"
                placeholder="VD: Hà Nội"
                validators={["required", "maxStringLength:60"]}
                errorMessages={[
                  "Nơi cấp không được để trống",
                  "Nơi cấp không được quá 60 ký tự",
                ]}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
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
                      Nhóm
                    </span>
                  }
                  value={employee?.team || ""}
                  name="team"
                  validators={["required"]}
                  errorMessages={["Nhóm không được bỏ trống"]}
                  onChange={handleOnChange}
                >
                  {TEAMS &&
                    TEAMS.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
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
                value={employee?.address || ""}
                name="address"
                size="small"
                placeholder="VD: 467 Nguyễn Trãi - Thanh Xuân - Hà Nội"
                validators={["required", "maxStringLength:60"]}
                errorMessages={[
                  "Địa chỉ không được để trống",
                  "Địa chỉ không được quá 60 ký tự",
                ]}
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
          <button ref={submitRef} type="submit" style={{ display: "none" }} />
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployeeByStatus: (status) => dispatch(getEmployees(status)),
    createEmployee: (data) => dispatch(createEmployee(data)),
    updateEmployee: (data, status) => dispatch(updateEmployee(data, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfor);
