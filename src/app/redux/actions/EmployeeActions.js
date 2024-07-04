import * as employeeConstans from "../constants/EmployeeConstants";

export const getEmployees = (payload) => {
  return {
    type: employeeConstans.GET_EMPLOYEES,
    payload: payload,
  };
};

export const getEmployeesSuccess = (employees, totalElements) => {
  return {
    type: employeeConstans.GET_EMPLOYEES_SUCCESS,
    payload: employees,
    totalElements: totalElements,
  };
};

export const getEmployeeFail = (error) => {
  return {
    type: employeeConstans.GET_EMPLOYEES_FAIL,
    payload: error,
  };
};

export const createEmployee = (employee) => {
  return {
    type: employeeConstans.CREATE_EMPLOYEE,
    payload: employee,
  };
};

export const createEmployeeSuccess = (employee) => {
  return {
    type: employeeConstans.CREATE_EMPLOYEE_SUCCESS,
    payload: employee,
  };
};

export const createEmployeeFail = (error) => {
  return {
    type: employeeConstans.CREATE_EMPLOYEE_FAIL,
    payload: error,
  };
};

export const updateEmployee = (employee, status) => {
  return {
    type: employeeConstans.UPDATE_EMPLOYEE,
    payload: employee,
    status: status,
  };
};

export const updateEmployeeSuccess = (employee) => {
  return {
    type: employeeConstans.UPDATE_EMPLOYEE_SUCCESS,
    payload: employee,
  };
};

export const updateEmployeeFail = (error) => {
  return {
    type: employeeConstans.UPDATE_EMPLOYEE_FAIL,
    payload: error,
  };
};

export const deleteEmployee = (id) => {
  return {
    type: employeeConstans.DELETE_EMPLOYEE,
    payload: id,
  };
};

export const deleteEmployeeSuccess = (id) => {
  return {
    type: employeeConstans.DELETE_EMPLOYEE_SUCCESS,
    payload: id,
  };
};

export const deleteEmployeeFail = (error) => {
  return {
    type: employeeConstans.DELETE_EMPLOYEE_FAIL,
    payload: error,
  };
};

export const getEmployeeById = (id) => {
  return {
    type: employeeConstans.GET_EMPLOYEE_BY_ID,
    payload: id,
  };
};

export const getEmployeeByIdSuccess = (employee) => {
  return {
    type: employeeConstans.GET_EMPLOYEE_BY_ID_SUCCESS,
    payload: employee,
  };
};

export const getEmployeeByIdFail = (error) => {
  return {
    type: employeeConstans.GET_EMPLOYEE_BY_ID_FAIL,
    payload: error,
  };
};
