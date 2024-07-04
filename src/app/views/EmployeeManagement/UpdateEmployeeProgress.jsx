import { Avatar, FormControl, Grid, MenuItem } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { GENDER, STATUS_EMPLOYEE } from "app/utils/Constants";
import "../../../styles/views/_employee-infor.scss";
import "../../../styles/views/_style.scss";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import FormUpdateProgress from "./FormUpdateProgress/FormUpdateProgress";
export const UpdateEmployeeProgress = (props) => {
  const { employee } = props;
  return (
    <>
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
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <ValidatorForm>
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
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                />
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>

        <Grid item xs={12}>
          <FormUpdateProgress
            employee={employee}
            isViewData={
              employee?.submitProfileStatus ===
              STATUS_EMPLOYEE.PENDING_END_STATUS.id.toString()
                ? true
                : false
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEmployeeProgress);
