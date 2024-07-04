import React from "react";
import { Grid } from "@material-ui/core";
import "../../../styles/views/_signature.scss";
import moment from "moment";

function Signature({ name }) {
  return (
    <Grid
      item
      container
      spacing={2}
      justify="flex-end"
      className="signature-grid"
    >
      <Grid
        item
        container
        xs={5}
        direction="column"
        alignItems="center"
        spacing={1}
      >
        <Grid item className="signature-1">
          Hà Nội, ngày {moment(new Date()).format("DD")} tháng{" "}
          {moment(new Date()).format("MM")} năm{" "}
          {moment(new Date()).format("YYYY")}
        </Grid>
        <Grid item container direction="column" alignItems="center">
          <Grid item className="signature-2">
            NGƯỜI KHAI
          </Grid>
          <Grid item className="signature-3">
            (Ký, ghi rõ họ tên)
          </Grid>
        </Grid>
        <Grid item className="signature-4"></Grid>
        <Grid item className="signature-5">
          {name}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Signature;
