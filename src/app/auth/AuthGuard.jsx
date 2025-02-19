import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "app/appContext";
class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      authenticated: true,
      routes,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { location, user } = props;
    const { pathname } = location;
    const matched = state.routes.find((r) => r.path === pathname);
    const authenticated =
      matched && matched.auth && matched.auth.length
        ? matched.auth.includes(user.role)
        : true;

    return {
      authenticated,
    };
  }

  render() {
    let { children } = this.props;

    return <Fragment>{children}</Fragment>;
  }
}

AuthGuard.contextType = AppContext;

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
