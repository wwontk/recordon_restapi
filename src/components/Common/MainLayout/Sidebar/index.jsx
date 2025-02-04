import styled from "styled-components";
import ToggleMenu from "./ToggleMenu/ToggleMenu";
import { MenuItem } from "./Submenu/SubmenuItem";

const Sidebar = () => {
  return (
    <>
      <SidebarContainer>
        {/* 토글메뉴 */}
        {MenuItem.map((item) => (
          <ToggleMenu key={item.path} item={item} />
        ))}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 220px;
  height: 100vh;
  position: fixed;
  background-color: #fff;
  border-right: 1px solid #d3d3d3;
  padding: 20px 0;
`;
