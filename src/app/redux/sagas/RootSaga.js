import { all } from "redux-saga/effects";
import employeeSaga from "./EmployeeSaga";
import leaderSaga from "./LeaderSaga";
import certificateSaga from "./CertificateSaga";
import familyRelationshipSaga from "./FamilyRelationshipSaga";
import salaryIncreaseSaga from "./SalaryIncreaseSaga";
import processSaga from "./ProcessSaga";
import proposalSaga from "./ProposalSaga";

export default function* rootSaga() {
  yield all([
    employeeSaga(),
    leaderSaga(),
    certificateSaga(),
    familyRelationshipSaga(),
    salaryIncreaseSaga(),
    processSaga(),
    proposalSaga(),
  ]);
}
