import moment from "moment";

const formatImportDate = (dateData) => {
  const result = moment(dateData).format("YYYY-MM-DD");
  return result;
};

const formatExportDate = (dateData) => {
  const result = moment(dateData).format("DD/MM/YYYY");
  return result;
};

export { formatImportDate, formatExportDate };
