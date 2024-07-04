import * as salaryIncreaseConstants from "../constants/SalaryIncreaseConstants";

export const getAllSalaryIncrease = (id) => {
  return {
    type: salaryIncreaseConstants.GET_ALL_SALARY_INCREASE,
    payload: id,
  };
};

export const getAllSalaryIncreaseSuccess = (salaryIncrease) => {
  return {
    type: salaryIncreaseConstants.GET_ALL_SALARY_INCREASE_SUCCESS,
    payload: salaryIncrease,
  };
};

export const getAllSalaryIncreaseFail = (error) => {
  return {
    type: salaryIncreaseConstants.GET_ALL_SALARY_INCREASE_FAIL,
    payload: error,
  };
};

export const createSalaryIncrease = (employeeId, salaryIncrease) => {
  return {
    type: salaryIncreaseConstants.CREATE_SALARY_INCREASE,
    payload: { employeeId, salaryIncrease },
  };
};

export const createSalaryIncreaseSuccess = (salaryIncrease) => {
  return {
    type: salaryIncreaseConstants.CREATE_SALARY_INCREASE_SUCCESS,
    payload: salaryIncrease,
  };
};

export const createSalaryIncreaseFail = (error) => {
  return {
    type: salaryIncreaseConstants.CREATE_SALARY_INCREASE_FAIL,
    payload: error,
  };
};

export const updateSalaryIncrease = (salaryIncrease) => {
  return {
    type: salaryIncreaseConstants.UPDATE_SALARY_INCREASE,
    payload: salaryIncrease,
  };
};

export const updateSalaryIncreaseSuccess = (salaryIncrease) => {
  return {
    type: salaryIncreaseConstants.UPDATE_SALARY_INCREASE_SUCCESS,
    payload: salaryIncrease,
  };
};

export const updateSalaryIncreaseFail = (error) => {
  return {
    type: salaryIncreaseConstants.UPDATE_SALARY_INCREASE_FAIL,
    payload: error,
  };
};

export const deleteSalaryIncrease = (id) => {
  return {
    type: salaryIncreaseConstants.DELETE_SALARY_INCREASE,
    payload: id,
  };
};

export const deleteSalaryIncreaseSuccess = (id) => {
  return {
    type: salaryIncreaseConstants.DELETE_SALARY_INCREASE_SUCCESS,
    payload: id,
  };
};

export const deleteSalaryIncreaseFail = (error) => {
  return {
    type: salaryIncreaseConstants.DELETE_SALARY_INCREASE_FAIL,
    payload: error,
  };
};
