import * as leaderConstants from "../constants/LeaderConstants";

const initialState = {
  listLeader: [],
  loading: false,
  error: null,
};

const LeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case leaderConstants.GET_LEADERS:
      return {
        ...state,
        loading: true,
        error: null,
        listLeader: [],
      };

    case leaderConstants.GET_LEADERS_SUCCESS:
      return {
        ...state,
        loading: false,
        listLeader: action.payload,
      };

    case leaderConstants.GET_LEADERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default LeaderReducer;
