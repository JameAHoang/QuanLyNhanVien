import * as proposalConstants from "../constants/ProposalConstants";

const initialState = {
  listProposal: [],
  proposal: {},
  loading: false,
  error: null,
};

const ProposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case proposalConstants.UPDATE_PROPOSAL:
    case proposalConstants.DELETE_PROPOSAL:
    case proposalConstants.CREATE_PROPOSAL:
    case proposalConstants.GET_ALL_PROPOSAL:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case proposalConstants.GET_ALL_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        listProposal: action.payload,
      };

    case proposalConstants.DELETE_PROPOSAL_FAIL:
    case proposalConstants.CREATE_PROPOSAL_FAIL:
    case proposalConstants.GET_ALL_PROPOSAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case proposalConstants.CREATE_PROPOSAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        listProposal: [action.payload, ...state.listProposal],
        proposal: action.payload,
      };
    }

    case proposalConstants.UPDATE_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        listProposal: state.listProposal.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
        proposal: action.payload,
      };

    case proposalConstants.DELETE_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        listProposal: state.listProposal.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default ProposalReducer;
