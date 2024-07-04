import { call, put, takeEvery } from "redux-saga/effects";
import * as leaderConstants from "../constants/LeaderConstants";
import * as leaderServices from "../../services/LeaderService";
import { SUCCESS } from "app/utils/Constants";
import { getLeaderFail, getLeadersSuccess } from "../actions/LeaderActions";

function* getLeaders() {
  try {
    const res = yield call(leaderServices.getAllLeaders);
    if (res?.data?.code === SUCCESS) {
      yield put(getLeadersSuccess(res?.data?.data));
    } else {
      yield put(getLeaderFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getLeaderFail(error));
  }
}

function* leaderSaga() {
  yield takeEvery(leaderConstants.GET_LEADERS, getLeaders);
}

export default leaderSaga;
