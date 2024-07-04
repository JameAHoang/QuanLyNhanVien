import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const AddNewEmployee = EgretLoadable({
  loader: () => import("./AddNewEmployee"),
});

const ViewComponent = withTranslation()(AddNewEmployee);
const AddNewEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "addNewEmployee",
    exact: true,
    component: ViewComponent,
  },
];
export default AddNewEmployeeRoutes;
