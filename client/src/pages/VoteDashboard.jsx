
import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faCalendar,
  faIdCard,
  faVoteYea,
  faVenusMars,
  faMapMarkerAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";



const VoteDashboard = () => {

  const { state } = useLocation();

  
  console.log("📦 Full router state received:", state);

  const voterInfo = {
    name: state?.name || "N/A",
    email: state?.email || "N/A",
    dob: state?.dob || "N/A",
    voterId: state?.voterId || "N/A",
    party: state?.party || "N/A",
    gender: state?.gender || "N/A",
    state: state?.state || "N/A",
    faceImage: state?.faceImage || null
  };

  
  // DEBUG CHECK FOR EACH FIELD
  Object.entries(voterInfo).forEach(([key, value]) => {

    if (value === null || value === undefined || value === "") {
      console.warn(`⚠️ ${key} is empty ->`, value);
    }

    if (typeof value === "object") {
      console.error(`❌ ${key} is OBJECT (should be string) ->`, value);
    }

    if (typeof value === "string") {
      console.log(`✅ ${key} OK ->`, value);
    }

    
  });

  
  

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-auto p-5">

      {/* background glow */}
      <div className="absolute w-[450px] h-[450px] bg-purple-600 rounded-full blur-3xl opacity-20 -top-24 -left-24"></div>
      <div className="absolute w-[450px] h-[450px] bg-purple-500 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>

      <div className="relative bg-slate-800 p-8 md:p-12 rounded-2xl border border-purple-500 w-full max-w-md shadow-2xl shadow-purple-900/40">

        <h2 className="text-4xl font-bold text-purple-400 mb-6 text-center">
          Vote Submitted ✅
        </h2>

        {/* FACE IMAGE */}
        {voterInfo.faceImage && typeof voterInfo.faceImage === "string" && (
          <div className="flex justify-center mb-6">
            <img
              src={voterInfo.faceImage}
              alt="Captured"
              className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
            />
          </div>
        )}

        <div className="text-gray-300 space-y-4 text-lg">

          <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} className="text-purple-400 text-xl" />
            <span className="font-semibold text-white">Name:</span>
            {typeof voterInfo.name === "string" ? voterInfo.name : "N/A"}
          </p>

          <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-purple-400 text-xl" />
            <span className="font-semibold text-white">Email:</span>
            {typeof voterInfo.email === "string" ? voterInfo.email : "N/A"}
          </p>

          {/* <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCalendar} className="text-purple-400 text-xl" />
            <span className="font-semibold text-white">DOB:</span>
            {typeof voterInfo.dob === "string"
              ? voterInfo.dob.slice(0, 10)
              : "N/A"}
          </p> */}

          {/* <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faIdCard} className="text-purple-400 text-xl" />
            <span className="font-semibold text-white">Voter ID:</span>
            {typeof voterInfo.voterId === "string" ? voterInfo.voterId : "N/A"}
          </p> */}

          <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faVoteYea} className="text-purple-400 text-xl" />
            <span className="font-semibold text-white">Party:</span>
            {typeof voterInfo.party === "string" ? voterInfo.party : "N/A"}
          </p>

          {/* <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faVenusMars} className="text-purple-400 text-xl" />
            <span className="font-semibold text-white">Gender:</span>
            {typeof voterInfo.gender === "string" ? voterInfo.gender : "N/A"}
          </p> */}

          <p className="flex items-center gap-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-purple-400 text-xl" />
            <span className="font-semibold text-white">State:</span>
            {typeof voterInfo.state === "string" ? voterInfo.state : "N/A"}
          </p>

        </div>
  <button
    onClick={() => (window.location.href = "/")}
    className="bg-gray-700 mt-8 ml-28 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gray-600"
  >
    ⬅ Back to Dashboard
  </button>
      </div>
    </div>
  );
};

export default VoteDashboard;


