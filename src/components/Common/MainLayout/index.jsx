import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Header from "../Header";

function MainLayout() {
  return (
    <>
      <Container>
        <Header />
        <div>
          <Sidebar />
          <ContentArea>
            <Outlet />
          </ContentArea>
        </div>
      </Container>
    </>
  );
}

export default MainLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  > div:nth-child(2) {
    display: flex;
    height: 100%;
    padding-top: 60px;
  }
`;

const ContentArea = styled.div`
  width: calc(100% - 220px);
  min-width: 1280px;
  height: 100%;
  overflow: auto;
`;
