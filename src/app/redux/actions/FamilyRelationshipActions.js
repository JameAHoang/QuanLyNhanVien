import * as familyRelationshipConstants from "../constants/FamilyRelationshipConstants";

export const getFamilyRelationship = (id) => {
  return {
    type: familyRelationshipConstants.GET_FAMILYRELATIONSHIP,
    payload: id,
  };
};

export const getFamilyRelationshipSuccess = (familyrelationship) => {
  return {
    type: familyRelationshipConstants.GET_FAMILYRELATIONSHIP_SUCCESS,
    payload: familyrelationship,
  };
};

export const getFamilyRelationshipFail = (error) => {
  return {
    type: familyRelationshipConstants.GET_FAMILYRELATIONSHIP_FAIL,
    payload: error,
  };
};

export const createFamilyRelationship = (employeeId, familyRelationship) => {
  return {
    type: familyRelationshipConstants.CREATE_FAMILYRELATIONSHIP,
    payload: { employeeId, familyRelationship },
  };
};

export const createFamilyRelationshipSuccess = (familyRelationship) => {
  return {
    type: familyRelationshipConstants.CREATE_FAMILYRELATIONSHIP_SUCCESS,
    payload: familyRelationship,
  };
};

export const createFamilyRelationshipFail = (error) => {
  return {
    type: familyRelationshipConstants.CREATE_FAMILYRELATIONSHIP_FAIL,
    payload: error,
  };
};

export const updateFamilyRelationship = (familyRelationship) => {
  return {
    type: familyRelationshipConstants.UPDATE_FAMILYRELATIONSHIP,
    payload: familyRelationship,
  };
};

export const updateFamilyRelationshipSuccess = (familyRelationship) => {
  return {
    type: familyRelationshipConstants.UPDATE_FAMILYRELATIONSHIP_SUCCESS,
    payload: familyRelationship,
  };
};

export const updateFamilyRelationshipFail = (error) => {
  return {
    type: familyRelationshipConstants.UPDATE_FAMILYRELATIONSHIP_FAIL,
    payload: error,
  };
};

export const deleteFamilyRelationship = (id) => {
  return {
    type: familyRelationshipConstants.DELETE_FAMILYRELATIONSHIP,
    payload: id,
  };
};

export const deleteFamilyRelationshipSuccess = (id) => {
  return {
    type: familyRelationshipConstants.DELETE_FAMILYRELATIONSHIP_SUCCESS,
    payload: id,
  };
};

export const deleteFamilyRelationshipFail = (error) => {
  return {
    type: familyRelationshipConstants.DELETE_FAMILYRELATIONSHIP_FAIL,
    payload: error,
  };
};
