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
  PROPOSAL_UPDATE_PROGRESS,
  TYPE,
  TYPE_OF_PROPOSAL,
} from "app/utils/Constants";
import {
  createProposal,
  deleteProposal,
  getAllProposal,
  updateProposal,
} from "app/redux/actions/ProposalActions";
import { ConfirmationDialog } from "egret";
import LetterDialog from "./LetterDialog";
import "../../../components/Validate/Validate";
import MaterialTableCustom from "app/components/MaterialTableCustom/MaterialTableCustom";
import ColumnsProposal from "app/components/ColumnsCusTom/ColumnsProposal";
import SaveCancelButton from "app/components/ButtonCustom/SaveCancelButton";
export const Proposal = (props) => {
  const {
    employee,
    listProposal,
    createProposal,
    deleteProposal,
    getAllProposal,
    updateProposal,
    proposalReducer,
    isViewData,
  } = props;
  const [proposal, setProposal] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [idProposal, setIdProposal] = useState();
  const [openLetterDialog, setOpenLetterDialog] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setProposal({
      ...proposal,
      [name]: value,
    });
  };

  useEffect(() => {
    if (employee?.id) {
      getAllProposal(employee?.id);
    }
  }, [employee?.id]);

  const handleReset = () => {
    setProposal({});
  };

  const handleUpdateProposal = (data) => {
    setProposal(data);
  };

  const handleSubmit = () => {
    if (proposal?.id) {
      updateProposal(proposal);
    } else {
      createProposal(employee?.id, proposal);
    }
    handleOpenLetterDialog(proposal);
  };

  const handleOpenDeleteDialog = (id) => {
    setIsDelete(true);
    setIdProposal(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  const handleDeleteProposal = () => {
    deleteProposal(idProposal);
    handleCloseDeleteDialog();
    handleReset();
  };

  const handleOpenLetterDialog = (data) => {
    setOpenLetterDialog(true);
    setProposal(data);
  };
  const handleCloseLetterDialog = () => {
    setOpenLetterDialog(false);
    handleReset();
  };

  const columns = ColumnsProposal({
    status: PROPOSAL_UPDATE_PROGRESS,
    isViewData: isViewData,
    handleOpenLetterDialog: handleOpenLetterDialog,
    handleUpdateProposal: handleUpdateProposal,
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
                  Ngày diễn biến
                </span>
              }
              type="date"
              value={proposal?.proposalDate || ""}
              name="proposalDate"
              size="small"
              validators={["required", "isAfterOrEqualToToday"]}
              errorMessages={[
                "Ngày diễn biến không được để trống",
                "Ngày diễn biến không được là ngày quá khứ",
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
                    Loại
                  </span>
                }
                value={proposal?.type || ""}
                name="type"
                validators={["required"]}
                errorMessages={["Loại đề xuất tham mưu không được bỏ trống"]}
                onChange={handleOnChange}
                disabled={isViewData}
              >
                {TYPE_OF_PROPOSAL &&
                  TYPE_OF_PROPOSAL.map((item) => {
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
                  Nội dung
                </span>
              }
              type="text"
              value={proposal?.content || ""}
              name="content"
              size="small"
              validators={["required", "maxStringLength:500"]}
              errorMessages={[
                "Nội dung không được để trống",
                "Nội dung không được quá 500 ký tự",
              ]}
              onChange={handleOnChange}
              disabled={isViewData}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span className="red"> * </span>
                  Mô tả chi tiết
                </span>
              }
              type="text"
              value={proposal?.detailedDescription || ""}
              name="detailedDescription"
              size="small"
              validators={["required", "maxStringLength:500"]}
              errorMessages={[
                "Mô tả chi tiết không được để trống",
                "Mô tả chi tiết không được quá 500 ký tự",
              ]}
              onChange={handleOnChange}
              disabled={isViewData}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={<span className="font">Ghi chú</span>}
              type="text"
              value={proposal?.note || ""}
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
        data={listProposal}
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
          onYesClick={handleDeleteProposal}
          text={"Bạn chắc chắn muốn xóa  ?"}
          Yes={"Xác nhận"}
          No={"Hủy"}
        />
      )}

      {openLetterDialog && (
        <LetterDialog
          employee={employee}
          proposal={proposal?.id ? proposal : proposalReducer}
          type={TYPE.PROPOSAL}
          openLetterDialog={openLetterDialog}
          handleCloseLetterDialog={handleCloseLetterDialog}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  listLeader: state.leader.listLeader,
  listProposal: state.proposal.listProposal,
  proposalReducer: state.proposal.proposal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProposal: (id) => {
      dispatch(getAllProposal(id));
    },
    createProposal: (employeeId, process) => {
      dispatch(createProposal(employeeId, process));
    },
    updateProposal: (process) => {
      dispatch(updateProposal(process));
    },
    deleteProposal: (id) => {
      dispatch(deleteProposal(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
