/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Icon,
  IconButton,
  TextField,
} from "@material-ui/core";
import { formatImportDate } from "app/components/FormatDate/FormatDate";
import {
  deleteWorkExperience,
  getWorkExperiences,
} from "./WorkExperienceServices";
import { SUCCESS } from "app/utils/Constants";

import "../../../../../styles/views/_work-experience.scss";
import WorkExperienceDialog from "./WorkExperienceDialog";
import { ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import moment from "moment";
export const WorkExperience = (props) => {
  const { employeeId, isViewData, TextWithLineBreaks } = props;
  const [listWorkExperiences, setListWorkExperiences] = useState([]);
  const [workExperience, setWorkExperience] = useState();
  const [openWorkExperienceDialog, setOpenWorkExperienceDialog] =
    useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [idWorkExperience, setIdWorkExperience] = useState();
  useEffect(() => {
    handleGetWorkExperienceById();
  }, [employeeId]);

  const handleGetWorkExperienceById = async () => {
    const res = await getWorkExperiences(employeeId);
    if (res?.data?.code === SUCCESS) {
      setListWorkExperiences(res?.data?.data);
    }
  };

  const handleOpenWorkExperienceDialog = (data) => {
    setWorkExperience({
      ...data,
      startDate: formatImportDate(data?.startDate),
      endDate: formatImportDate(data?.endDate),
    });

    setOpenWorkExperienceDialog(true);
  };

  const handleCloseWorkExperienceDialog = () => {
    setOpenWorkExperienceDialog(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setIsDelete(true);
    setIdWorkExperience(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  const handleDeleteWorkExperience = async () => {
    const res = await deleteWorkExperience(idWorkExperience);
    if (res?.data?.code === SUCCESS) {
      handleGetWorkExperienceById();
      handleCloseDeleteDialog();
      toast.success("Xóa kinh nghiệm làm việc thành công!");
    } else {
      toast.error(res?.data?.message);
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        className="workExperienceHeader"
      >
        <Grid item>
          <Typography variant="h6" className="title titleCustom">
            KINH NGHIỆM LÀM VIỆC
          </Typography>
        </Grid>
        {!isViewData && (
          <Grid item>
            {
              <IconButton
                className="btnAdd"
                onClick={() => {
                  handleOpenWorkExperienceDialog({});
                }}
              >
                <Icon>add</Icon>
              </IconButton>
            }
          </Grid>
        )}
      </Grid>
      <Grid item container spacing={4}>
        {listWorkExperiences.map((item) => {
          return (
            <Grid
              key={item.id}
              item
              container
              spacing={1}
              className={!isViewData ? "workExperienceContent" : ""}
            >
              <Grid
                container
                spacing={1}
                xs={12}
                className="workExperienceTitle"
              >
                <Grid
                  item
                  container
                  spacing={1}
                  xs={12}
                  className="workExperienceMain"
                >
                  <Grid item className="titleContent dateWorkExperience">
                    {moment(item?.startDate).format("MM")}/
                    {moment(item?.startDate).format("YYYY")}
                    {" - "}
                    {moment(item?.endDate).format("MM")}/
                    {moment(item?.endDate).format("YYYY")}
                    {"  "}
                  </Grid>
                  <Grid item className="titleContent dotted">
                    &bull;
                  </Grid>
                  <Grid item className="titleContent nameCompany">
                    {item?.companyName}
                  </Grid>
                </Grid>

                <Grid item container spacing={1} xs={12}>
                  <Grid item xs={12} className="titleContent addressCompany">
                    {item?.companyAddress}
                  </Grid>

                  <Grid item xs={12}>
                    {isViewData ? (
                      <TextWithLineBreaks
                        text={item.jobDescription}
                        exp={true}
                      />
                    ) : (
                      <TextField
                        className="w-100 textField"
                        type="text"
                        multiline
                        value={item.jobDescription || ""}
                        name="jobDescription"
                        size="small"
                        InputProps={{
                          disableUnderline: true,
                          classes: {
                            root: "inputRoot",
                            input: "inputInput",
                          },
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className="workExperienceBtn"
              >
                <Grid item>
                  <IconButton
                    onClick={() => handleOpenWorkExperienceDialog(item)}
                    className={isViewData ? "none" : ""}
                  >
                    <Icon color="primary">editIcon</Icon>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => handleOpenDeleteDialog(item.id)}
                    className={isViewData ? "none" : ""}
                  >
                    <Icon color="error">deleteIcon</Icon>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      {openWorkExperienceDialog && (
        <WorkExperienceDialog
          openWorkExperienceDialog={openWorkExperienceDialog}
          handleCloseWorkExperienceDialog={handleCloseWorkExperienceDialog}
          employeeId={employeeId}
          workExperience={workExperience}
          setWorkExperience={setWorkExperience}
          handleGetWorkExperienceById={handleGetWorkExperienceById}
        />
      )}
      {isDelete && (
        <ConfirmationDialog
          title={"Xác nhận xóa"}
          open={true}
          onConfirmDialogClose={() => {
            handleCloseDeleteDialog();
          }}
          onYesClick={() => {
            handleDeleteWorkExperience();
          }}
          text={"Bạn có chắc chắn muốn xóa không?"}
          Yes={"Xác nhận"}
          No={"Hủy"}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperience);
