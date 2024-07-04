import * as employeeConstants from "../constants/EmployeeConstants";

const initialState = {
  listEmployee: [],
  employee: {},
  totalElements: 0,
  loading: false,
  error: null,
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.GET_EMPLOYEES:
    case employeeConstants.GET_EMPLOYEE_BY_ID:
    case employeeConstants.CREATE_EMPLOYEE:
    case employeeConstants.UPDATE_EMPLOYEE:
    case employeeConstants.DELETE_EMPLOYEE:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case employeeConstants.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        listEmployee: action.payload,
        totalElements: action.totalElements,
      };

    case employeeConstants.GET_EMPLOYEES_FAIL:
    case employeeConstants.GET_EMPLOYEE_BY_ID_FAIL:
    case employeeConstants.CREATE_EMPLOYEE_FAIL:
    case employeeConstants.UPDATE_EMPLOYEE_FAIL:
    case employeeConstants.DELETE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case employeeConstants.UPDATE_EMPLOYEE_SUCCESS:
    case employeeConstants.GET_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.payload,
      };

    case employeeConstants.CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        listEmployee: [...state.listEmployee, action.payload],
        employee: action.payload,
      };

    case employeeConstants.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        listEmployee: state.listEmployee.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default EmployeeReducer;
