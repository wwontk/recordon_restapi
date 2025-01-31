import styled from "styled-components";

const Sidebar = () => {
  return (
    <>
      <SidebarContainer></SidebarContainer>
    </>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 180px;
  height: 100vh;
  background-color: #ccc;
  position: fixed;
`;
