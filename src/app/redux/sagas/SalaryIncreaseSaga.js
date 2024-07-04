import { call, put, takeEvery } from "redux-saga/effects";
import * as salaryIncreaseConstants from "../constants/SalaryIncreaseConstants";
import * as salaryIncreaseServices from "../../services/SalaryIncreaseServices";
import { SUCCESS } from "app/utils/Constants";
import { toast } from "react-toastify";
import { formatImportDate } from "app/components/FormatDate/FormatDate";
import "react-toastify/dist/ReactToastify.css";
import {
  createSalaryIncreaseFail,
  createSalaryIncreaseSuccess,
  deleteSalaryIncreaseFail,
  deleteSalaryIncreaseSuccess,
  getAllSalaryIncreaseFail,
  getAllSalaryIncreaseSuccess,
  updateSalaryIncreaseFail,
  updateSalaryIncreaseSuccess,
} from "../actions/SalaryIncreaseActions";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function* getAllSalaryIncrease({ payload }) {
  try {
    const res = yield call(
      salaryIncreaseServices.getAllSalaryIncrease,
      payload
    );
    if (res?.data?.code === SUCCESS) {
      const dataSalaryIncrease = res?.data?.data;
      let resDataSalaryIncrease = [];
      if (dataSalaryIncrease.length > 0) {
        resDataSalaryIncrease = dataSalaryIncrease.map((item) => {
          return {
            ...item,
            startDate: formatImportDate(item.startDate),
          };
        });
      }
      yield put(getAllSalaryIncreaseSuccess(resDataSalaryIncrease));
    } else {
      yield put(getAllSalaryIncreaseFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getAllSalaryIncreaseFail(error));
  }
}

function* createSalaryIncrease(action) {
  const { employeeId, salaryIncrease } = action.payload;
  try {
    const res = yield call(
      salaryIncreaseServices.createSalaryIncrease,
      employeeId,
      [salaryIncrease]
    );

    if (res?.data?.code === SUCCESS) {
      const dataSalaryIncrease = res?.data?.data?.[0];

      let resDataSalaryIncrease = {
        ...dataSalaryIncrease,
        startDate: formatImportDate(dataSalaryIncrease?.startDate),
      };

      yield put(createSalaryIncreaseSuccess(resDataSalaryIncrease));
      toast.success("Thêm mới thành công");
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(createSalaryIncreaseFail(error));
  }
}

function* updateSalaryIncrease({ payload }) {
  try {
    const res = yield call(
      salaryIncreaseServices.updateSalaryIncrease,
      payload
    );
    if (res?.data?.code === SUCCESS) {
      toast.success("Sửa thành công");
      const dataSalaryIncrease = res?.data?.data;

      let resDataSalaryIncrease = {
        ...dataSalaryIncrease,
        startDate: formatImportDate(dataSalaryIncrease?.startDate),
      };
      yield put(updateSalaryIncreaseSuccess(resDataSalaryIncrease));
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(updateSalaryIncreaseFail(error));
  }
}

function* deleteSalaryIncrease({ payload }) {
  try {
    const res = yield call(
      salaryIncreaseServices.deleteSalaryIncrease,
      payload
    );
    if (res?.data?.code === SUCCESS) {
      yield put(deleteSalaryIncreaseSuccess(payload));
      toast.success("Xóa thành công!");
    } else {
      yield put(deleteSalaryIncreaseFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(deleteSalaryIncreaseFail(error));
  }
}

function* salaryIncreaseSaga() {
  yield takeEvery(
    salaryIncreaseConstants.GET_ALL_SALARY_INCREASE,
    getAllSalaryIncrease
  );
  yield takeEvery(
    salaryIncreaseConstants.CREATE_SALARY_INCREASE,
    createSalaryIncrease
  );
  yield takeEvery(
    salaryIncreaseConstants.UPDATE_SALARY_INCREASE,
    updateSalaryIncrease
  );
  yield takeEvery(
    salaryIncreaseConstants.DELETE_SALARY_INCREASE,
    deleteSalaryIncrease
  );
}

export default salaryIncreaseSaga;
