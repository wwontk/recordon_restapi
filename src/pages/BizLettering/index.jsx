import styled from "styled-components";
import Search from "../../assets/img/etc/search.png";
import { useState } from "react";
import SearchCompanyModal from "../../components/Content/SearchCompanyModal";
import CommonLettering from "../../components/Content/CommonLettering";
// import { DataGrid } from "react-data-grid";

const BizLettering = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <Container>
      <TitleHeader>
        <p>내번호알리미 이미지 등록 및 URL 생성</p>
      </TitleHeader>
      <CompanyInfo>
        <SearchButton onClick={() => setIsModalOpen(true)}>
          <img src={Search} alt="" />
          <p>회사 검색</p>
        </SearchButton>
        <div>
          <h3>회사정보</h3>
          <div>
            {selected ? (
              <>
                <SelectedInfo>
                  <div>
                    <label>회사명</label>
                    <p>{selected.companyName}</p>
                  </div>
                  <div>
                    <label>회사ID</label>
                    <p>{selected.companyId}</p>
                  </div>
                </SelectedInfo>
              </>
            ) : (
              <p>선택된 회사가 없습니다.</p>
            )}
          </div>
        </div>
      </CompanyInfo>
      <CommonRegister>
        <h3>회사별 공통 내알 등록</h3>
        {selected ? <CommonLettering /> : null}
      </CommonRegister>
      <LineRegister>
        <h3>회선별 내알 등록</h3>
      </LineRegister>
      {isModalOpen && (
        <SearchCompanyModal
          onClose={() => setIsModalOpen(false)}
          setSelected={setSelected}
        />
      )}
    </Container>
  );
};

export default BizLettering;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const TitleHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #d3d3d3;
  display: flex;
  align-items: center;
  padding-left: 40px;
`;

const CompanyInfo = styled.div`
  width: 100%;
  height: 170px;
  border-bottom: 1px solid #d3d3d3;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & > h3 {
      font-weight: 600;
    }
    & > div {
      & > p {
        font-size: 14px;
      }
    }
  }
`;

const SearchButton = styled.button`
  width: 320px;
  height: 32px;
  padding: 0 10px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bfbfbf;
`;

const CommonRegister = styled.div`
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #d3d3d3;
  padding: 20px 0 12px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > h3 {
    font-weight: 600;
  }
`;

const LineRegister = styled.div`
  flex: 1;
  padding: 20px 40px;
  & > h3 {
    font-weight: 600;
  }
`;

const SelectedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  & > div {
    display: flex;
    align-items: center;
    font-size: 14px;

    & > label {
      width: 100px;
    }
  }
`;
