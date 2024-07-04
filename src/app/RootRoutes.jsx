import React from "react";
import { Redirect } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import ConstantList from "./appConfig";
import HomePageRoutes from "./views/HomePage/HomepageRoutes";
import AddNewEmployeeRoutes from "./views/AddNewEmployee/AddNewEmployeeRoutes";
import PendingRoutes from "./views/Pending/PendingRoutes";
import ApprovedRoutes from "./views/Approved/ApprovedRoutes";
import EmployeeManagementRoutes from "./views/EmployeeManagement/EmployeeManagementRoutes";
import EmployeeEndRoutes from "./views/EmployeeEnd/EmployeeEndRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />, //Luôn trỏ về HomePage được khai báo trong appConfig
  },
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />,
  },
];

const routes = [
  ...HomePageRoutes,
  ...sessionRoutes,
  ...redirectRoute,
  ...AddNewEmployeeRoutes,
  ...EmployeeManagementRoutes,
  ...EmployeeEndRoutes,
  ...PendingRoutes,
  ...ApprovedRoutes,
  ...errorRoute,
];

export default routes;
