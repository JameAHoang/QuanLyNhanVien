/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, FormControl, MenuItem } from "@material-ui/core";
import {
  TextValidator,
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import "../../../../styles/views/_style.scss";
import {
  LIST_POSITION,
  PROCESS_UPDATE_PROGRESS,
  TYPE,
} from "app/utils/Constants";
import { ConfirmationDialog } from "egret";
import {
  createProcess,
  deleteProcess,
  getAllProcess,
  updateProcess,
} from "app/redux/actions/ProcessActions";
import LetterDialog from "./LetterDialog";
import "../../../components/Validate/Validate";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import ColumnsProcess from "app/components/ColumnsCusTom/ColumnsProcess";
import SaveCancelButton from "app/components/ButtonCustom/SaveCancelButton";
export const Process = (props) => {
  const {
    employee,
    getAllProcess,
    listProcess,
    createProcess,
    updateProcess,
    deleteProcess,
    processReducer,
    isViewData,
  } = props;
  const [process, setProcess] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [idProcess, setIdProcess] = useState();
  const [openLetterDialog, setOpenLetterDialog] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setProcess({
      ...process,
      [name]: value,
    });
  };

  useEffect(() => {
    if (employee?.id) {
      getAllProcess(employee?.id);
    }
  }, [employee?.id]);

  const handleReset = () => {
    setProcess({});
  };

  const handleSubmit = () => {
    if (process?.id) {
      updateProcess(process);
    } else {
      createProcess(employee?.id, process);
    }
    handleOpenLetterDialog(process);
  };

  const handleOpenDeleteDialog = (id) => {
    setIsDelete(true);
    setIdProcess(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  const handleDeleteProcess = () => {
    deleteProcess(idProcess);
    handleCloseDeleteDialog();
    handleReset();
  };

  const handleUpdateProcess = (data) => {
    setProcess(data);
  };

  const handleOpenLetterDialog = (data) => {
    setOpenLetterDialog(true);
    setProcess(data);
  };
  const handleCloseLetterDialog = () => {
    setOpenLetterDialog(false);
    handleReset();
  };

  const columns = ColumnsProcess({
    status: PROCESS_UPDATE_PROGRESS,
    isViewData: isViewData,
    handleOpenLetterDialog: handleOpenLetterDialog,
    handleUpdateProcess: handleUpdateProcess,
    handleOpenDeleteDialog: handleOpenDeleteDialog,
  });

  return (
    <>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Ngày thăng chức
                </span>
              }
              type="date"
              value={process?.promotionDay || ""}
              name="promotionDay"
              size="small"
              validators={["required", "isAfterOrEqualToToday"]}
              errorMessages={[
                "Ngày thăng chức không được để trống",
                "Ngày thăng chức không được là ngày quá khứ",
              ]}
              onChange={handleOnChange}
              disabled={isViewData}
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
                    Vị trí mới
                  </span>
                }
                value={process?.newPosition || ""}
                name="newPosition"
                validators={["required"]}
                errorMessages={["Vị trí mới không được bỏ trống"]}
                onChange={handleOnChange}
                disabled={isViewData}
              >
                {LIST_POSITION &&
                  LIST_POSITION.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </SelectValidator>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={<span className="font">Ghi chú</span>}
              type="text"
              value={process?.note || ""}
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

      <MaterialTableCustom
        title={false}
        columns={columns}
        data={listProcess}
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
          onYesClick={handleDeleteProcess}
          text={"Bạn chắc chắn muốn xóa ?"}
          Yes={"Xác nhận"}
          No={"Hủy"}
        />
      )}

      {openLetterDialog && (
        <LetterDialog
          employee={employee}
          process={process?.id ? process : processReducer}
          type={TYPE.PROCESS}
          openLetterDialog={openLetterDialog}
          handleCloseLetterDialog={handleCloseLetterDialog}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  listLeader: state.leader.listLeader,
  listProcess: state.process.listProcess,
  processReducer: state.process.process,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProcess: (id) => {
      dispatch(getAllProcess(id));
    },
    createProcess: (employeeId, process) => {
      dispatch(createProcess(employeeId, process));
    },
    updateProcess: (process) => {
      dispatch(updateProcess(process));
    },
    deleteProcess: (id) => {
      dispatch(deleteProcess(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Process);
