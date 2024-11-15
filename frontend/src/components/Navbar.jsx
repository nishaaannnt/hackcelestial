import { Disclosure } from "@headlessui/react";
import logo from "assets/images/logo.png";
import HowIt from "./HowIt";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "./ProfileMenu";
import { userType } from "libs/isAuth";
import isAuth from "libs/isAuth";
import Blog from "./blog/Blog";

export default function Navbar() {
  const linkUrl = useLocation();

  return (
    <Disclosure as="nav" className="bg-[#FDF2EA] w-full shadow-md">

      <>
        <div className="flex justify-between h-24 py-6 md:w-10/12 w-11/12 mx-auto">
          {linkUrl.pathname.startsWith("/blog") && (
            <div className="flex">
              <img className="md:pl-5 pl-2 flex h-2 w-1" src={logo} alt="logo" />
              <Link className="flex pt-1 text-black" to="/blog">
                <h1 className="md:pl-2 pl-2 text-2xl sm:text-2xl md:text-3xl text-black font-medium hover:opacity-60">
                  LINK
                </h1>
                <FontAwesomeIcon icon={faBlog} />
              </Link>
              <div className="flex pt-0.5 pl-8 ">
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/"
                >
                  Home
                </Link>
                {/* {/* <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/blog/news"
                >
                  News
                </Link> */}
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/ai-resume"
                >
                  Resume Review
                </Link> 
              </div>
            </div>
          )}

          {!linkUrl.pathname.startsWith("/blog") && (
            <div className="flex">
              <Link className="flex pt-1" to="/">
                <img className="md:pl-5 pl-2" src={logo} alt="logo" />
                <h1 className="md:pl-2 pl-2 text-2xl sm:text-2xl md:text-3xl text-black font-medium hover:opacity-60">
                  LINK
                </h1>
              </Link>

              <div className="flex pt-0.5 pl-8">
                <HowIt />
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/jobs"
                >
                  Jobs
                </Link>

                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/companies"
                >
                  Recruiter
                </Link>


                <Blog />
              </div>
            </div>
          )}

          <div className="flex">
            {!linkUrl.pathname.startsWith("/blog") && (
              <>
                <MobileMenu />
                {isAuth() ? (
                  <>
                    {userType() === "recruiter" ? (
                      <Link
                        to="/create-new-job"
                        className="hidden sm:flex md:flex lg:flex xl:flex 2xl:flex  hover:opacity-80 cursor-pointer items-center font-semibold text-sm justify-center px-6 bg-black rounded-lg mr-8 text-white"
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-3" />
                        Create new job
                      </Link>
                    ) : (
                      ""
                    )}

                    <ProfileMenu type={userType} />
                  </>
                ) : (
                  <>
                    <Link
                      className="lg:block hidden text-black text-lg font-semibold pr-6 py-2 hover:opacity-60"
                      to="/sign-in"
                    >
                      Sign in
                    </Link>
                    <Link
                      className="lg:block hidden text-center transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg w-32 justify-center px-8 py-2 mb-1 bg-[#F8BD8D] text-white rounded-full text-lg font-semibold"
                      to="/sign-up"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </>
    </Disclosure>
  );
}
