import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";

const HomePage = EgretLoadable({
  loader: () => import("./Homepage"),
});

const ViewComponent = withTranslation()(HomePage);
const HomePageRoutes = [
  {
    path: ConstantList.ROOT_PATH + "homepage",
    exact: true,
    component: ViewComponent,
  },
];
export default HomePageRoutes;
