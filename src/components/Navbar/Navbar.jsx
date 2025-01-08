import React from "react";
import { useGlobalContext } from "../../AppContext";
import { FaBars } from "react-icons/fa";
import Pikachu from "../../assets/P.png";

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
                {/* <FaBars /> */}
                <img
                  src={user.pokemon?.image || Pikachu}
                  alt={user.pokemon?.name || "Pikachu"}
                  className="pokemon-image"
                  style={
                    user.pokemon?.image
                      ? {}
                      : {
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          border: "2px solid gold",
                          boxShadow: "0 0 10px rgba(255, 215, 0, 0.8)",
                          objectFit: "cover",
                          transition: "transform 0.3s ease-in-out",
                          marginLeft: "10px",
                        }
                  }
                />
              </button>
              <h1 style={{ fontSize: "large", marginRight: "10px" }}>
                {user?.username || "Sanora"}
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
