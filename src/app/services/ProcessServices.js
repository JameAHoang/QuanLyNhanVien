import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getAllProcess = (id) => {
  return axios.get(API_PATH + `/process?employeeId=${id}`);
};

export const createProcess = (id, data) => {
  return axios.post(API_PATH + `/process?employeeId=${id}`, data);
};

export const updateProcess = (data) => {
  return axios.put(API_PATH + `/process/${data.id} `, data);
};

export const deleteProcess = (id) => {
  return axios.delete(API_PATH + `/process/${id}`);
};

export const getProcessById = (id) => {
  return axios.get(API_PATH + `/process/${id}`);
};

export const getProcessByCurrentLeader = () => {
  return axios.get(API_PATH + `/process/current-leader`);
};
