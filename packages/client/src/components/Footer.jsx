import React from "react";
import { FaSlackHash } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="attribution bg-gray-700 text-primary-content w-screen">
      <FaSlackHash className="text-9xl mx-auto" />
      <p>
        Copyright
        <MdCopyright className="inline text-2xl" /> {footerYear}{" "}
        <a href="https://github.com/olamide203" className="after:bg-gray-300">
          Olamide Atitebi
        </a>
      </p>
    </footer>
  );
}

export default Footer;
