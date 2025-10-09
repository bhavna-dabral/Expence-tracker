import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { signout } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";
import { Menu, X } from "lucide-react";
import axios from "axios";

function Navigation({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(avatar);

  // 🔹 Toggle hamburger menu
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 🔹 Upload avatar
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
    }
  };

  // 🔹 Logout function (MERN backend)
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <NavStyled>
      {/* Top Section */}
      <div className="user-con">
        <div className="avatar-con">
          <label htmlFor="avatar-upload">
            <img src={userAvatar} alt="User Avatar" />
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </div>
        <div className="text">
          <h2>Bhavna</h2>
          <p>Your Money</p>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="menu-toggle" onClick={handleToggleMenu}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>
      </div>

      {/* Menu Items */}
      <ul className={`menu-items ${menuOpen ? "show" : ""}`}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setMenuOpen(false);
            }}
            className={active === item.id ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>

      {/* Bottom Section */}
      <div className="bottom-nav">
        <ul>
          <li onClick={handleLogout}>
            {signout} <span>Sign Out</span>
          </li>
        </ul>
      </div>
    </NavStyled>
  );
}

export default Navigation;

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100vh;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  /* USER SECTION */
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;

    .avatar-con {
      position: relative;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        padding: 0.2rem;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          opacity: 0.8;
        }
      }
      input {
        display: none;
      }
    }

    .text {
      h2 {
        color: rgba(34, 34, 96, 1);
        font-size: 1.2rem;
      }
      p {
        color: rgba(34, 34, 96, 0.6);
        font-size: 0.9rem;
      }
    }

    .menu-toggle {
      display: none;
      margin-left: auto;
      cursor: pointer;
      color: rgba(34, 34, 96, 0.7);
      transition: color 0.3s ease;
      &:hover {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  /* MENU ITEMS */
  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    transition: max-height 0.3s ease;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  /* BOTTOM NAV */
  .bottom-nav {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        color: rgba(34, 34, 96, 0.7);
        transition: color 0.3s;
        &:hover {
          color: rgba(34, 34, 96, 1);
        }
      }
    }
  }

  /* ACTIVE MENU ITEM */
  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  /* 📱 MOBILE STYLES */
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    border-radius: 20px;
    padding: 1rem;
    flex-direction: column;

    .user-con {
      height: auto;
      img {
        width: 56px;
        height: 56px;
      }
      .menu-toggle {
        display: block;
      }
    }

    .menu-items {
      display: none;
      &.show {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        background: rgba(252, 246, 249, 0.95);
        border-radius: 20px;
        padding: 1rem;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
      }
      li {
        margin: 0.5rem 0;
        padding-left: 0.5rem;
      }
    }

    .bottom-nav {
      ul {
        display: flex;
        justify-content: center;
      }
      li {
        font-size: 0.9rem;
      }
    }
  }
`;
