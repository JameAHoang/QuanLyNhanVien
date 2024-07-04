import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Grid,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
  createWorkExperience,
  updateWorkExperience,
} from "./WorkExperienceServices";
import { SUCCESS } from "app/utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../components/Validate/Validate";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
export const WorkExperienceDialog = (props) => {
  const {
    openWorkExperienceDialog,
    handleCloseWorkExperienceDialog,
    employeeId,
    workExperience,
    setWorkExperience,
    handleGetWorkExperienceById,
  } = props;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setWorkExperience({
      ...workExperience,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataWorkExperience = {
      ...workExperience,
      jobDescription: workExperience.jobDescription.trim(),
    };
    if (workExperience?.id) {
      handleUpdateWorkExperience(dataWorkExperience);
    } else {
      handleCreateWorkExperience(dataWorkExperience);
    }
  };

  const handleCreateWorkExperience = async (workExperience) => {
    const res = await createWorkExperience(employeeId, [workExperience]);
    if (res?.data?.code === SUCCESS) {
      handleGetWorkExperienceById();
      handleCloseWorkExperienceDialog();
      toast.success("Thêm mới kinh nghiệm làm việc thành công!");
    } else {
      toast.error(res?.data?.message);
    }
  };

  const handleUpdateWorkExperience = async (workExperience) => {
    const res = await updateWorkExperience(workExperience?.id, workExperience);
    if (res?.data?.code === SUCCESS) {
      handleGetWorkExperienceById();
      handleCloseWorkExperienceDialog();
      toast.success("Sửa kinh nghiệm làm việc thành công!");
    } else {
      toast.error(res?.data?.message);
    }
  };

  ValidatorForm.addValidationRule(
    `isEndDateValid${workExperience?.startDate}`,
    (value) => {
      const { startDate } = workExperience;
      if (!startDate || !value) return true;
      return new Date(value) >= new Date(startDate);
    }
  );

  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={openWorkExperienceDialog}
        onClose={() => handleCloseWorkExperienceDialog()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 title">Kinh nghiệm làm việc</span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseWorkExperienceDialog()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent className="dialogContent">
            <Grid container spacing={2}>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Ngày bắt đầu
                    </span>
                  }
                  type="date"
                  value={workExperience?.startDate || null}
                  name="startDate"
                  size="small"
                  validators={["required", "isStartDateValid"]}
                  errorMessages={[
                    "Ngày bắt đầu không được để trống",
                    "Ngày bắt đầu không được là ngày tương lai",
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
                      Ngày kết thúc
                    </span>
                  }
                  type="date"
                  value={workExperience?.endDate || null}
                  name="endDate"
                  size="small"
                  validators={[
                    "required",
                    "isStartDateValid",
                    `isEndDateValid${workExperience?.startDate}`,
                  ]}
                  errorMessages={[
                    "Ngày kết thúc không được để trống",
                    "Ngày kết thúc không được là ngày tương lai",
                    "Ngày kết thúc phải sau ngày bắt đầu",
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
                      Tên công ty
                    </span>
                  }
                  type="text"
                  placeholder="VD: Công ty ABC"
                  value={workExperience?.companyName || ""}
                  name="companyName"
                  size="small"
                  validators={["required", "maxStringLength:60"]}
                  errorMessages={[
                    "Tên công ty không được để trống",
                    "Tên công ty không được quá 60 ký tự",
                  ]}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
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
                  placeholder="VD: 467 Nguyễn Trãi - Thanh Xuân - Hà Nội"
                  value={workExperience?.companyAddress || ""}
                  name="companyAddress"
                  size="small"
                  validators={["required", "maxStringLength:60"]}
                  errorMessages={[
                    "Địa chỉ không được để trống",
                    "Địa chỉ không được quá 60 ký tự",
                  ]}
                  onChange={handleOnChange}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100 text"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Mô tả công việc
                    </span>
                  }
                  type="text"
                  multiline
                  placeholder=" * Tôi đã làm công việc ABC
                              * Tôi đã làm công việc XYZ "
                  value={workExperience?.jobDescription || ""}
                  name="jobDescription"
                  size="small"
                  validators={["required", "maxStringLength:500"]}
                  errorMessages={[
                    "Mô tả công việc không được để trống",
                    "Mô tả công việc không được quá 500 ký tự",
                  ]}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Lý do rời đi
                    </span>
                  }
                  type="text"
                  placeholder="Lí do"
                  value={workExperience?.leavingReason || ""}
                  name="leavingReason"
                  size="small"
                  validators={["required", "maxStringLength:500"]}
                  errorMessages={[
                    "Lý do không được để trống",
                    "Lý do không được quá 500 ký tự",
                  ]}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialogActions">
            <Button variant="contained" className="primary" type="submit">
              Lưu
            </Button>

            <Button
              variant="contained"
              className="error"
              onClick={() => handleCloseWorkExperienceDialog()}
            >
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispaptch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkExperienceDialog);
