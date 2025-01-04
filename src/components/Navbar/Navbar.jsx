import React from "react";
import { useGlobalContext } from "../../AppContext";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { login, logout, user, openSidebar } = useGlobalContext();

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          {!user ? (
            <LoginDialog login={login} />
          ) : (
            <>
              <button className="sidebar-toggle" onClick={openSidebar}>
                <FaBars />
              </button>
              <h1 style={{ fontSize: "large", marginRight: "10px" }}>
                {user.username}
              </h1>
              <button onClick={logout} className="btn logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
