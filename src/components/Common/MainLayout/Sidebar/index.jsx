import styled from "styled-components";
import ToggleMenu from "./ToggleMenu/ToggleMenu";
import { MenuItem } from "./SubmenuItem";

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
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  background-color: #fff;
  border-right: 1px solid #d3d3d3;
  padding: 20px 20px;
`;
