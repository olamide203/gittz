import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const ReRouter = ({ path, defaultRoute }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === `/${path}` || location.pathname === `/${path}/`) {
      navigate(defaultRoute);
    }
  }, [location, navigate]);
  return (
    <div className="p-4 sm:p-10 text-white h-screen overflow-y-scroll">
      <Outlet />
    </div>
  );
};

export default ReRouter;
