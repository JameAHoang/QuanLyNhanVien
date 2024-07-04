import * as certificateConstants from "../constants/CertificateConstants";

const initialState = {
  listCertificate: [],
  loading: false,
  error: null,
};

const CertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case certificateConstants.UPDATE_CERTIFICATE:
    case certificateConstants.DELETE_CERTIFICATE:
    case certificateConstants.CREATE_CERTIFICATE:
    case certificateConstants.GET_CERTIFICATES:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case certificateConstants.GET_CERTIFICATES_SUCCESS:
      return {
        ...state,
        loading: false,
        listCertificate: action.payload,
      };

    case certificateConstants.DELETE_CERTIFICATE_FAIL:
    case certificateConstants.CREATE_CERTIFICATE_FAIL:
    case certificateConstants.GET_CERTIFICATES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case certificateConstants.CREATE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        listCertificate: [action.payload, ...state.listCertificate],
      };

    case certificateConstants.UPDATE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        listCertificate: state.listCertificate.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
      };

    case certificateConstants.DELETE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        listCertificate: state.listCertificate.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default CertificateReducer;
