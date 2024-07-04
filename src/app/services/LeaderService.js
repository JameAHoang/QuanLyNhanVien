import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getAllLeaders = () => {
  return axios.get(API_PATH + "/leader");
};
