import { call, put, takeEvery } from "redux-saga/effects";
import * as familyRelationshipConstants from "../constants/FamilyRelationshipConstants";
import * as familyRelationshipServices from "../../services/FamilyRelationshipServices";
import { formatImportDate } from "app/components/FormatDate/FormatDate";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createFamilyRelationshipFail,
  createFamilyRelationshipSuccess,
  deleteFamilyRelationshipFail,
  deleteFamilyRelationshipSuccess,
  getFamilyRelationshipFail,
  getFamilyRelationshipSuccess,
  updateFamilyRelationshipFail,
  updateFamilyRelationshipSuccess,
} from "../actions/FamilyRelationshipActions";
import { SUCCESS } from "app/utils/Constants";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function* getFamilyRelationship({ payload }) {
  try {
    const res = yield call(
      familyRelationshipServices.getFamilyRelationShipByEmployee,
      payload
    );
    if (res?.data?.code === SUCCESS) {
      const dataFamilyRelationship = res?.data?.data;
      let resDataEmployeeFamily = [];
      if (dataFamilyRelationship.length > 0) {
        resDataEmployeeFamily = dataFamilyRelationship.map((item) => {
          return {
            ...item,
            gender: item.gender.toString(),
            relationShip: item.relationShip.toString(),
            dateOfBirth: formatImportDate(item.dateOfBirth),
          };
        });
      }
      yield put(getFamilyRelationshipSuccess(resDataEmployeeFamily));
    } else {
      yield put(getFamilyRelationshipFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getFamilyRelationshipFail(error));
  }
}

function* createFamilyRelationship(action) {
  const { employeeId, familyRelationship } = action.payload;
  try {
    const res = yield call(
      familyRelationshipServices.createFamilyRelationShip,
      employeeId,
      familyRelationship
    );
    if (res?.data?.code === SUCCESS) {
      const dataFamilyRelationship = res?.data?.data?.[0];
      let resDataEmployeeFamily = {
        ...dataFamilyRelationship,
        gender: dataFamilyRelationship?.gender?.toString(),
        relationShip: dataFamilyRelationship?.relationShip?.toString(),
        dateOfBirth: formatImportDate(dataFamilyRelationship?.dateOfBirth),
      };
      yield put(createFamilyRelationshipSuccess(resDataEmployeeFamily));
      toast.success("Thêm mới quan hệ gia đình thành công!");
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(createFamilyRelationshipFail(error));
  }
}

function* updateFamilyRelationship({ payload }) {
  try {
    const res = yield call(
      familyRelationshipServices.updateFamilyRelationShip,
      payload
    );
    if (res?.data?.code === SUCCESS) {
      toast.success("Sửa quan hệ gia đình thành công!");
      yield put(updateFamilyRelationshipSuccess(res?.data?.data));
    } else {
      yield put(updateFamilyRelationshipFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(updateFamilyRelationshipFail(error));
  }
}

function* deleteFamilyRelationship({ payload }) {
  try {
    const res = yield call(
      familyRelationshipServices.deleteFamilyRelationShip,
      payload
    );
    if (res?.data?.code === SUCCESS) {
      yield put(deleteFamilyRelationshipSuccess(payload));
      toast.success("Xóa quan hệ gia đình thành công!");
    } else {
      yield put(deleteFamilyRelationshipFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(deleteFamilyRelationshipFail(error));
  }
}

function* familyRelationshipSaga() {
  yield takeEvery(
    familyRelationshipConstants.GET_FAMILYRELATIONSHIP,
    getFamilyRelationship
  );
  yield takeEvery(
    familyRelationshipConstants.CREATE_FAMILYRELATIONSHIP,
    createFamilyRelationship
  );
  yield takeEvery(
    familyRelationshipConstants.UPDATE_FAMILYRELATIONSHIP,
    updateFamilyRelationship
  );
  yield takeEvery(
    familyRelationshipConstants.DELETE_FAMILYRELATIONSHIP,
    deleteFamilyRelationship
  );
}

export default familyRelationshipSaga;
