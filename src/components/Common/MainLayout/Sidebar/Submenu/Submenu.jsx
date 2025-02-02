import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SubmenuItem } from "./SubmenuItem";

const Submenu = () => {
  return (
    <>
      <SubMenuContainer>
        {SubmenuItem.map((item) => (
          <SubMenuItem
            key={item.id}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {item.title}
          </SubMenuItem>
        ))}
      </SubMenuContainer>
    </>
  );
};

export default Submenu;

const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
`;

const SubMenuItem = styled(NavLink)`
  width: 200px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #000;
  transition: background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease;
  font-family: "42dot Sans", serif;

  &:hover {
    background-color: #f3f3f3;
  }

  &:link {
    text-decoration: none;
  }

  &.active {
    background-color: #e7f5f7;
    color: #42b8c8;
    font-weight: 700;
  }
`;
