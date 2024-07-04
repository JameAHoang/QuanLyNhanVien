import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import "../../../styles/views/_search-custom.scss";
import { getEmployees } from "app/redux/actions/EmployeeActions";
import { connect } from "react-redux";
import { PAGE, ROWPERPAGE } from "app/utils/Constants";

const SearchCustom = ({
  keywords,
  setKeywords,
  getAllEmployeeByStatus,
  status,
}) => {
  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (e) => {
    setShowClearIcon(e.target.value === "" ? "none" : "flex");
    setKeywords(e.target.value);
  };

  const handleResetSearch = () => {
    setShowClearIcon("none");
    setKeywords("");
    getAllEmployeeByStatus({
      status: status,
      page: PAGE,
      rowPerPage: ROWPERPAGE,
      keyword: "",
    });
  };

  const handleSearch = () => {
    getAllEmployeeByStatus({
      status: status,
      page: PAGE,
      rowPerPage: ROWPERPAGE,
      keyword: keywords,
    });
  };

  return (
    <div>
      <TextField
        name="fullName"
        value={keywords}
        onChange={(e) => {
          handleChange(e);
        }}
        className={`textSearch`}
        placeholder="Tìm kiếm"
        InputProps={{
          startAdornment: (
            <SearchIcon className="searchIcon" onClick={handleSearch} />
          ),
          endAdornment: (
            <ClearIcon
              className="clearIcon"
              style={{ display: showClearIcon }}
              onClick={handleResetSearch}
            />
          ),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployeeByStatus: (data) => dispatch(getEmployees(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCustom);
