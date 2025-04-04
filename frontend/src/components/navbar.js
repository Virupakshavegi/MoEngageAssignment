import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import styled from "styled-components";

const NavbarContainer = styled.header`
  background: #1aac83;
  padding: 15px 0;
  color: white;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h1 {
    font-size: 24px;
    margin: 0;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  span {
    margin-right: 10px;
  }

  button {
    background: #e7195a;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: background 0.3s;

    &:hover {
      background: #c4164a;
    }
  }
`;

const SavedListsButton = styled(Link)`
  background: #007bff;
  color: white;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const AuthButton = styled(Link)`
  background: #f8f9fa;
  color: #333;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s;
  border: 1px solid #ddd;
  margin-left: 10px;

  &:hover {
    background: #e0e0e0;
  }
`;

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const currentLocation = useLocation();
  const handleClick = () => {
    logout();
    window.location.href = "/login";
  };
  return (
    <NavbarContainer>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/">
            <h1>CodePup 🐶</h1>
          </Link>
          {user && (
            <SavedListsButton
              to={currentLocation.pathname === "/lists" ? "/" : "/lists"}
            >
              {currentLocation.pathname === "/lists" ? "Back" : "Saved Lists"}
            </SavedListsButton>
          )}
        </div>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <AuthButton to="/login">Login</AuthButton>
              <AuthButton to="/signup">Signup</AuthButton>
            </div>
          )}
        </nav>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
