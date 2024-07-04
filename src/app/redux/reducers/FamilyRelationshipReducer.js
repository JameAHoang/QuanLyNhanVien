import * as familyRelationshipConstants from "../constants/FamilyRelationshipConstants";

const initialState = {
  listFamilyRelationship: [],
  loading: false,
  error: null,
};

const FamilyRelationshipReducer = (state = initialState, action) => {
  switch (action.type) {
    case familyRelationshipConstants.GET_FAMILYRELATIONSHIP:
    case familyRelationshipConstants.CREATE_FAMILYRELATIONSHIP:
    case familyRelationshipConstants.UPDATE_FAMILYRELATIONSHIP:
    case familyRelationshipConstants.DELETE_FAMILYRELATIONSHIP:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case familyRelationshipConstants.GET_FAMILYRELATIONSHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        listFamilyRelationship: action.payload,
      };

    case familyRelationshipConstants.GET_FAMILYRELATIONSHIP_FAIL:
    case familyRelationshipConstants.CREATE_FAMILYRELATIONSHIP_FAIL:
    case familyRelationshipConstants.UPDATE_FAMILYRELATIONSHIP_FAIL:
    case familyRelationshipConstants.DELETE_FAMILYRELATIONSHIP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case familyRelationshipConstants.CREATE_FAMILYRELATIONSHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        listFamilyRelationship: [
          action.payload,
          ...state.listFamilyRelationship,
        ],
      };

    case familyRelationshipConstants.UPDATE_FAMILYRELATIONSHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        listFamilyRelationship: state.listFamilyRelationship.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
      };

    case familyRelationshipConstants.DELETE_FAMILYRELATIONSHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        listFamilyRelationship: state.listFamilyRelationship.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default FamilyRelationshipReducer;
