import axios from "axios";
import ConstantList from "../../../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getWorkExperiences = (id) => {
  return axios.get(API_PATH + `/experience?employeeId=${id}`);
};

export const createWorkExperience = (employeeId, data) => {
  return axios.post(API_PATH + `/experience?employeeId=${employeeId}`, data);
};

export const updateWorkExperience = (id, data) => {
  return axios.put(API_PATH + `/experience/${id}`, data);
};

export const deleteWorkExperience = (id) => {
  return axios.delete(API_PATH + `/experience/${id}`);
};
