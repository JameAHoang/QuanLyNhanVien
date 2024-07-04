import * as salaryIncreaseConstants from "../constants/SalaryIncreaseConstants";

const initialState = {
  listSalaryIncrease: [],
  salaryIncrease: {},
  loading: false,
  error: null,
};

const SalaryIncreaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case salaryIncreaseConstants.UPDATE_SALARY_INCREASE:
    case salaryIncreaseConstants.DELETE_SALARY_INCREASE:
    case salaryIncreaseConstants.CREATE_SALARY_INCREASE:
    case salaryIncreaseConstants.GET_ALL_SALARY_INCREASE:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case salaryIncreaseConstants.GET_ALL_SALARY_INCREASE_SUCCESS:
      return {
        ...state,
        loading: false,
        listSalaryIncrease: action.payload,
      };

    case salaryIncreaseConstants.DELETE_SALARY_INCREASE_FAIL:
    case salaryIncreaseConstants.CREATE_SALARY_INCREASE_FAIL:
    case salaryIncreaseConstants.GET_ALL_SALARY_INCREASE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case salaryIncreaseConstants.CREATE_SALARY_INCREASE_SUCCESS:
      return {
        ...state,
        loading: false,
        listSalaryIncrease: [action.payload, ...state.listSalaryIncrease],
        salaryIncrease: action.payload,
      };

    case salaryIncreaseConstants.UPDATE_SALARY_INCREASE_SUCCESS:
      return {
        ...state,
        loading: false,
        listSalaryIncrease: state.listSalaryIncrease.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
        salaryIncrease: action.payload,
      };

    case salaryIncreaseConstants.DELETE_SALARY_INCREASE_SUCCESS:
      return {
        ...state,
        loading: false,
        listSalaryIncrease: state.listSalaryIncrease.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default SalaryIncreaseReducer;
