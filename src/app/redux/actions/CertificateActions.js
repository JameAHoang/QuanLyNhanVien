import * as certificateConstants from "../constants/CertificateConstants";

export const getCertificates = (id) => {
  return {
    type: certificateConstants.GET_CERTIFICATES,
    payload: id,
  };
};

export const getCertificatesSuccess = (certificates) => {
  return {
    type: certificateConstants.GET_CERTIFICATES_SUCCESS,
    payload: certificates,
  };
};

export const getCertificateFail = (error) => {
  return {
    type: certificateConstants.GET_CERTIFICATES_FAIL,
    payload: error,
  };
};

export const createCertificate = (employeeId, certificate) => {
  return {
    type: certificateConstants.CREATE_CERTIFICATE,
    payload: { employeeId, certificate },
  };
};

export const createCertificateSuccess = (certificate) => {
  return {
    type: certificateConstants.CREATE_CERTIFICATE_SUCCESS,
    payload: certificate,
  };
};

export const createCertificateFail = (error) => {
  return {
    type: certificateConstants.CREATE_CERTIFICATE_FAIL,
    payload: error,
  };
};

export const updateCertificate = (certificate) => {
  return {
    type: certificateConstants.UPDATE_CERTIFICATE,
    payload: certificate,
  };
};

export const updateCertificateSuccess = (certificate) => {
  return {
    type: certificateConstants.UPDATE_CERTIFICATE_SUCCESS,
    payload: certificate,
  };
};

export const updateCertificateFail = (error) => {
  return {
    type: certificateConstants.UPDATE_CERTIFICATE_FAIL,
    payload: error,
  };
};

export const deleteCertificate = (id) => {
  return {
    type: certificateConstants.DELETE_CERTIFICATE,
    payload: id,
  };
};

export const deleteCertificateSuccess = (id) => {
  return {
    type: certificateConstants.DELETE_CERTIFICATE_SUCCESS,
    payload: id,
  };
};

export const deleteCertificateFail = (error) => {
  return {
    type: certificateConstants.DELETE_CERTIFICATE_FAIL,
    payload: error,
  };
};
