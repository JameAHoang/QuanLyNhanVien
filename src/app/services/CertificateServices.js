import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT;
export const getCertificateByEmployee = (id) => {
  return axios.get(API_PATH + `/certificate?employeeId=${id}`);
};
export const createCertificate = (id, data) => {
  return axios.post(API_PATH + `/certificate?employeeId=${id}`, data);
};

export const updateCertificate = (data) => {
  return axios.put(API_PATH + `/certificate/${data.id}`, data);
};

export const deleteCertificate = (id) => {
  return axios.delete(API_PATH + `/certificate/${id}`);
};
