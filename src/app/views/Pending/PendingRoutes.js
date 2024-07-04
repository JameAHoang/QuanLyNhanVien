import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const TabsPending = EgretLoadable({
  loader: () => import("./TabsPending/TabsPending"),
});

const ViewComponent = withTranslation()(TabsPending);
const PendingRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leaderPending",
    exact: true,
    component: ViewComponent,
  },
];
export default PendingRoutes;
