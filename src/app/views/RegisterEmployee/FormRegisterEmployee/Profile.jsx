import React from "react";
import { Grid, Avatar, Typography, Button } from "@material-ui/core";
import EmailOutlined from "@material-ui/icons/EmailOutlined";
import LocalPhoneOutlined from "@material-ui/icons/LocalPhoneOutlined";
import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";
import WcOutlined from "@material-ui/icons/WcOutlined";
import CakeOutlined from "@material-ui/icons/CakeOutlined";
import { connect } from "react-redux";
import "../../../../styles/views/_profile.scss";
import { GENDER, STATUS_OF_ADD_EMPLOYEE, TEAMS } from "app/utils/Constants";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { formatExportDate } from "app/components/FormatDate/FormatDate";
import WorkExperience from "./WorkExperience/WorkExperience";
import { updateEmployee } from "app/redux/actions/EmployeeActions";

function TextWithLineBreaks({ text, skill, activate, exp }) {
  const lines = text?.split("\n");

  const renderedText = lines?.map((line) => (
    <ul
      className={
        (skill && "list-ul-skill") ||
        (activate && "list-ul-activate") ||
        (exp && "list-ul-exp")
      }
      key={line}
    >
      <li
        className={
          (skill && "list-li-skill") ||
          (activate && "list-li-activate") ||
          (exp && "list-li-exp")
        }
      >
        {line}
      </li>
    </ul>
  ));

  return <div>{renderedText}</div>;
}

export const Profile = (props) => {
  const { employee, submitRef, updateEmployee, isViewData, setEmployee } =
    props;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const dataEmployee = {
      ...employee,
      skill: employee.skill.trim(),
      activity: employee.activity.trim(),
    };
    updateEmployee(dataEmployee, STATUS_OF_ADD_EMPLOYEE);
  };

  return (
    <Grid
      container
      xs={12}
      justifyContent="space-between"
      className="profileMain"
    >
      <Grid item container xs={5} direction="column" spacing={3}>
        <Grid item container>
          <Avatar className="avatarProfile" src={employee?.image} />
        </Grid>
        <Grid item container>
          <div className="contact-item emailIcon">
            <EmailOutlined />
            <span className="textContact">{employee?.email}</span>
          </div>
          <div className="contact-item phoneIcon">
            <LocalPhoneOutlined />
            <span className="textContact">{employee?.phone}</span>
          </div>
        </Grid>
        <ValidatorForm onSubmit={handleSubmit} className="formMain">
          <Grid item container className="formContent">
            <Typography variant="h6" className="title titleSkill">
              KỸ NĂNG
            </Typography>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              {isViewData ? (
                <TextWithLineBreaks text={employee?.skill} skill={true} />
              ) : (
                <TextValidator
                  className="w-100 text area-dotted"
                  type="text"
                  value={employee?.skill || ""}
                  name="skill"
                  size="small"
                  validators={["required", "maxStringLength:500"]}
                  errorMessages={[
                    "Kĩ năng không được để trống",
                    "Kỹ năng không được quá 500 ký tự",
                  ]}
                  onChange={handleOnChange}
                  multiline
                  disabled={isViewData}
                />
              )}
            </Grid>
          </Grid>
          <Grid item container className="formContent">
            <Typography variant="h6" className="title language">
              NGOẠI NGỮ
            </Typography>
            <div className="title-infor">
              <div className="name">Tiếng Anh</div>
              <div className="evaluate">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="title-infor">
              <div className="name">Tiếng Trung</div>
              <div className="evaluate">
                <span></span>
                <span></span>
                <span className="not-active"></span>
              </div>
            </div>
          </Grid>
          <Grid item container className="formContent">
            <Typography variant="h6" className="title informatics">
              TIN HỌC
            </Typography>
            <div className="title-infor">
              <div className="name">Word</div>
              <div className="evaluate">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="title-infor">
              <div className="name">Excel</div>
              <div className="evaluate">
                <span></span>
                <span></span>
                <span className="not-active"></span>
              </div>
            </div>
          </Grid>
          <Grid item container className="formContent">
            <Typography variant="h6" className="title activate">
              HOẠT ĐỘNG
            </Typography>
            <Grid item lg={10} md={10} sm={12} xs={12}>
              {isViewData ? (
                <TextWithLineBreaks text={employee?.activity} activate={true} />
              ) : (
                <TextValidator
                  className="w-100 text area-dotted"
                  type="text"
                  value={employee?.activity || ""}
                  name="activity"
                  size="small"
                  validators={["required", "maxStringLength:500"]}
                  errorMessages={[
                    "Hoạt động không được để trống",
                    "Hoạt động không được quá 500 ký tự",
                  ]}
                  onChange={handleOnChange}
                  multiline
                  disabled={isViewData}
                />
              )}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            className="primary"
            type="submit"
            ref={submitRef}
            style={{ display: "none" }}
          >
            Lưu
          </Button>
        </ValidatorForm>
      </Grid>
      <Grid item container xs={7} spacing={3} direction="column">
        <Grid item className="borderName">
          <div className="titleName"> {employee?.name}</div>
          <div className="titleTeam">
            {TEAMS.find((item) => item.id === employee?.team)?.name} Developer
          </div>
        </Grid>
        <Grid item container className="icon-right">
          <div className="contact-item genderIcon ">
            <div className="icon">
              <WcOutlined />
            </div>
            <span className="textContact ">
              {
                GENDER?.find(
                  (item) => item?.id === employee?.gender?.toString()
                )?.name
              }
            </span>
          </div>
          <div className="contact-item birthdayIcon">
            <div className="icon">
              <CakeOutlined />
            </div>
            <span className="textContact">
              {formatExportDate(employee?.dateOfBirth)}
            </span>
          </div>
          <div className="contact-item addressIcon">
            <div className="icon">
              <LocationOnOutlined />
            </div>
            <span className="textContact">{employee?.address}</span>
          </div>
        </Grid>
        <Grid item className="border careerObjective">
          <Typography variant="h6" className="title titleCustom">
            {"MỤC TIÊU NGHỀ NGHIỆP"}
          </Typography>
          <Typography className="careerGoal">
            <br></br>Với tính cách năng động, ham học hỏi và chăm chỉ, tôi mong
            muốn được làm việc với vị trí lập trình viên tại Công ty. Tôi sẽ cố
            gắng hoàn thành tốt các công việc được giao, học hỏi thêm nhiều kinh
            nghiệm chuyên môn và không ngừng phấn đấu để trở thành 1 lập trình
            viên xuất sắc.
          </Typography>
        </Grid>
        <Grid item container direction="column" spacing={2} className="border">
          <WorkExperience
            employeeId={employee?.id}
            isViewData={isViewData}
            TextWithLineBreaks={TextWithLineBreaks}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return { updateEmployee: (data) => dispatch(updateEmployee(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
