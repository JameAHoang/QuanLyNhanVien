import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getAllSalaryIncrease = (id) => {
  return axios.get(API_PATH + `/salary-increase?employeeId=${id}`);
};

export const createSalaryIncrease = (id, data) => {
  return axios.post(API_PATH + `/salary-increase?employeeId=${id}`, data);
};

export const updateSalaryIncrease = (data) => {
  return axios.put(API_PATH + `/salary-increase/${data.id}`, data);
};

export const deleteSalaryIncrease = (id) => {
  return axios.delete(API_PATH + `/salary-increase/${id}`);
};

export const getSalaryById = (id) => {
  return axios.get(API_PATH + `/salary-increase/${id}`);
};

export const getSalaryByCurrentLeader = () => {
  return axios.get(API_PATH + `/salary-increase/current-leader`);
};
