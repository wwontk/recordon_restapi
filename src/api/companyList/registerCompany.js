import axiosInstance from "../../utils/axios";

// RecordON 회사 등록
export const registerCompany = (data) => {
  return axiosInstance.post(`/company`, JSON.stringify(data));
};

// iq200 회사 리스트 조회
export const searchIQ200CompanyList = () => {
  return axiosInstance.get(`/iq200/company`);
};

// iq200 회사 상세 조회
export const searchIQ200CompDetail = (option) => {
  return axiosInstance.get(`/iq200/company`, { params: option });
};

// iq200 회사 솔루션사, 고객사 구분 조회
export const searchIQ200bySales = (option) => {
  return axiosInstance.get(`/iq200/company`, { params: option });
};
