import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getAllProposal = (id) => {
  return axios.get(API_PATH + `/proposal?employeeId=${id}`);
};

export const createProposal = (id, data) => {
  return axios.post(API_PATH + `/proposal?employeeId=${id}`, data);
};

export const updateProposal = (data) => {
  return axios.put(API_PATH + `/proposal/${data.id}`, data);
};

export const deleteProposal = (id) => {
  return axios.delete(API_PATH + `/proposal/${id}`);
};

export const getProposalById = (id) => {
  return axios.get(API_PATH + `/proposal/${id}`);
};

export const getProposalByCurrentLeader = () => {
  return axios.get(API_PATH + `/proposal/current-leader`);
};
