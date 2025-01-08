import React from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { social, links } from "./../../data";
import { useGlobalContext } from "../../AppContext";
// import logo from "./../../logo.svg";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <aside className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
      <div className="sidebar-header">
        {/* <img src={logo} alt="ToDo" className="logo" /> */}
        <h1 className="TitleLogo">
          Todo <span>List</span>
        </h1>
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <NavLink
                to={url}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={closeSidebar}
              >
                {icon} {text}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <ul className="social-links">
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
