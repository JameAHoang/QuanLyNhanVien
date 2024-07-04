import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getFamilyRelationShipByEmployee = (id) => {
  return axios.get(API_PATH + `/employee-family?employeeId=${id}`);
};

export const createFamilyRelationShip = (id, data) => {
  return axios.post(API_PATH + `/employee-family?employeeId=${id}`, data);
};

export const updateFamilyRelationShip = (data) => {
  return axios.put(API_PATH + `/employee-family/${data.id}`, data);
};

export const deleteFamilyRelationShip = (id) => {
  return axios.delete(API_PATH + `/employee-family/${id}`);
};
