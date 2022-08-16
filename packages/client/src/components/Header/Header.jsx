import React from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { styled } from "@stitches/react";
import useUser from "../../Hooks/useUser";
import Tooltip from "../Tooltip";
import Avatar from "./Avatar";

const StyledHeader = styled("header", {
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: "1rem",
  paddingRight: "50px",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#0284c7",
  color: "White",
  height: "4rem",
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  zIndex: 9999,
  width: "100vw",
});

function Header({ toggleMenu, isVisible, closeMenu }) {
  const { user } = useUser();
  return (
    <StyledHeader>
      <div className="logo bg-sky-700 w-20 sm:w-52 h-full mx-auto">
        <NavLink to="/" className="text-xl">
          <BsFillLightningChargeFill className=" text-3xl px-1 mx-1 inline" />
          <span className="hide sm:inline-block">gitzz</span>
        </NavLink>
      </div>
      {/* {!user && (
        <button
          className="nav-toggle z-50"
          aria-controls="navigation__list"
          aria-expanded={isVisible}
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          {!isVisible && <AiOutlineMenu className="text-4xl" />}
          {isVisible && <IoMdClose className="text-4xl" />}
        </button>
      )} */}
      <nav>
        <ul
          id="navigation__list"
          className="navigation__list 
                z-40 gap-3 bg-neutral md:bg-sky-600"
          data-visible={isVisible}
        >
          {!user && (
            <>
              <li>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    ` capitalize text-base px-2 py-3 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-800" : ""
                    } ${isVisible ? "inline-flex w-full" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/signup"}
                  className={({ isActive }) =>
                    ` capitalize text-base px-2 py-3 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-800" : ""
                    } ${isVisible ? "inline-flex w-full" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <Tooltip
          element={<Avatar imageURL={user.data.avatar_url} />}
          tip={user.data.login}
          sideOffset={2}
        />
      )}
    </StyledHeader>
  );
}
// setting default props
Header.defaultProps = {
  text: "Hi there!",
};

export default Header;
