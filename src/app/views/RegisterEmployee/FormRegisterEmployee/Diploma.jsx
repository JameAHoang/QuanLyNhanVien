import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import "../../../../styles/views/_diploma.scss";
import { formatExportDate } from "app/components/FormatDate/FormatDate";

export const Diploma = (props) => {
  const { certificatesDto } = props;

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="start"
        className="diplomaMain"
      >
        <Grid item>
          <Typography variant="h5" className="titleDiploma mb-16">
            Thông tin văn bằng
          </Typography>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell className="head" align="center" width={"8%"}>
                    STT
                  </TableCell>
                  <TableCell className="head" align="center" width={"17%"}>
                    Tên văn bằng
                  </TableCell>
                  <TableCell className="head" align="center" width={"15%"}>
                    Lĩnh vực
                  </TableCell>
                  <TableCell className="head" align="center" width={"45%"}>
                    Nội dung
                  </TableCell>
                  <TableCell className="head" align="center" width={"15%"}>
                    Ngày cấp
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificatesDto && certificatesDto.length > 0 ? (
                  certificatesDto.map((item, index) => (
                    <TableRow key={item.name}>
                      <TableCell className="cell" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="cell" align="center">
                        {item.certificateName}
                      </TableCell>
                      <TableCell className="cell" align="center">
                        {item.field}
                      </TableCell>
                      <TableCell className="cell" align="center">
                        {item.content}
                      </TableCell>
                      <TableCell className="cell" align="center">
                        {formatExportDate(item.issueDate)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
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
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Diploma);
