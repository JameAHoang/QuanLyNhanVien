import * as proposalConstants from "../constants/ProposalConstants";

export const getAllProposal = (id) => {
  return {
    type: proposalConstants.GET_ALL_PROPOSAL,
    payload: id,
  };
};

export const getAllProposalSuccess = (proposal) => {
  return {
    type: proposalConstants.GET_ALL_PROPOSAL_SUCCESS,
    payload: proposal,
  };
};

export const getAllProposalFail = (error) => {
  return {
    type: proposalConstants.GET_ALL_PROPOSAL_FAIL,
    payload: error,
  };
};

export const createProposal = (employeeId, proposal) => {
  return {
    type: proposalConstants.CREATE_PROPOSAL,
    payload: { employeeId, proposal },
  };
};

export const createProposalSuccess = (proposal) => {
  return {
    type: proposalConstants.CREATE_PROPOSAL_SUCCESS,
    payload: proposal,
  };
};

export const createProposalFail = (error) => {
  return {
    type: proposalConstants.CREATE_PROPOSAL_FAIL,
    payload: error,
  };
};

export const updateProposal = (proposal) => {
  return {
    type: proposalConstants.UPDATE_PROPOSAL,
    payload: proposal,
  };
};

export const updateProposalSuccess = (proposal) => {
  return {
    type: proposalConstants.UPDATE_PROPOSAL_SUCCESS,
    payload: proposal,
  };
};

export const updateProposalFail = (error) => {
  return {
    type: proposalConstants.UPDATE_PROPOSAL_FAIL,
    payload: error,
  };
};

export const deleteProposal = (id) => {
  return {
    type: proposalConstants.DELETE_PROPOSAL,
    payload: id,
  };
};

export const deleteProposalSuccess = (id) => {
  return {
    type: proposalConstants.DELETE_PROPOSAL_SUCCESS,
    payload: id,
  };
};

export const deleteProposalFail = (error) => {
  return {
    type: proposalConstants.DELETE_PROPOSAL_FAIL,
    payload: error,
  };
};
