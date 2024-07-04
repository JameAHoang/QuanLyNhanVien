import React, { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { EgretVerticalNav } from "egret";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";
import localStorageService from "../../services/localStorageService";
const ViewEgretVerticalNav = withTranslation()(EgretVerticalNav);
function Sidenav(props) {
  const user = useSelector((state) => state.user);
  const role = user?.roles?.[0].name !== "ROLE_USER";
  const updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = props;
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  const renderOverlay = () => (
    <div
      onClick={() => updateSidebarMode({ mode: "close" })}
      className="sidenav__overlay"
    />
  );
  const getNavigation = () => {
    let navigation = localStorageService.getLocalStorageItem("navigations");
    if (navigation && navigation.length > 0) {
      return navigation;
    } else {
      return [
        {
          name: "Dashboard.dashboard",
          isVisible: true,
          path: ConstantList.ROOT_PATH + "homepage",
          icon: "engineering",
        },
        !role && {
          name: "Dashboard.manage",
          isVisible: true,
          icon: "engineering",
          children: [
            {
              name: "Thêm mới nhân viên",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "addNewEmployee",
              icon: "keyboard_arrow_right",
            },
            {
              name: "Quản lý nhân viên",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "employeeManagement",
              icon: "keyboard_arrow_right",
            },
            {
              name: "Kết thúc",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "employeeEnd",
              icon: "keyboard_arrow_right",
            },
          ],
        },
        role && {
          name: "Dashboard.leader",
          isVisible: true,
          icon: "engineering",
          children: [
            {
              name: "Chờ duyệt",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "leaderPending",
              icon: "keyboard_arrow_right",
            },
            {
              name: "Đã duyệt",
              isVisible: true,
              path: ConstantList.ROOT_PATH + "leaderApproved",
              icon: "keyboard_arrow_right",
            },
          ],
        },
      ];
    }
  };

  return (
    <Fragment>
      <Scrollbar
        option={{ suppressScrollX: true }}
        className="scrollable position-relative"
      >
        {props.children}
        <ViewEgretVerticalNav navigation={getNavigation()} />
      </Scrollbar>
      {renderOverlay()}
    </Fragment>
  );
}
Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
});
export default withRouter(
  connect(mapStateToProps, {
    setLayoutSettings,
  })(Sidenav)
);
