
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