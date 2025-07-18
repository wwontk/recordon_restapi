import styled from "styled-components";
import dropdownArrow from "../../../../../assets/img/etc/chevron-down.png";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ToggleMenuItem = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f3f3;
  }

  img {
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;

const SubMenuContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: end;

  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0px")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out;
`;

const SubMenuItem = styled(NavLink)`
  display: flex;
  width: 180px;
  height: 40px;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  color: #000;
  transition: background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease;

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

const ToggleMenu = ({ item, isOpen, onToggle, isCurrent }) => {
  return (
    <Container>
      <ToggleMenuItem
        onClick={onToggle}
        $isOpen={isOpen}
        $isCurrent={isCurrent}
      >
        <p>{item.menuTitle}</p>
        <img src={dropdownArrow} alt="toggle" />
      </ToggleMenuItem>
      <SubMenuContainer $isOpen={isOpen}>
        {item.subMenu.map((sub) => (
          <SubMenuItem
            key={sub.path}
            to={sub.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {sub.title}
          </SubMenuItem>
        ))}
      </SubMenuContainer>
    </Container>
  );
};

ToggleMenu.propTypes = {
  item: PropTypes.shape({
    menuTitle: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    subMenu: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleMenu;
