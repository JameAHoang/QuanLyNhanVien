import * as processConstants from "../constants/ProcessConstants";

export const getAllProcess = (id) => {
  return {
    type: processConstants.GET_ALL_PROCESS,
    payload: id,
  };
};

export const getAllProcessSuccess = (process) => {
  return {
    type: processConstants.GET_ALL_PROCESS_SUCCESS,
    payload: process,
  };
};

export const getAllProcessFail = (error) => {
  return {
    type: processConstants.GET_ALL_PROCESS_FAIL,
    payload: error,
  };
};

export const createProcess = (employeeId, process) => {
  return {
    type: processConstants.CREATE_PROCESS,
    payload: { employeeId, process },
  };
};

export const createProcessSuccess = (process) => {
  return {
    type: processConstants.CREATE_PROCESS_SUCCESS,
    payload: process,
  };
};

export const createProcessFail = (error) => {
  return {
    type: processConstants.CREATE_PROCESS_FAIL,
    payload: error,
  };
};

export const updateProcess = (process) => {
  return {
    type: processConstants.UPDATE_PROCESS,
    payload: process,
  };
};

export const updateProcessSuccess = (process) => {
  return {
    type: processConstants.UPDATE_PROCESS_SUCCESS,
    payload: process,
  };
};

export const updateProcessFail = (error) => {
  return {
    type: processConstants.UPDATE_PROCESS_FAIL,
    payload: error,
  };
};

export const deleteProcess = (id) => {
  return {
    type: processConstants.DELETE_PROCESS,
    payload: id,
  };
};

export const deleteProcessSuccess = (id) => {
  return {
    type: processConstants.DELETE_PROCESS_SUCCESS,
    payload: id,
  };
};

export const deleteProcessFail = (error) => {
  return {
    type: processConstants.DELETE_PROCESS_FAIL,
    payload: error,
  };
};
