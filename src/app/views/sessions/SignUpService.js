import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/public";

export const saveAngency = (Angency, UserId) => {
  const url = API_PATH + "/" + UserId;
  return axios.post(url, Angency);
};

export const checkSignUp = (KeyWord) => {
  const url = API_PATH + "/" + KeyWord;
  return axios.post(url);
};

export const createOffer = (AgencyId) => {
  const url = API_PATH + "/signup/createOffer/" + AgencyId;
  return axios.post(url);
};

export const createUser = (User) => {
  const url = API_PATH + "/signup";
  return axios({
    method: "post",
    url: url,
    data: User,
  });
};

export const checkEmail = (agency) => {
  const url = API_PATH + "/checkEmail";
  return axios.post(url, agency);
};

export const checkUsername = (agency) => {
  const url = API_PATH + "/checkUsername";
  return axios.post(url, agency);
};

export const resetPassword = (user, token) => {
  let url = API_PATH + "/saveNewPassword";
  return axios({
    method: "post",
    url: url,
    params: {
      token: token,
    },
    data: user,
  });
};
