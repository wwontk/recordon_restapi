import styled from "styled-components";
import ToggleMenu from "./ToggleMenu/ToggleMenu";
import { MenuItem } from "./SubmenuItem";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [openMenuPath, setOpenMenuPath] = useState(null);

  const currentMenu = MenuItem.find((item) =>
    item.subMenu.some((sub) => location.pathname.startsWith(sub.path))
  );

  const handleToggle = (clickedPath) => {
    if (currentMenu?.path === clickedPath) return;
    setOpenMenuPath((prev) => (prev === clickedPath ? null : clickedPath));
  };

  return (
    <SidebarContainer>
      {MenuItem.map((item) => {
        const isCurrent = currentMenu?.path === item.path;
        const isOpen = isCurrent || openMenuPath === item.path;

        return (
          <ToggleMenu
            key={item.path}
            item={item}
            isOpen={isOpen}
            isCurrent={isCurrent}
            onToggle={() => handleToggle(item.path)}
          />
        );
      })}
    </SidebarContainer>
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
