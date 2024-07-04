import React, { Component } from "react";
class TestShareComponent extends Component {
  render() {
    const { t } = this.props;
    return <h2>{t("title")}</h2>;
  }
}

export default TestShareComponent;
