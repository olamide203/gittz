import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import useUser from "../Hooks/useUser";
import { useNavigate } from "react-router-dom";
function Signup() {
  const { loggedOut } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedOut) {
      navigate("../dashboard");
    }
  }, [loggedOut]);
  return (
    <div className="grid h-screen">
      <div className="grid items-center justify-items-center justify-self-center self-start mt-12 bg-neutral rounded-xl relative w-72 sm:w-96 h-3/5 mx-auto grid-rows-4 gap-y-3 py-3">
        <div className="grid self-center justify-self-center bg-[url(/images/login.svg)] bg-contain bg-center bg-no-repeat w-full h-full row-span-3"></div>
        <a
          href={`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/github`}
          className="self-start bg-sky-600 hover:text-neutral px-8 sm:px-11 py-3 cursor-pointer rounded-full text-white shadow-xl active:scale-95 transition-all"
        >
          <FaGithub className="inline mx-2 sm:text-3xl" />
          Continue with GitHub
        </a>
        <p className="absolute -bottom-10 text-center text-xs font-medium text-white">
          By signing up, you are agreeing to our{" "}
          <a className="relative before:absolute before:-bottom-0.5 before:inline-block before:w-full before:h-0.5 before:bg-sky-600 before:origin-left transition-transform ease-in before:scale-x-60 hover:before:scale-x-100 duration-300 cursor-pointer whitespace-nowrap">
            terms and conditions
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
