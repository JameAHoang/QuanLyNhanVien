import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const Approved = EgretLoadable({
  loader: () => import("./Approved"),
});

const ViewComponent = withTranslation()(Approved);
const ApprovedRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leaderApproved",
    exact: true,
    component: ViewComponent,
  },
];
export default ApprovedRoutes;
