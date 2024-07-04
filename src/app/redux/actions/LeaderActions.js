import * as leaderConstans from "../constants/LeaderConstants";

export const getLeaders = () => {
  return {
    type: leaderConstans.GET_LEADERS,
  };
};

export const getLeadersSuccess = (leaders) => {
  return {
    type: leaderConstans.GET_LEADERS_SUCCESS,
    payload: leaders,
  };
};

export const getLeaderFail = (error) => {
  return {
    type: leaderConstans.GET_LEADERS_FAIL,
    payload: error,
  };
};
