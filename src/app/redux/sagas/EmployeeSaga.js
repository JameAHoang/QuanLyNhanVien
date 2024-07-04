import { call, put, takeEvery } from "redux-saga/effects";
import * as employeeConstants from "../constants/EmployeeConstants";
import * as employeeServices from "../../services/EmployeeServices";
import {
  PAGE,
  ROWPERPAGE,
  STATUS_OF_ADD_EMPLOYEE,
  SUCCESS,
} from "app/utils/Constants";
import {
  getEmployees,
  createEmployeeFail,
  createEmployeeSuccess,
  deleteEmployeeFail,
  deleteEmployeeSuccess,
  getEmployeeByIdFail,
  getEmployeeByIdSuccess,
  getEmployeeFail,
  getEmployeesSuccess,
  updateEmployeeFail,
  updateEmployeeSuccess,
} from "../actions/EmployeeActions";
import { API_ENPOINT } from "app/appConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatImportDate } from "app/components/FormatDate/FormatDate";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function* getAllEmployees(action) {
  try {
    const res = yield call(
      employeeServices.getAllEmployeeByStatus,
      action?.payload.status,
      action?.payload.page,
      action?.payload.rowPerPage,
      action?.payload.keyword
    );
    if (res?.data?.code === SUCCESS) {
      const dataEmployee = res?.data?.data;
      let resDataEmployee = [];
      if (dataEmployee?.length > 0) {
        resDataEmployee = dataEmployee.map((item) => {
          return {
            ...item,
            dateOfBirth: formatImportDate(item.dateOfBirth),
            gender: item.gender.toString(),
            dateOfIssuanceCard: formatImportDate(item.dateOfIssuanceCard),
          };
        });
      }
      yield put(getEmployeesSuccess(resDataEmployee, res?.data?.totalElements));
    } else {
      yield put(getEmployeeFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getEmployeeFail(error));
  }
}

function* getEmployeeById({ payload }) {
  try {
    const res = yield call(employeeServices.getEmployeeById, payload);
    if (res?.data?.code === SUCCESS) {
      const dataEmployee = res?.data?.data;
      dataEmployee.dateOfBirth = formatImportDate(dataEmployee.dateOfBirth);
      dataEmployee.gender = dataEmployee.gender.toString();
      dataEmployee.dateOfIssuanceCard = formatImportDate(
        dataEmployee.dateOfIssuanceCard
      );
      yield put(getEmployeeByIdSuccess(dataEmployee));
    } else {
      yield put(getEmployeeByIdFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getEmployeeByIdFail(error));
  }
}

function* createEmployee({ payload }) {
  try {
    const dataEmployee = payload;
    if (dataEmployee?.files) {
      const formData = new FormData();
      formData.append("file", dataEmployee?.files);
      const resImage = yield call(employeeServices.uploadImage, formData);
      const urlImage = API_ENPOINT + "/public/image/" + resImage?.data?.name;
      dataEmployee.image = urlImage;
    }
    const res = yield call(employeeServices.createEmployee, dataEmployee);

    if (res?.data?.code === SUCCESS) {
      toast.success("Thêm mới nhân viên thành công!");
      const dataEmployee = {
        ...res?.data?.data,
        dateOfBirth: formatImportDate(res?.data?.data.dateOfBirth),
        gender: res?.data?.data.gender.toString(),
        dateOfIssuanceCard: formatImportDate(
          res?.data?.data.dateOfIssuanceCard
        ),
      };
      yield put(createEmployeeSuccess(dataEmployee));
      yield put(
        getEmployees({
          status: STATUS_OF_ADD_EMPLOYEE,
          page: PAGE,
          rowPerPage: ROWPERPAGE,
          keyword: "",
        })
      );
    } else {
      yield put(createEmployeeFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(createEmployeeFail(error));
  }
}

function* updateEmployee({ payload, status }) {
  const dataEmployee = payload;
  if (dataEmployee?.files) {
    const formData = new FormData();
    formData.append("file", dataEmployee?.files);
    const resImage = yield call(employeeServices.uploadImage, formData);
    const urlImage = API_ENPOINT + "/public/image/" + resImage?.data?.name;
    dataEmployee.image = urlImage;
  }

  try {
    const res = yield call(employeeServices.updateEmployee, dataEmployee);
    if (res?.data?.code === SUCCESS) {
      yield put(updateEmployeeSuccess(dataEmployee));
      toast.success("Sửa thành công");
      yield put(
        getEmployees({
          status: status,
          page: PAGE,
          rowPerPage: ROWPERPAGE,
          keyword: "",
        })
      );
    } else {
      yield put(updateEmployeeFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(updateEmployeeFail(error));
  }
}

function* deleteEmployee({ payload }) {
  try {
    const res = yield call(employeeServices.deleteEmployee, payload);
    if (res?.data?.code === SUCCESS) {
      yield put(deleteEmployeeSuccess(payload));
      toast.success("Xóa nhân viên thành công!");
      yield put(
        getEmployees({
          status: STATUS_OF_ADD_EMPLOYEE,
          page: PAGE,
          rowPerPage: ROWPERPAGE,
          keyword: "",
        })
      );
    } else {
      yield put(deleteEmployeeFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(deleteEmployeeFail(error));
  }
}
function* employeeSaga() {
  yield takeEvery(employeeConstants.GET_EMPLOYEES, getAllEmployees);
  yield takeEvery(employeeConstants.GET_EMPLOYEE_BY_ID, getEmployeeById);
  yield takeEvery(employeeConstants.CREATE_EMPLOYEE, createEmployee);
  yield takeEvery(employeeConstants.UPDATE_EMPLOYEE, updateEmployee);
  yield takeEvery(employeeConstants.DELETE_EMPLOYEE, deleteEmployee);
}

export default employeeSaga;
