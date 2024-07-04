import React from "react";
import Button from "@material-ui/core/Button";

const SaveCancelButton = ({ isViewData, handleReset }) => {
  return (
    <>
      <Button
        variant="contained"
        className="primary mr-8"
        type="submit"
        disabled={isViewData}
      >
        Lưu
      </Button>
      <Button
        variant="contained"
        onClick={() => handleReset()}
        className=" error"
        disabled={isViewData}
      >
        Hủy
      </Button>
    </>
  );
};

export default SaveCancelButton;
