import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";

function MainLayout() {
  return (
    <>
      <Sidebar />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </>
  );
}

export default MainLayout;

const ContentArea = styled.div`
  width: calc(100% - 180px);
  position: fixed;
  left: 180px;
`;
