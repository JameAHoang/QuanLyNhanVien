import { call, put, takeEvery } from "redux-saga/effects";
import * as processConstants from "../constants/ProcessConstants";
import * as processServices from "../../services/ProcessServices";
import { SUCCESS } from "app/utils/Constants";
import { toast } from "react-toastify";
import { formatImportDate } from "app/components/FormatDate/FormatDate";
import "react-toastify/dist/ReactToastify.css";
import {
  createProcessFail,
  createProcessSuccess,
  deleteProcessFail,
  deleteProcessSuccess,
  getAllProcessFail,
  getAllProcessSuccess,
  updateProcessFail,
  updateProcessSuccess,
} from "../actions/ProcessActions";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function* getAllProcess({ payload }) {
  try {
    const res = yield call(processServices.getAllProcess, payload);
    if (res?.data?.code === SUCCESS) {
      const dataProcess = res?.data?.data;
      let resDataProcess = [];
      if (dataProcess.length > 0) {
        resDataProcess = dataProcess.map((item) => {
          return {
            ...item,
            promotionDay: formatImportDate(item.promotionDay),
          };
        });
      }
      yield put(getAllProcessSuccess(resDataProcess));
    } else {
      yield put(getAllProcessFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getAllProcessFail(error));
  }
}

function* createProcess(action) {
  const { employeeId, process } = action.payload;
  try {
    const res = yield call(processServices.createProcess, employeeId, [
      process,
    ]);

    if (res?.data?.code === SUCCESS) {
      const dataProcess = res?.data?.data?.[0];
      let resDataProcess = {
        ...dataProcess,
        promotionDay: formatImportDate(dataProcess.promotionDay),
      };
      yield put(createProcessSuccess(resDataProcess));
      toast.success("Thêm mới thành công");
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(createProcessFail(error));
  }
}

function* updateProcess({ payload }) {
  try {
    const res = yield call(processServices.updateProcess, payload);
    if (res?.data?.code === SUCCESS) {
      toast.success("Sửa thành công");
      const dataProcess = res?.data?.data;
      let resDataProcess = {
        ...dataProcess,
        promotionDay: formatImportDate(dataProcess.promotionDay),
      };
      yield put(updateProcessSuccess(resDataProcess));
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(updateProcessFail(error));
  }
}

function* deleteProcess({ payload }) {
  try {
    const res = yield call(processServices.deleteProcess, payload);
    if (res?.data?.code === SUCCESS) {
      yield put(deleteProcessSuccess(payload));
      toast.success("Xóa thành công!");
    } else {
      yield put(deleteProcessFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(deleteProcessFail(error));
  }
}
function* processSaga() {
  yield takeEvery(processConstants.GET_ALL_PROCESS, getAllProcess);
  yield takeEvery(processConstants.CREATE_PROCESS, createProcess);
  yield takeEvery(processConstants.UPDATE_PROCESS, updateProcess);
  yield takeEvery(processConstants.DELETE_PROCESS, deleteProcess);
}

export default processSaga;
