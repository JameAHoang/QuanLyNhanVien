import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import EmployeeReducer from "./EmployeeReducer";
import LeaderReducer from "./LeaderReducer";
import CertificateReducer from "./CertificateReducer";
import FamilyRelationshipReducer from "./FamilyRelationshipReducer";
import SalaryIncreaseReducer from "./SalaryIncreaseReducer";
import ProcessReducer from "./ProcessReducer";
import ProposalReducer from "./ProposalReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  employee: EmployeeReducer,
  leader: LeaderReducer,
  certificate: CertificateReducer,
  family: FamilyRelationshipReducer,
  salary: SalaryIncreaseReducer,
  process: ProcessReducer,
  proposal: ProposalReducer,
});

export default RootReducer;
