import { useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Header from "../components/Header/Header";
import MetaDecorator from "../components/MetaDecorator";
import metadata from "../data/metadata.json";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";

function App() {
  const [width, height] = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const toggleMenu = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  };
  const closeMenu = () => {
    isVisible ? setIsVisible(false) : "";
  };
  useEffect(() => {
    if (width >= 768) {
      closeMenu();
    }
  }, [width]);
  return (
    <HelmetProvider>
      <MetaDecorator
        title={metadata.title}
        description={metadata.description}
        imageURL="https://www.gitsocial.net/images/meta.png"
      />
      <TooltipProvider>
        <Header
          pages={["login", "signup"]}
          toggleMenu={toggleMenu}
          isVisible={isVisible}
          closeMenu={closeMenu}
        />
        {isVisible && (
          <div
            className="absolute inset-y-0 inset-x-0 bg-gradient-to-l from-transparent to-transparent backdrop-blur h-full min-w-full z-20"
            onClick={closeMenu}
          ></div>
        )}
        <main className="w-screen h-max">
          <Outlet />
        </main>
      </TooltipProvider>
    </HelmetProvider>
  );
}

export default App;
