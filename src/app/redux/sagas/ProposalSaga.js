import { call, put, takeEvery } from "redux-saga/effects";
import * as proposalConstants from "../constants/ProposalConstants";
import * as proposalServices from "../../services/ProposalServices";
import { SUCCESS } from "app/utils/Constants";
import { toast } from "react-toastify";
import { formatImportDate } from "app/components/FormatDate/FormatDate";
import "react-toastify/dist/ReactToastify.css";
import {
  createProposalFail,
  createProposalSuccess,
  deleteProposalFail,
  deleteProposalSuccess,
  getAllProposalFail,
  getAllProposalSuccess,
  updateProposalFail,
  updateProposalSuccess,
} from "../actions/ProposalActions";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function* getAllProposal({ payload }) {
  try {
    const res = yield call(proposalServices.getAllProposal, payload);
    if (res?.data?.code === SUCCESS) {
      const dataProposal = res?.data?.data;
      let resDataProposal = [];
      if (dataProposal.length > 0) {
        resDataProposal = dataProposal.map((item) => {
          return {
            ...item,
            proposalDate: formatImportDate(item.proposalDate),
          };
        });
      }
      yield put(getAllProposalSuccess(resDataProposal));
    } else {
      yield put(getAllProposalFail(res?.data?.message));
    }
  } catch (error) {
    yield put(getAllProposalFail(error));
  }
}

function* createProposal(action) {
  const { employeeId, proposal } = action.payload;
  try {
    const res = yield call(proposalServices.createProposal, employeeId, [
      proposal,
    ]);
    if (res?.data?.code === SUCCESS) {
      const dataProposal = res?.data?.data?.[0];
      let resDataProposal = {
        ...dataProposal,
        proposalDate: formatImportDate(dataProposal?.proposalDate),
      };

      yield put(createProposalSuccess(resDataProposal));
      toast.success("Thêm mới thành công");
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(createProposalFail(error));
  }
}

function* updateProposal({ payload }) {
  try {
    const res = yield call(proposalServices.updateProposal, payload);
    if (res?.data?.code === SUCCESS) {
      toast.success("Sửa thành công");
      const dataProposal = res?.data?.data;
      let resDataProposal = {
        ...dataProposal,
        proposalDate: formatImportDate(dataProposal?.proposalDate),
      };
      yield put(updateProposalSuccess(resDataProposal));
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(updateProposalFail(error));
  }
}

function* deleteProposal({ payload }) {
  try {
    const res = yield call(proposalServices.deleteProposal, payload);
    if (res?.data?.code === SUCCESS) {
      yield put(deleteProposalSuccess(payload));
      toast.success("Xóa thành công!");
    } else {
      yield put(deleteProposalFail(res?.data?.message));
      toast.error(res?.data?.message);
    }
  } catch (error) {
    yield put(deleteProposalFail(error));
  }
}
function* proposalSaga() {
  yield takeEvery(proposalConstants.GET_ALL_PROPOSAL, getAllProposal);
  yield takeEvery(proposalConstants.CREATE_PROPOSAL, createProposal);
  yield takeEvery(proposalConstants.UPDATE_PROPOSAL, updateProposal);
  yield takeEvery(proposalConstants.DELETE_PROPOSAL, deleteProposal);
}

export default proposalSaga;
