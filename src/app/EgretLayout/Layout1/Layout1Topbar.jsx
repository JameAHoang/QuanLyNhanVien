import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import ConstantList from "../../appConfig";
import {
  Icon,
  IconButton,
  MenuItem,
  withStyles,
  MuiThemeProvider,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import { EgretMenu, EgretSearchBox } from "egret";
import { isMdScreen } from "utils";
import { withTranslation } from "react-i18next";
import LanguageSelect from "../SharedCompoents/LanguageSelect";
import authService from "../../services/jwtAuthService";
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
});
const ViewLanguageSelect = withTranslation()(LanguageSelect);

class Layout1Topbar extends Component {
  state = {};

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    this.props.logoutUser();
  };

  render() {
    let imagePath = ConstantList.ROOT_PATH + "assets/images/avatar.jpg";
    let user = authService.getLoginUser();
    if (user != null && user.imagePath != null) {
      imagePath = ConstantList.API_ENPOINT + user.imagePath;
    }
    const { t } = this.props;
    let { theme, settings } = this.props;

    const topbarTheme =
      settings.themes[settings.layout1Settings.topbar.theme] || theme;
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <div className="topbar">
          <div
            className={`topbar-hold`}
            style={{ backgroundColor: topbarTheme.palette.primary.main }}
          >
            <div className="flex flex-space-between flex-middle h-100">
              <div className="flex">
                <IconButton onClick={this.handleSidebarToggle}>
                  <Icon>menu</Icon>
                </IconButton>

                <div className="hide-on-mobile"></div>
              </div>
              <div className="flex flex-middle">
                <EgretSearchBox />
                <ViewLanguageSelect />

                <EgretMenu
                  menuButton={
                    <img
                      className="mx-8 text-middle circular-image-small cursor-pointer"
                      src={imagePath}
                      alt="user"
                    />
                  }
                >
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link className="flex flex-middle" to="/">
                      <Icon> home </Icon>
                      <span className="pl-16">
                        {" "}
                        {t("Dashboard.dashboard")}{" "}
                      </span>
                    </Link>
                  </MenuItem>
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link
                      className="flex flex-middle"
                      to="/page-layouts/user-profile"
                    >
                      <Icon> person </Icon>
                      <span className="pl-16"> {t("Dashboard.profile")} </span>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleSignOut}
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> power_settings_new </Icon>
                    <span className="pl-16"> {t("Dashboard.logout")} </span>
                  </MenuItem>
                </EgretMenu>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)
  )
);
