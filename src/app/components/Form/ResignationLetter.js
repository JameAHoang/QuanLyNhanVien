import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Grid, Typography, Box, Tab } from "@material-ui/core";
import Signature from "../Signature/Signature";
import "../../../styles/views/_regignation-letter.scss";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { TEAMS, TYPE } from "app/utils/Constants";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import SendLeaderDialog from "app/views/RegisterEmployee/SendLeaderDialog";
import { formatExportDate } from "../FormatDate/FormatDate";
import "../../components/Validate/Validate";
function LetterContent({
  employee,
  dataResignation,
  setDataResignation,
  isViewData,
}) {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataResignation({
      ...dataResignation,
      [name]: value,
    });
  };
  return (
    <Grid className="regignationMain" container spacing={4}>
      <Grid item container>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h5" className="titleMain">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className="titleMain">
              Độc lập - Tự do - Hạnh phúc
            </Typography>
          </Grid>
          <Grid item>
            <Typography>----------------------------------------</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h5" className="titleMain">
              ĐƠN XIN NGHỈ VIỆC
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid container item spacing={2} className="regignationContent">
          <Grid item className="title">
            Kính gửi: Ban Giám Đốc công ty Oceantech
          </Grid>
          <Grid item container spacing={2}>
            <Grid item container xs={12}>
              <Grid item style={{ marginTop: "4px" }}>
                Tôi tên là: &nbsp;
              </Grid>
              <Grid item xs>
                <TextValidator
                  className="w-100 textValidator area-dotted"
                  variant="outlined"
                  type="text"
                  value={employee?.name}
                  name="name"
                  size="small"
                  multiline
                  validators={["required"]}
                  errorMessages={["Trường này không được để trống"]}
                  disabled={isViewData}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item container xs={6}>
              <Grid item style={{ marginTop: "4px" }}>
                Chức vụ: &nbsp;
              </Grid>
              <Grid item xs>
                <Grid item xs={12}>
                  <TextValidator
                    className="w-100 textValidator area-dotted"
                    variant="outlined"
                    type="text"
                    value={
                      TEAMS.find((item) => item.id === employee?.team)?.name +
                      " Developer"
                    }
                    name="team"
                    size="small"
                    multiline
                    validators={["required"]}
                    errorMessages={["Trường này không được để trống"]}
                    disabled={isViewData}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={6}>
              <Grid item style={{ marginTop: "4px" }}>
                Bộ phận: &nbsp;
              </Grid>
              <Grid item xs={10}>
                <TextValidator
                  className="w-100 textValidator area-dotted"
                  variant="outlined"
                  type="text"
                  value={TEAMS.find((item) => item.id === employee?.team)?.name}
                  name="team"
                  size="small"
                  multiline
                  validators={["required"]}
                  errorMessages={["Trường này không được để trống"]}
                  disabled={isViewData}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item style={{ marginTop: "4px" }} xs={8}>
              Nay tôi làm đơn này, kính xin Ban Giám đốc phê duyệt cho tôi được
              thôi việc kể từ : &nbsp;
            </Grid>
            <Grid item xs={4}>
              <TextValidator
                className="w-100 textValidator borderBottom area-dotted"
                variant="outlined"
                type={isViewData ? "text" : "date"}
                value={
                  isViewData
                    ? formatExportDate(employee?.endDay) || ""
                    : dataResignation?.endDay || ""
                }
                name="endDay"
                size="small"
                validators={
                  isViewData ? " " : ["required", "isAfterOrEqualToToday"]
                }
                errorMessages={
                  isViewData
                    ? " "
                    : [
                        "Ngày kết thúc không được để trống",
                        "Ngày xin nghỉ không được là ngày quá khứ",
                      ]
                }
                onChange={handleOnChange}
                disabled={isViewData}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              Lý do: &nbsp;
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                className="w-100 textValidator area-dotted"
                variant="outlined"
                type="text"
                value={
                  isViewData
                    ? employee?.reasonForEnding || ""
                    : dataResignation?.reasonForEnding || ""
                }
                name="reasonForEnding"
                size="small"
                multiline
                validators={["required"]}
                errorMessages={["Lý do không được để trống"]}
                onChange={handleOnChange}
                disabled={isViewData}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          className="regignationPromise"
        >
          <Grid item className="content">
            Tôi xin cam đoan đã bàn giao công việc lại cho bộ phận có liên quan
            trước khi nghỉ việc.
          </Grid>
          <Grid item className="content">
            Rất mong Ban Giám đốc xem xét và chấp thuận cho tôi được phép thôi
            việc. Tôi xin chân thành cảm ơn.
          </Grid>
        </Grid>

        {<Signature name={employee?.name} />}
      </Grid>
    </Grid>
  );
}

export const ResignationLetter = (props) => {
  const { employee, submitRef, closeAllDialog, isViewData } = props;
  const [value, setValue] = useState("1");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [dataResignation, setDataResignation] = useState({});
  const [dataEmployeeResignation, setDataEmployeeResignation] = useState({});

  const [openSendLeaderDialog, setOpenSendLeaderDialog] = useState(false);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1300);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Kiểm tra ban đầu khi component được mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCloseSendLeaderDialog = () => {
    setOpenSendLeaderDialog(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataEmployee = {
      ...employee,
      endDay: dataResignation.endDay,
      reasonForEnding: dataResignation.reasonForEnding.trim(),
    };
    setDataEmployeeResignation(dataEmployee);
    setOpenSendLeaderDialog(true);
  };
  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="box">
          <TabList
            onChange={handleChangeTab}
            className="tabList"
            orientation={isDesktop ? "vertical" : "divider"}
            variant="scrollable"
          >
            <Tab label="Đơn xin nghỉ việc" value="1" className="tab" />
          </TabList>
          <TabPanel value="1" className="tabPanel">
            <ValidatorForm onSubmit={handleSubmit}>
              <LetterContent
                employee={employee}
                dataResignation={dataResignation}
                setDataResignation={setDataResignation}
                isViewData={isViewData}
              />
              <button
                ref={submitRef}
                type="submit"
                style={{ display: "none" }}
              />
              {openSendLeaderDialog && (
                <SendLeaderDialog
                  openSendLeaderDialog={openSendLeaderDialog}
                  handleCloseSendLeaderDialog={handleCloseSendLeaderDialog}
                  employee={dataEmployeeResignation}
                  closeAllDialog={closeAllDialog}
                  type={TYPE.RESIGNATION_EMPLOYEE}
                />
              )}
            </ValidatorForm>
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResignationLetter);
