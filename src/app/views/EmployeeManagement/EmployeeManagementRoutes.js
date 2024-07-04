import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const EmployeeManagement = EgretLoadable({
  loader: () => import("./EmployeeManagement"),
});

const ViewComponent = withTranslation()(EmployeeManagement);
const EmployeeManagementRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employeeManagement",
    exact: true,
    component: ViewComponent,
  },
];
export default EmployeeManagementRoutes;
