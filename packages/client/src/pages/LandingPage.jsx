import React from "react";
import { NavLink } from "react-router-dom";
import Accordion from "../components/Accordion";
import {
  BsCheckCircleFill,
  BsFillLightningChargeFill,
  BsShieldFillCheck,
} from "react-icons/bs";

function LandingPage() {
  return (
    <div className="landing">
      <div className=" text-white w-screen overflow-hidden aspect-square lg:aspect-[900/600] xl:aspect-[900/450] bg-no-repeat bg-center bg-cover lg:bg-[url('/images/waves-2.svg')] bg-[url('/images/waves-sm.svg')] sm:bg-[url('/images/waves-md.svg')] px-3 sm:px-6 md:px-16 lg:px-20 pt-10">
        <div className="grid grid-cols-5 max-w-screen-xl mx-auto gap-20">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="text-4xl md:text-7xl lg:text-5xl font-bold leading-tight sm:rotate-[-3deg] w-full">
              A fast and easy way to
              <span className="relative z-30 inline-block before:absolute before:bg-sky-700 before:block before:-inset-1 before:skew-y-[-3deg] mx-1.5">
                <span className="relative">Share</span>
              </span>
              your projects
            </h1>
            <p className="mt-5 rotate-[-3deg] w-full">
              share your projects and ideas with other developers in your
              community easily
            </p>
            <div className="mt-10 w-full">
              <NavLink
                to={"/login"}
                className="capitalize btn mr-3 bg-blue-700 text-white border-none px-10 rounded hover:scale-95"
              >
                Login
              </NavLink>

              <NavLink
                to={"/signup"}
                className="capitalize btn text-white hover:bg-blue-700 border-none rounded hover:scale-95"
              >
                Signup
              </NavLink>
            </div>
          </div>
          <div className="hide lg:col-span-3 lg:block">
            <div className="mockup-window border bg-base-300 aspect-[1334/750] border-gray-700 shadow-xl rotate-[5deg]">
              <div className="aspect-[667/375] bg-no-repeat bg-center bg-contain bg-[url('/images/laptop_mockup.png')] backdrop-blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-400 relative sm:-top-32 sm:-mb-32 pb-32 lg:px-32 lg:pt-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto gap-10 px-5 sm:px-20 pt-20">
          <div className="grid bg-neutral aspect-square max-w-sm  justify-self-center justify-center items-center p-5 rounded-lg">
            <div>
              <BsCheckCircleFill className="text-9xl text-white mx-auto my-5" />
              <h3 className="font-bold text-xl text-white text-center">
                Easy to use
              </h3>
              <p className="text-center">
                modern and accessible user interface
              </p>
            </div>
          </div>
          <div className="grid bg-neutral aspect-square max-w-xs justify-self-center justify-center items-center p-5 rounded-lg">
            <div>
              <BsFillLightningChargeFill className="text-9xl text-white mx-auto my-5" />
              <h3 className="font-bold text-xl text-white text-center">Fast</h3>
              <p className="text-center">
                loads real-time data from your github profile.
              </p>
            </div>
          </div>
          <div className="grid bg-neutral aspect-square max-w-sm  justify-self-center justify-center items-center p-5 rounded-lg">
            <div>
              <BsShieldFillCheck className="text-9xl text-white mx-auto my-5" />
              <h3 className="font-bold text-xl text-white text-center">
                Secure
              </h3>
              <p className="text-center">adheres to security best practices</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fafafa] px-10 py-20 w-full grid gap-10 text-slate-700">
        <div className="grid bg-slate-100 p-5 rounded-xl justify-center max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-auto max-w-5xl gap-8">
            <div className="w-full">
              <img
                src="/images/share-link.svg"
                alt="hello"
                className="aspect-square max-h-96 w-full sm:w-72"
              />
            </div>
            <div className="justify-self-center self-center">
              <p>
                gittz automatically generates the body of your tweets based on
                the description and topics of your github repositories, saving
                you time while still allowing you to edit the content if
                necessary
              </p>
            </div>
          </div>
        </div>
        <div className="grid bg-slate-100 p-5 rounded-xl justify-center max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-auto-2 max-w-5xl gap-8">
            <div className="justify-self-center self-center">
              <p>
                our advanced search functionality with filters and result
                pagination makes it easy for you to find other github users and
                repositories.
              </p>
            </div>
            <div>
              <img
                src="/images/search.svg"
                alt=""
                className="max-h-96 w-full sm:w-72"
              />
            </div>
          </div>
        </div>
        <div className="grid bg-slate-100 p-5 rounded-xl justify-center max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-auto max-w-5xl gap-8">
            <div>
              <img
                src="/images/social-dashboard.svg"
                alt=""
                className="max-h-96 h-full w-full sm:w-72"
              />
            </div>
            <div className="justify-self-center self-center">
              <p>
                gittz comes with a simple dashboard with a user friendly
                interface which displays useful user data in a easy to
                understand manner.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/images/wave-dark.svg')] aspect-square lg:aspect-[2/1] bg-center bg-no-repeat bg-cover relative text-white px-10 gap-10 max-w-full -top-20 pt-96">
        <div className="">
          <div className=" grid grid-cols-1 md:grid-cols-2 justify-center align-center gap-10">
            <div className="justify-self-end hide md:block">
              <div class="mockup-phone border-none -rotate-[5deg]">
                <div class="camera"></div>
                <div class="display">
                  <div class="artboard artboard-demo phone-1 bg-[url(/images/phone.png)] bg-contain"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <h3 className="font-bold md:text-5xl text-2xl sm:text-3xl justify-self-center md:self-end col-span-2">
                Give
                <span className="relative z-30 inline-block before:absolute before:bg-sky-700 before:block before:-inset-1 before:skew-y-[-3deg] mx-1.5">
                  <span className="relative">gittz</span>
                </span>{" "}
                a try today
              </h3>

              <NavLink
                to={"/login"}
                className="capitalize btn btn-md w-max text-white border-none px-10 rounded justify-self-end"
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                className="capitalize btn btn-md w-max bg-blue-700 text-white border-none px-10 rounded hover:scale-95"
              >
                Signup
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
