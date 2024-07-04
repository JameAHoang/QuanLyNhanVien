/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import "../../../../styles/views/_style.scss";
import {
  createSalaryIncrease,
  deleteSalaryIncrease,
  getAllSalaryIncrease,
  updateSalaryIncrease,
} from "app/redux/actions/SalaryIncreaseActions";
import { SALARY_INCREASE_UPDATE_PROGRESS, TYPE } from "app/utils/Constants";
import { ConfirmationDialog } from "egret";
import LetterDialog from "./LetterDialog";
import "../../../components/Validate/Validate";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import ColumnsSalaryIncrease from "app/components/ColumnsCusTom/ColumnsSalaryIncrease";
import SaveCancelButton from "app/components/ButtonCustom/SaveCancelButton";
export const SalaryIncrease = (props) => {
  const {
    getAllSalaryIncrease,
    employee,
    listSalaryIncrease,
    createSalaryIncrease,
    updateSalaryIncrease,
    deleteSalaryIncrease,
    salaryIncreaseReducer,
    isViewData,
  } = props;
  const [salaryIncrease, setSalaryIncrease] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [idSalaryIncrease, setIdSalaryIncrease] = useState();
  const [openLetterDialog, setOpenLetterDialog] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSalaryIncrease({
      ...salaryIncrease,
      [name]: value,
    });
  };

  useEffect(() => {
    if (employee?.id) {
      getAllSalaryIncrease(employee?.id);
    }
  }, [employee?.id]);

  const handleReset = () => {
    setSalaryIncrease({});
  };

  const handleUpdateSalaryIncrease = (data) => {
    setSalaryIncrease(data);
  };

  const handleSubmit = () => {
    if (salaryIncrease?.id) {
      updateSalaryIncrease(salaryIncrease);
    } else {
      createSalaryIncrease(employee?.id, salaryIncrease);
    }
    handleOpenLetterDialog(salaryIncrease);
  };

  const handleOpenDeleteDialog = (id) => {
    setIsDelete(true);
    setIdSalaryIncrease(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  const handleDeleteSalaryIncrease = () => {
    deleteSalaryIncrease(idSalaryIncrease);
    handleCloseDeleteDialog();
    handleReset();
  };

  const handleOpenLetterDialog = (data) => {
    setOpenLetterDialog(true);
    setSalaryIncrease(data);
  };

  const handleCloseLetterDialog = () => {
    setOpenLetterDialog(false);
    handleReset();
  };

  // Xử lý validation
  useEffect(() => {
    ValidatorForm.addValidationRule("isGreater", (value) => {
      if (!value) {
        return true;
      }
      // Giá trị lương mới và lương cũ
      const newSalary = parseFloat(salaryIncrease?.newSalary);
      const oldSalary = parseFloat(salaryIncrease?.oldSalary);

      // Kiểm tra lương mới lớn hơn lương cũ
      return newSalary > oldSalary;
    });

    return () => {
      ValidatorForm.removeValidationRule("isGreater");
    };
  }, [salaryIncrease]);

  const columns = ColumnsSalaryIncrease({
    status: SALARY_INCREASE_UPDATE_PROGRESS,
    isViewData: isViewData,
    handleOpenLetterDialog: handleOpenLetterDialog,
    handleUpdateSalaryIncrease: handleUpdateSalaryIncrease,
    handleOpenDeleteDialog: handleOpenDeleteDialog,
  });
  return (
    <>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Ngày tăng lương
                </span>
              }
              type="date"
              value={salaryIncrease?.startDate || ""}
              name="startDate"
              size="small"
              validators={["required", "isAfterOrEqualToToday"]}
              errorMessages={[
                "Ngày tăng lương không được để trống",
                "Ngày tăng lương không được là ngày quá khứ",
              ]}
              onChange={handleOnChange}
              disabled={isViewData}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Lương cũ
                </span>
              }
              type="number"
              value={salaryIncrease?.oldSalary || ""}
              name="oldSalary"
              size="small"
              validators={["required"]}
              errorMessages={["Lương cũ không được để trống"]}
              onChange={handleOnChange}
              disabled={isViewData}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Lương mới
                </span>
              }
              type="number"
              value={salaryIncrease?.newSalary || ""}
              name="newSalary"
              size="small"
              validators={["required", "isGreater"]}
              errorMessages={[
                "Lương mới không được để trống",
                "Lương mới phải lớn hơn lương cũ",
              ]}
              onChange={handleOnChange}
              disabled={isViewData}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Lý do
                </span>
              }
              type="text"
              value={salaryIncrease?.reason || ""}
              name="reason"
              size="small"
              validators={["required", "maxStringLength:500"]}
              errorMessages={[
                "Lý do không được để trống",
                "Lý do không được quá 500 ký tự",
              ]}
              onChange={handleOnChange}
              disabled={isViewData}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={<span className="font">Ghi chú</span>}
              type="text"
              value={salaryIncrease?.note || ""}
              name="note"
              size="small"
              validators={["maxStringLength:500"]}
              errorMessages={["Ghi chú không được quá 500 ký tự"]}
              onChange={handleOnChange}
              disabled={isViewData}
            />
          </Grid>

          <Grid item lg={2} md={2} sm={12} xs={12} className="dialogActions">
            <SaveCancelButton
              isViewData={isViewData}
              handleReset={handleReset}
            />
          </Grid>
        </Grid>
      </ValidatorForm>

      {isDelete && (
        <ConfirmationDialog
          title={"Xác nhận xóa"}
          open={isDelete}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDeleteSalaryIncrease}
          text={"Bạn chắc chắn muốn xóa ?"}
          Yes={"Xác nhận"}
          No={"Hủy"}
        />
      )}
      <MaterialTableCustom
        title={false}
        columns={columns}
        data={listSalaryIncrease}
        dialog={true}
        height="300px"
        search={true}
        paging={true}
      />
      {openLetterDialog && (
        <LetterDialog
          employee={employee}
          salary={salaryIncrease?.id ? salaryIncrease : salaryIncreaseReducer}
          type={TYPE.SALARY_INCREASE}
          openLetterDialog={openLetterDialog}
          handleCloseLetterDialog={handleCloseLetterDialog}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  listLeader: state.leader.listLeader,
  listSalaryIncrease: state.salary.listSalaryIncrease,
  salaryIncreaseReducer: state.salary.salaryIncrease,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSalaryIncrease: (id) => {
      dispatch(getAllSalaryIncrease(id));
    },
    createSalaryIncrease: (employeeId, salaryIncrease) => {
      dispatch(createSalaryIncrease(employeeId, salaryIncrease));
    },
    updateSalaryIncrease: (salaryIncrease) => {
      dispatch(updateSalaryIncrease(salaryIncrease));
    },
    deleteSalaryIncrease: (id) => {
      dispatch(deleteSalaryIncrease(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalaryIncrease);
