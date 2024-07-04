import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getAllEmployeeByStatus = (status, page, rowPerPage, keyword) => {
  return axios.get(
    API_PATH +
      `/employee/search?pageIndex=${page}&pageSize=${rowPerPage}&keyword=${keyword}&listStatus=${status}`
  );
};

export const createEmployee = (data) => {
  return axios.post(API_PATH + "/employee", data);
};

export const updateEmployee = (data) => {
  return axios.put(API_PATH + "/employee/" + data.id, data);
};

export const deleteEmployee = (id) => {
  return axios.delete(API_PATH + "/employee/" + id);
};

export const getEmployeeById = (id) => {
  return axios.get(API_PATH + "/employee/" + id);
};

//Upload image

export const uploadImage = (image) => {
  return axios.post(API_PATH + "/employee/upload-image", image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
