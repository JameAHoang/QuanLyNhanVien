import * as processConstants from "../constants/ProcessConstants";

const initialState = {
  listProcess: [],
  process: {},
  loading: false,
  error: null,
};

const ProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case processConstants.UPDATE_PROCESS:
    case processConstants.DELETE_PROCESS:
    case processConstants.CREATE_PROCESS:
    case processConstants.GET_ALL_PROCESS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case processConstants.GET_ALL_PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        listProcess: action.payload,
      };

    case processConstants.DELETE_PROCESS_FAIL:
    case processConstants.CREATE_PROCESS_FAIL:
    case processConstants.GET_ALL_PROCESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case processConstants.CREATE_PROCESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        listProcess: [action.payload, ...state.listProcess],
        process: action.payload,
      };
    }

    case processConstants.UPDATE_PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        listProcess: state.listProcess.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
        process: action.payload,
      };

    case processConstants.DELETE_PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        listProcess: state.listProcess.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default ProcessReducer;
