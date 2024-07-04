import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const EmployeeEnd = EgretLoadable({
  loader: () => import("./EmployeeEnd"),
});

const ViewComponent = withTranslation()(EmployeeEnd);
const EmployeeEndRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employeeEnd",
    exact: true,
    component: ViewComponent,
  },
];
export default EmployeeEndRoutes;
