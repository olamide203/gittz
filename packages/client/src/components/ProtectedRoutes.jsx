import { Outlet, Navigate } from "react-router-dom";
import { SWRConfig } from "swr";
import {
  Provider as ToastProvider,
  Viewport as ToastViewport,
} from "@radix-ui/react-toast";
import Sidebar from "./Sidebar/Sidebar";
import fetcher from "../libs/fetcher";
import useUser from "../Hooks/useUser";
import Skeleton from "./Dashboard/Skeleton";
import { SearchProvider } from "../context/SearchContext";

const options = {
  revalidateOnFocus: false,
  fetcher,
};
const ProtectedRoutes = () => {
  const { loading, loggedOut, user } = useUser();
  if (loggedOut) {
    return <Navigate to="/login" />;
  }
  return (
    <SWRConfig value={options}>
      <ToastProvider swipeDirection="right">
        <SearchProvider>
          <div className="grid grid-cols-auto relative mt-16">
            {user && (
              <>
                <Sidebar />
                <Outlet />
              </>
            )}
            {loading && (
              <div className="col-span-2">
                <Skeleton />
              </div>
            )}
          </div>
        </SearchProvider>
        <ToastViewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-4 w-[400px] m-0 list-none z-[99999] outline-none" />
      </ToastProvider>
    </SWRConfig>
  );
};

export default ProtectedRoutes;
