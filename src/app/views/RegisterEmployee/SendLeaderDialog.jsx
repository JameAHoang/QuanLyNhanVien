/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
  MenuItem,
  FormControl,
} from "@material-ui/core";
import {
  TextValidator,
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import {
  STATUS_OF_ADD_EMPLOYEE,
  STATUS_OF_EMPLOYEE_MANAGEMEMNT,
  TYPE,
  LEADER_POSITION,
  STATUS_EMPLOYEE,
} from "app/utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLeaders } from "app/redux/actions/LeaderActions";
import {
  getEmployees,
  updateEmployee,
} from "app/redux/actions/EmployeeActions";
import { updateSalaryIncrease } from "app/redux/actions/SalaryIncreaseActions";
import { updateProcess } from "app/redux/actions/ProcessActions";
import { updateProposal } from "app/redux/actions/ProposalActions";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

export const SendLeaderDialog = (props) => {
  const {
    employee,
    openSendLeaderDialog,
    handleCloseSendLeaderDialog,
    getLeaders,
    listLeader,
    updateEmployee,
    closeAllDialog,
    type,
    salary,
    process,
    proposal,
    updateSalaryIncrease,
    updateProcess,
    updateProposal,
  } = props;

  const [dataSendLeader, setDataSendLeader] = useState({
    submitDay: new Date().toISOString().slice(0, 10),
    submitProfileStatus: STATUS_EMPLOYEE.PENDING_STATUS.id,
    leaderId: "",
    leaderName: "",
    leaderPosition: "",
    submitContent: "",
  });

  useEffect(() => {
    getLeaders();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "leaderId") {
      setDataSendLeader({
        ...dataSendLeader,
        [name]: value,
        leaderName: listLeader.find((item) => item.id === value).leaderName,
        leaderPosition: listLeader.find((item) => item.id === value)
          .leaderPosition,
      });
    } else {
      setDataSendLeader({
        ...dataSendLeader,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === TYPE.RESIGNATION_EMPLOYEE) {
      const dataEmployee = {
        ...employee,
        submitProfileStatus: STATUS_EMPLOYEE.PENDING_END_STATUS.id,
      };
      updateEmployee(dataEmployee, STATUS_OF_EMPLOYEE_MANAGEMEMNT);
    } else if (type === TYPE.SALARY_INCREASE) {
      const dataSalaryIncrease = {
        ...salary,
        leaderId: dataSendLeader.leaderId,
        salaryIncreaseStatus: STATUS_EMPLOYEE.PENDING_STATUS.id,
      };
      updateSalaryIncrease(dataSalaryIncrease);
    } else if (type === TYPE.PROCESS) {
      const dataProcess = {
        ...process,
        leaderId: dataSendLeader.leaderId,
        processStatus: STATUS_EMPLOYEE.PENDING_STATUS.id,
      };
      updateProcess(dataProcess);
    } else if (type === TYPE.PROPOSAL) {
      const dataProposal = {
        ...proposal,
        leaderId: dataSendLeader.leaderId,
        proposalStatus: STATUS_EMPLOYEE.PENDING_STATUS.id,
      };
      updateProposal(dataProposal);
    } else {
      const dataEmployee = {
        ...employee,
        submitDay: dataSendLeader.submitDay,
        submitProfileStatus: dataSendLeader.submitProfileStatus,
        leaderId: dataSendLeader.leaderId,
        leaderName: dataSendLeader.leaderName,
        leaderPosition: dataSendLeader.leaderPosition,
        submitContent: dataSendLeader.submitContent.trim(),
      };
      updateEmployee(dataEmployee, STATUS_OF_ADD_EMPLOYEE);
    }
    closeAllDialog();
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openSendLeaderDialog}
        onClose={() => handleCloseSendLeaderDialog()}
      >
        <DialogTitle className="dialogTitle">
          <span className="mb-20 styleColor">Trình lãnh đạo</span>
          <IconButton
            className="iconClose"
            onClick={() => handleCloseSendLeaderDialog()}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent className="dialogContent">
            <Grid container spacing={2}>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={
                  type === TYPE.SALARY_INCREASE ||
                  type === TYPE.PROCESS ||
                  type === TYPE.PROPOSAL
                    ? "none"
                    : ""
                }
              >
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font ">
                      <span className="red"> * </span>
                      Ngày trình lãnh đạo
                    </span>
                  }
                  type="date"
                  value={dataSendLeader?.submitDay || ""}
                  name="submitDay"
                  size="small"
                  validators={["required"]}
                  errorMessages={["Ngày trình lãnh đạo không được để trống"]}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
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
                        Tên lãnh đạo
                      </span>
                    }
                    value={dataSendLeader?.leaderId || ""}
                    name="leaderId"
                    validators={["required"]}
                    errorMessages={["Tên lãnh đạo không được bỏ trống"]}
                    onChange={handleOnChange}
                  >
                    {listLeader &&
                      listLeader.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.leaderName}
                          </MenuItem>
                        );
                      })}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Chức vụ
                    </span>
                  }
                  type="text"
                  value={
                    LEADER_POSITION.find(
                      (item) => item.id === dataSendLeader?.leaderPosition
                    )?.name || ""
                  }
                  name="leaderPosition"
                  size="small"
                  validators={["required"]}
                  errorMessages={["Chức vụ không được để trống"]}
                />
              </Grid>

              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={
                  type === TYPE.SALARY_INCREASE ||
                  type === TYPE.PROCESS ||
                  type === TYPE.PROPOSAL
                    ? "none"
                    : ""
                }
              >
                <TextValidator
                  className={"w-100"}
                  variant="outlined"
                  label={
                    <span className="font">
                      <span className="red"> * </span>
                      Nội dung
                    </span>
                  }
                  type="text"
                  multiline
                  value={
                    type === TYPE.SALARY_INCREASE ||
                    type === TYPE.PROCESS ||
                    type === TYPE.PROPOSAL
                      ? " "
                      : dataSendLeader?.submitContent || ""
                  }
                  name="submitContent"
                  size="small"
                  validators={["required", "maxStringLength:500"]}
                  errorMessages={[
                    "Nội dung không được để trống",
                    "Nội dung không được quá 500 ký tự",
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
              onClick={() => handleCloseSendLeaderDialog()}
            >
              Hủy
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  listLeader: state.leader.listLeader,
  employeeReducer: state.employee.employee,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployeeByStatus: (status) => dispatch(getEmployees(status)),
    getLeaders: () => dispatch(getLeaders()),
    updateEmployee: (data, status) => dispatch(updateEmployee(data, status)),
    updateSalaryIncrease: (salaryIncrease) => {
      dispatch(updateSalaryIncrease(salaryIncrease));
    },
    updateProcess: (process) => {
      dispatch(updateProcess(process));
    },
    updateProposal: (process) => {
      dispatch(updateProposal(process));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendLeaderDialog);
