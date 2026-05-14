
// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-slate-800 p-6 hidden md:block min-h-screen">
//       <h1 className="text-3xl font-bold mb-10 text-purple-400">E-Vote</h1>

//       <ul className="space-y-4">

//         <li className="bg-purple-600 p-4 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105">
//           <i className="fas fa-chart-line text-lg transition transform hover:scale-125"></i>
//           <Link to="/" className="block text-white">Dashboard</Link>
//         </li>

//         <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 hover:translate-x-2">
//           <i className="fas fa-vote-yea text-lg"></i>
//           <Link to="/elections" className="block text-gray-300 hover:text-purple-400">Elections</Link>
//         </li>

//         <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 hover:translate-x-2">
//           <i className="fas fa-user-tie text-lg"></i>
//           <Link to="/candidates" className="block text-gray-300 hover:text-purple-400">Candidates</Link>
//         </li>

//         <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 hover:translate-x-2">
//           <i className="fas fa-users text-lg"></i>
//           <Link to="/voters" className="block text-gray-300 hover:text-purple-400">Voter List</Link>
//         </li>

//         <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 hover:translate-x-2">
//           <i className="fas fa-trophy text-lg"></i>
//           <Link to="/results" className="block text-gray-300 hover:text-purple-400">Results</Link>
//         </li>

//         <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 hover:translate-x-2">
//           <i className="fas fa-cog text-lg"></i>
//           <Link to="/settings" className="block text-gray-300 hover:text-purple-400">Settings</Link>
//         </li>

//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();
  const [loading,setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)

    setTimeout(()=>{
      setLoading(false)
    },500)
  }

  const menu = [
    {name:"Dashboard",icon:"fas fa-chart-line",path:"/"},
    // {name:"Elections",icon:"fas fa-vote-yea",path:"/elections"},
    {name:"Candidates",icon:"fas fa-user-tie",path:"/candidates"},
    {name:"Voter List",icon:"fas fa-users",path:"/voters"},
    {name:"Results",icon:"fas fa-trophy",path:"/results"},
    // {name:"Settings",icon:"fas fa-cog",path:"/settings"}
  ]

  return (

    <div className="w-64 bg-slate-800 p-6 hidden md:block">

      <h1 className="text-3xl font-bold mb-10 text-purple-400">
        E-Vote
      </h1>

      {loading && (
        <div className="w-full h-1 bg-purple-600 animate-pulse mb-4 rounded"></div>
      )}

      <ul className="space-y-3">

        {menu.map((item,index)=>{

          const active = location.pathname === item.path

          return(

            <li key={index}>

              <Link
                to={item.path}
                onClick={handleClick}
                className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300
                  
                  ${active
                    ? "bg-purple-600 text-white scale-105 shadow-lg"
                    : "hover:bg-slate-700 text-gray-300 hover:translate-x-2"
                  }
                  
                `}
              >

                <i className={`${item.icon} text-lg`}></i>
                {item.name}

              </Link>

            </li>

          )

        })}

      </ul>

    </div>

  );
};

export default Sidebar;