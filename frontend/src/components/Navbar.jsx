import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaCertificate,
  FaEnvelope,
} from "react-icons/fa";
import "../App.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  };

  // ✅ Close sidebar when clicking a nav link (mobile only)
  const closeSidebarOnClick = () => {
    if (window.innerWidth <= 900) {
      setIsOpen(false);
      document.body.classList.remove("menu-open");
    }
  };

  return (
    <>
      {/* Mobile menu icon */}
      <button className="menu-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay (background dim) */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Portfolio </h2>
        </div>

        <ul className="sidebar-menu">
          <li>
            <a href="#home" onClick={closeSidebarOnClick}>
              <FaHome className="icon" />
              <span className="label">Home</span>
            </a>
          </li>
          <li>
            <a href="#about" onClick={closeSidebarOnClick}>
              <FaUser className="icon" />
              <span className="label">About</span>
            </a>
          </li>
          <li>
            <a href="#experience" onClick={closeSidebarOnClick}>
              <FaBriefcase className="icon" />
              <span className="label">Experience</span>
            </a>
          </li>
          <li>
            <a href="#projects" onClick={closeSidebarOnClick}>
              <FaCode className="icon" />
              <span className="label">Projects</span>
            </a>
          </li>
          <li>
            <a href="#education" onClick={closeSidebarOnClick}>
              <FaGraduationCap className="icon" />
              <span className="label">Education</span>
            </a>
          </li>
          <li>
            <a href="#certifications" onClick={closeSidebarOnClick}>
              <FaCertificate className="icon" />
              <span className="label">Certifications</span>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={closeSidebarOnClick}>
              <FaEnvelope className="icon" />
              <span className="label">Contact</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
