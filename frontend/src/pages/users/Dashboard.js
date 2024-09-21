import React, { useContext, useEffect, useState } from "react";
import { userType } from "libs/isAuth";
import Applicant from "./applicant";
import { useNavigate, useParams } from "react-router-dom";
import Recruiter from "./recruiter";
import Job from "./Job";

export function Dashboard() {
  let [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="bg-slate-50">
      <h2 className="text-4xl pt-10 font-semibold text-gray-900 leading-none text-center mb-2">
        Welcome back, Are you ready to manage your dashboard?
      </h2>
      <div className="pt-10 pb-20 w-10/12 mx-auto min-h-screen">
        <div className="flex justify-between w-full mt-6 gap-4 border-b border-gray-300 ">
          <div className="flex ">
            <button
              className={`${active === 0 ? "border-b-2 border-money text-money" : ""
                } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
              onClick={() => setActive(0)}
            >
              Applicant
            </button>

            <button
              className={`${active === 1 ? "border-b-2 border-money text-money" : ""
                } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
              onClick={() => setActive(1)}
            >
              Recruiter
            </button>
            <button
              className={`${active === 2 ? "border-b-2 border-money text-money" : ""
                } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
              onClick={() => setActive(2)}
            >
              Job
            </button>
          </div>
          <div>
          <button
            className="bg-black float-left px-2 h-10 text-white rounded-md"
            onClick={()=>navigate("/admin/announcement")}
          >
            Make an Announcement
          </button>

        </div>
        </div>
        {active === 0 ? (
          <Applicant id={id} />
        ) : active === 1 ? (
          <Recruiter id={id} />
        ) : (
          <Job id={id} />
        )}
      </div>
    </div>
  );
}
