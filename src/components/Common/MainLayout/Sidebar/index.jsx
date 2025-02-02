import styled from "styled-components";
import Submenu from "./Submenu/Submenu";

const Sidebar = () => {
  return (
    <>
      <SidebarContainer>
        <Submenu />
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 220px;
  height: 100vh;
  position: fixed;
  background-color: #f8f8f8;
  border-right: 1px solid #ccc;
`;
