import MaterialTable from "material-table";
import React from "react";
import "../../../styles/views/_material-table.scss";
const borderTable = {
  border: "1px solid #eae6e6",
};
export default function MaterialTableCustom(props) {
  const { title, data, columns, height, dialog, search, paging } = props;
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      style={{
        backgroundColor: "#fafafa",
        boxShadow: "none",
        border: "none",
      }}
      options={{
        pageSize: dialog ? 5 : 10,
        pageSizeOptions: dialog ? [5, 10, 15, 20, 100] : [10, 15, 25, 50, 100],
        maxBodyHeight: height,
        minBodyHeight: height,
        sorting: false,
        search: search ? true : false,
        toolbar: search ? true : false,
        paging: paging ? true : false,
        tableLayout: "auto",
        headerStyle: {
          backgroundColor: "#7467EF",
          color: "#fff",
          ...borderTable,
          textAlign: "center",
        },
        cellStyle: {
          height: `47px`,
          ...borderTable,
        },
        rowStyle: (rowData, index) => ({
          backgroundColor: index % 2 === 0 ? "#FFF" : "#EEE",
          ...borderTable,
        }),
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "Không có dữ liệu",
        },
        toolbar: {
          searchPlaceholder: "Tìm kiếm",
          searchTooltip: "Tìm kiếm",
        },
        pagination: {
          labelDisplayedRows: "{from}-{to} của {count}",
          labelRowsPerPage: "Số hàng mỗi trang:",
          firstTooltip: "Trang đầu",
          previousTooltip: "Trang trước",
          nextTooltip: "Trang tiếp",
          lastTooltip: "Trang cuối",
          labelRowsSelect: "bản ghi",
        },
      }}
    />
  );
}
