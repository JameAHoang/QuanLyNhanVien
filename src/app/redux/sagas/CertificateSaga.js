import { call, put, takeEvery } from "redux-saga/effects";
import * as certificateConstants from "../constants/CertificateConstants";
import * as certificateServices from "../../services/CertificateServices";
import { SUCCESS } from "app/utils/Constants";
import {
  createCertificateFail,
  createCertificateSuccess,
  deleteCertificateFail,
  deleteCertificateSuccess,
  getCertificateFail,
  getCertificatesSuccess,
  updateCertificateFail,
  updateCertificateSuccess,
} from "../actions/CertificateActions";
import { toast } from "react-toastify";
import { formatImportDate } from "app/components/FormatDate/FormatDate";

import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function* getCertificates({ payload }) {
  try {
    const res = yield call(
      certificateServices.getCertificateByEmployee,
      payload
    );
    if (res?.data?.code === SUCCESS) {
      const dataCertificate = res?.data?.data;
      let resDataCertificate = [];
      if (dataCertificate.length > 0) {
        resDataCertificate = dataCertificate.map((item) => {
          return {
            ...item,
            issueDate: formatImportDate(item.issueDate),
          };
        });
      }
      yield put(getCertificatesSuccess(resDataCertificate));
    } else {
      yield put(getCertificateFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getCertificateFail(error));
  }
}

function* createCertificate(action) {
  const { employeeId, certificate } = action.payload;
  try {
    const res = yield call(
      certificateServices.createCertificate,
      employeeId,
      certificate
    );
    if (res?.data?.code === SUCCESS) {
      yield put(createCertificateSuccess(res?.data?.data?.[0]));
      toast.success("Thêm mới chứng chỉ thành công");
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(createCertificateFail(error));
  }
}

function* updateCertificate({ payload }) {
  try {
    const res = yield call(certificateServices.updateCertificate, payload);
    if (res?.data?.code === SUCCESS) {
      toast.success("Sửa chứng chỉ thành công!");
      yield put(updateCertificateSuccess(res?.data?.data));
    } else {
      yield put(updateCertificateFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(updateCertificateFail(error));
  }
}

function* deleteCertificate({ payload }) {
  try {
    const res = yield call(certificateServices.deleteCertificate, payload);
    if (res?.data?.code === SUCCESS) {
      yield put(deleteCertificateSuccess(payload));
      toast.success("Xóa chứng chỉ thành công!");
    } else {
      yield put(deleteCertificateFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(deleteCertificateFail(error));
  }
}
function* certificateSaga() {
  yield takeEvery(certificateConstants.GET_CERTIFICATES, getCertificates);
  yield takeEvery(certificateConstants.CREATE_CERTIFICATE, createCertificate);
  yield takeEvery(certificateConstants.UPDATE_CERTIFICATE, updateCertificate);
  yield takeEvery(certificateConstants.DELETE_CERTIFICATE, deleteCertificate);
}

export default certificateSaga;
