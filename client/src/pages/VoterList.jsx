
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const VoterList = () => {

  const [voters, setVoters] = useState([]);

  // Fetch voters
  useEffect(() => {

    const fetchVoters = async () => {

      try {

        const res = await fetch("https://voting-system-6zk3.onrender.com/api/votes");
        const data = await res.json();

        setVoters(data);

      } catch (error) {

        console.error("Error fetching voters:", error);

      }

    };

    fetchVoters();

  }, []);

  const totalVoters = voters.length;

  // Party wise count
  const partyCounts = voters.reduce((acc, v) => {

    acc[v.party] = (acc[v.party] || 0) + 1;
    return acc;

  }, {});

  // Short party names
  const partyShort = {
    "Bharatiya Janata Party": "BJP",
    "Indian National Congress": "INC",
    "Aam Aadmi Party": "AAP",
    "Samajwadi Party": "SP",
    "Bahujan Samaj Party": "BSP"
  };

  const colors = [
    "rgba(255,153,0,0.7)",
    "rgba(0,128,255,0.7)",
    "rgba(0,200,83,0.7)",
    "rgba(168,85,247,0.7)",
    "rgba(255,99,132,0.7)"
  ];

  const hoverColors = [
    "rgba(255,153,0,1)",
    "rgba(0,128,255,1)",
    "rgba(0,200,83,1)",
    "rgba(168,85,247,1)",
    "rgba(255,99,132,1)"
  ];

  const pieData = {
    labels: Object.keys(partyCounts)
      .slice(0, 5)
      .map(p => partyShort[p] || p),

    datasets: [
      {
        label: "Votes",
        data: Object.values(partyCounts).slice(0, 5),
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
        hoverOffset: 12
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: { size: 16 }
        }
      }
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-purple-400 mb-10">
          Voter Dashboard
        </h1>

        {/* Stats Boxes */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">

          {/* Total Voters */}

          <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_20px_rgba(168,85,247,0.6)]
          hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]
          hover:-translate-y-1 transition-all duration-300 cursor-pointer">

            <div className="flex items-center gap-3 text-purple-400 text-xl mb-2">
              <i className="fas fa-users text-green-500"></i>
              Total Voters
            </div>

            <p className="text-3xl font-bold">
              {totalVoters}
            </p>

          </div>

          {/* Parties */}

          <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_20px_rgba(168,85,247,0.6)]
          hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]
          hover:-translate-y-1 transition-all duration-300 cursor-pointer">

            <div className="flex items-center gap-3 text-purple-400 text-xl mb-2">
              <i className="fas fa-flag text-blue-500"></i>
              Parties
            </div>

            <p className="text-3xl font-bold">
              {Object.keys(partyCounts).length}
            </p>

          </div>

          {/* States */}

          <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_20px_rgba(168,85,247,0.6)]
          hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]
          hover:-translate-y-1 transition-all duration-300 cursor-pointer">

            <div className="flex items-center gap-3 text-purple-400 text-xl mb-2">
              <i className="fas fa-map-marker-alt text-yellow-500"></i>
              States
            </div>

            <p className="text-3xl font-bold">
              {[...new Set(voters.map(v => v.state))].length}
            </p>

          </div>

        </div>

        {/* Table + Chart Section */}

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Voter Table */}

          <div className="flex-1 bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_30px_rgba(168,85,247,0.5)] overflow-x-auto">

            <h2 className="text-xl mb-4">
              Voter List
            </h2>

            <table className="w-full text-left text-gray-300">

              <thead className="border-b border-gray-700 text-gray-400">

                <tr>
                  <th className="pb-2">ID</th>
                  <th>Name</th>
                  <th>State</th>
                  <th>Party</th>
                </tr>

              </thead>

              <tbody>

                {voters.map((v, index) => (

                  <tr
                    key={v._id}
                    className="border-b border-gray-700 hover:bg-slate-800 transition"
                  >

                    <td>{index + 1}</td>
                    <td>{v.name}</td>
                    <td>{v.state}</td>
                    <td>{partyShort[v.party] || v.party}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Pie Chart */}

          <div className="w-full lg:w-1/3  bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_30px_rgba(168,85,247,0.5)] h-96 flex flex-col items-center justify-center">

            <h2 className="text-3xl mb-4">
              Vote Distribution
            </h2>

            <div className="w-80  ">
              <Pie data={pieData} options={pieOptions}  height={210}  />
            </div>

          </div>

        </div>

      </div>

    </div>
  );

};

export default VoterList;