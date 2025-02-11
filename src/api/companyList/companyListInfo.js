import axiosInstance from "../../utils/axios";

// RecordON 회사 조건 조회
export const searchCompany = (option) => {
  return axiosInstance.get(`/company/search`, { params: option });
};

// RecordON 모든 회사 조회
export const searchAllCompany = () => {
  return axiosInstance.get(`/company`);
};

// ********************** //

// RecordON 회사 상세 조회
export const searchCompanyDetail = (companyId) => {
  return axiosInstance.get(`/company/${companyId}`);
};

// 회사 상세 정보 수정
export const updateCompanyDetail = (companyId, data) => {
  return axiosInstance.put(`/company/${companyId}`, JSON.stringify(data));
};

// 회사 삭제
export const deleteCompany = (companyId) => {
  return axiosInstance.delete(`/company/${companyId}`);
};
