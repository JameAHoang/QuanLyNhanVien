import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Avatar,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import "../../../../styles/views/_resume.scss";
import { GENDER, RELATIONSHIP } from "app/utils/Constants";
import Signature from "app/components/Signature/Signature";
import { formatExportDate } from "app/components/FormatDate/FormatDate";

export const Resume = (props) => {
  const { employee, employeeFamilyDtos } = props;

  return (
    <>
      <Grid className="resumeMain" container>
        <Grid item container>
          <Grid item container justifyContent="start" xs={4}>
            <Avatar src={employee?.image} className="avatar" />
          </Grid>
          <Grid item container xs>
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
                <Typography>
                  ----------------------------------------
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="h5" className="titleMain">
                  SƠ YẾU LÝ LỊCH
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className="titleMain">
                  TỰ THUẬT
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={4}>
          <Grid container item spacing={2} className="resumeContent">
            <Grid item>
              <Typography variant="h5" paddingBottom={1} className="titleMain">
                I. THÔNG TIN BẢN THÂN
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container xs={9}>
                <Grid item> 1. Họ và tên {"(chữ in hoa)"}: &nbsp;</Grid>
                <Grid item xs className="name borderBottom">
                  {employee?.name}
                </Grid>
              </Grid>
              <Grid item container xs>
                <Grid item> Giới tính: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {
                    GENDER.find(
                      (item) => item.id === employee?.gender?.toString()
                    )?.name
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container xs={6}>
                <Grid item> 2. Sinh ngày: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {formatExportDate(employee?.dateOfBirth)}
                </Grid>
              </Grid>
              <Grid item container xs>
                <Grid item> Nơi sinh: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {employee?.placeOfIssueCard}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item> 3. Nơi ở hiện nay: &nbsp;</Grid>
              <Grid item xs className="borderBottom">
                {employee?.address}
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container xs={6}>
                <Grid item> 4. Điện thoại: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {employee?.phone}
                </Grid>
              </Grid>
              <Grid item container xs={6}>
                <Grid item> Email: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {employee?.email}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container xs={6}>
                <Grid item> 5. Dân tộc: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {employee?.ethnic}
                </Grid>
              </Grid>
              <Grid item container xs={6}>
                <Grid item> Tôn giáo: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {employee?.religion}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container xs={6}>
                <Grid item> 6. Số CCCD: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {employee?.citizenIdentificationNumber}
                </Grid>
              </Grid>
              <Grid item container xs={6}>
                <Grid item> Ngày cấp: &nbsp;</Grid>
                <Grid item xs className="borderBottom">
                  {formatExportDate(employee?.dateOfIssuanceCard)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item> 7. Nơi cấp: &nbsp;</Grid>
              <Grid item xs className="borderBottom">
                {employee?.placeOfIssueCard}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2} className="resumeContent">
            <Grid item>
              <Typography variant="h5" paddingBottom={2} className="titleMain">
                II. QUAN HỆ GIA ĐÌNH
              </Typography>
            </Grid>
            <Grid item className="relationshipText" xs={12}>
              Ghi rõ họ tên, năm sinh, địa chỉ , mối quan hệ của bố mẹ đẻ, anh
              chị em ruột, vợ (hoặc chồng), con.
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <Table className="table titleMain">
                  <TableHead>
                    <TableRow>
                      <TableCell className="head" align="center" width={"8%"}>
                        STT
                      </TableCell>
                      <TableCell className="head" align="center" width={"15%"}>
                        Họ và tên
                      </TableCell>
                      <TableCell className="head" align="center" width={"15%"}>
                        Năm sinh
                      </TableCell>
                      <TableCell className="head" align="center" width={"15%"}>
                        CCCD
                      </TableCell>
                      <TableCell className="head" align="center" width={"12%"}>
                        Quan hệ
                      </TableCell>
                      <TableCell className="head" align="center" width={"35%"}>
                        Địa chỉ
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeeFamilyDtos && employeeFamilyDtos.length > 0 ? (
                      employeeFamilyDtos.map((row, index) => (
                        <TableRow key={row?.name}>
                          <TableCell className="cell" align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="cell" align="left">
                            {row?.name}
                          </TableCell>
                          <TableCell className="cell" align="center">
                            {formatExportDate(row?.dateOfBirth)}
                          </TableCell>
                          <TableCell className="cell" align="center">
                            {row?.citizenIdentificationNumber}
                          </TableCell>{" "}
                          <TableCell className="cell" align="center">
                            {
                              RELATIONSHIP.find(
                                (item) =>
                                  item.id === row?.relationShip?.toString()
                              )?.name
                            }
                          </TableCell>
                          <TableCell
                            className="cell"
                            align="left"
                            width={"100%"}
                          >
                            {row?.address}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          align="center"
                          className="cell"
                        ></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            justifyContent="center"
            className="resumePromise"
          >
            <Grid item className="title">
              <Typography variant="h5" className="titleMain">
                LỜI CAM ĐOAN
              </Typography>
            </Grid>
            <Grid item className="content">
              Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có
              điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời
              khai của mình.
            </Grid>
          </Grid>

          {<Signature name={employee?.name} />}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
