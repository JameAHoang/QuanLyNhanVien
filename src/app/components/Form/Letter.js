import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Box, Tab } from "@material-ui/core";
import Signature from "../Signature/Signature";
import "../../../styles/views/_letter.scss";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { LIST_POSITION, TYPE, TYPE_OF_PROPOSAL } from "app/utils/Constants";
import moment from "moment";
import { formatExportDate } from "../FormatDate/FormatDate";
function LetterContent({ employee, type, salary, process, proposal }) {
  return (
    <>
      <Grid container className="letterMain" spacing={3}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <Typography align="center" variant="h5" className="titleMain">
                CÔNG TY OCEANTECH
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h6" className="titleMain">
                Số: 04/08 - QĐ
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <Grid item xs={12}>
              <Typography align="center" variant="h5" className="titleMain">
                CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography>
            </Grid>

            <Grid item variant="h6" xs={12}>
              <Typography align="center" variant="h6" className="titleMain">
                Độc lập - Tự do - Hạnh phúc
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                -----------------------------
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {type === TYPE.PROPOSAL ? (
          <Grid container item spacing={2} xs={12}>
            <Grid item xs={12}>
              <Typography align="center" variant="h5" className="titleMain">
                ĐƠN ĐỀ XUẤT THAM MƯU
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography className="textMain textBold">
                Kính gửi: Cơ quan cấp trên, lãnh đạo công ty OCEANTECH
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="textMain">
                    Tôi tên là: {employee?.name}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="textMain">
                    Sinh ngày: {formatExportDate(employee?.dateOfBirth)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="textMain">
                    Tôi viết đơn này để đề xuất tham mưu về việc:{" "}
                    {
                      TYPE_OF_PROPOSAL.find(
                        (item) => item.id === proposal?.type
                      )?.name
                    }
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="textMain">
                    Nội dụng: {proposal?.content}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="textMain">
                    Rất mong nhận được sự xem xét, quan tâm và giải quyết đề
                    nghị trên của tôi.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="textMain">
                    Xin trân trọng cảm ơn!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography align="center" variant="h5" className="titleMain">
                    QUYẾT ĐỊNH
                  </Typography>
                  {type === TYPE.SALARY_INCREASE && (
                    <Typography
                      align="center"
                      variant="h6"
                      className="titleMain"
                    >
                      Về việc tăng lương cho người lao động
                    </Typography>
                  )}
                  {type === TYPE.PROCESS && (
                    <Typography
                      align="center"
                      variant="h6"
                      className="titleMain"
                    >
                      Về việc bổ nhiệm cán bộ , công chức
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="font-italic textMain">
                    - Căn cứ tại quy chế, điều lệ của công ty OCEANTECH
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="font-italic textMain">
                    - Căn cứ vào hợp đồng lao động với người lao động
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="font-italic textMain">
                    - Xét những đóng góp thực thế cửa Ông (Bà) :{" "}
                    <span className="name ">{employee?.name}</span> đối với sự
                    phát triển của Công ty.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="font-italic textMain">
                    - Xét đề nghị của Trưởng phòng nhân sự.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography align="center" variant="h5" className="titleMain">
                    GIÁM ĐỐC CÔNG TY OCEANTECH
                  </Typography>
                  <Typography align="center" variant="h5" className="titleMain">
                    QUYẾT ĐỊNH
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* salary */}
            {type === TYPE.SALARY_INCREASE ? (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography className="textMain">
                      <span className="textBold">Điều 1 : </span> Kể từ ngày{" "}
                      {moment(salary?.startDate).format("DD")} tháng{" "}
                      {moment(salary?.startDate).format("MM")} năm{" "}
                      {moment(salary?.startDate).format("YYYY")} , mức lương của
                      Ông/Bà <span className=" name">{employee?.name}</span> sẽ
                      là : {salary?.newSalary} nghìn đồng.
                    </Typography>
                    <Typography className="textMain">
                      <span className="textBold">Điều 2 : </span>Các Ông/Bà
                      Phòng nhân sự, Phòng tài chính - Kế toán và Ông/Bà{" "}
                      <span className=" name">{employee?.name}</span> có trách
                      nhiệm thi hành quyết định này
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography className="textMain">
                        <span className="textBold">Điều 1 : </span> Kể từ ngày{" "}
                        {moment(process?.promotionDay).format("DD")} tháng{" "}
                        {moment(process?.promotionDay).format("MM")} năm{" "}
                        {moment(process?.promotionDay).format("YYYY")} , chức vụ
                        của Ông/Bà{" "}
                        <span className=" name">{employee?.name}</span> sẽ là :{" "}
                        <span className=" name">
                          {
                            LIST_POSITION.find(
                              (item) => item.id === process?.newPosition
                            )?.name
                          }
                        </span>
                      </Typography>
                      <Typography className="textMain">
                        <span className="textBold">Điều 2 : </span>Các Ông/Bà
                        Phòng nhân sự, Phòng tài chính - Kế toán và Ông/Bà{" "}
                        <span className=" name">{employee?.name}</span> có trách
                        nhiệm thi hành quyết định này
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </>
        )}

        {<Signature name={employee?.name} />}
      </Grid>
    </>
  );
}

export const Letter = (props) => {
  const { employee, type, salary, process, proposal } = props;
  const [value, setValue] = useState("1");
  const [isDesktop, setIsDesktop] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

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
            <Tab
              label={
                (type === TYPE.SALARY_INCREASE && " tăng lương") ||
                (type === TYPE.PROCESS && " thăng chức") ||
                (type === TYPE.PROPOSAL && " đề xuất tham mưu")
              }
              value="1"
              className="tab"
            />
          </TabList>
          <TabPanel value="1" className="tabPanel">
            <LetterContent
              employee={employee}
              salary={salary}
              process={process}
              proposal={proposal}
              type={type}
            />
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Letter);
