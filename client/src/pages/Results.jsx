
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Results = () => {

  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {

    fetch("https://voting-system-6zk3.onrender.com/api/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.log(err));

    fetch("https://voting-system-6zk3.onrender.com/api/votes")
      .then(res => res.json())
      .then(data => setVotes(data))
      .catch(err => console.log(err));

  }, []);

  // Vote counting
  const voteCount = candidates.map(candidate => {

    const count = votes.filter(v => v.party === candidate.party).length;

    return {
      ...candidate,
      votes: count
    };

  });

  const totalVotes = votes.length;

  const leadingCandidate =
    voteCount.length > 0
      ? voteCount.reduce((prev, curr) =>
          curr.votes > prev.votes ? curr : prev
        )
      : {};

  const data = {
    labels: voteCount.map(c => c.name),
    datasets: [
      {
        label: "Votes",
        data: voteCount.map(c => c.votes),
        backgroundColor: "rgba(168,85,247,0.7)",
        borderRadius: 10,
        hoverBackgroundColor: "rgba(168,85,247,1)"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "white", font: { size: 14 } }
      },
      y: {
        ticks: { color: "white", font: { size: 14 } }
      }
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-purple-400 mb-10">
          Election Results
        </h1>


        {/* Stats Boxes */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Total Candidates */}

          <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_20px_rgba(168,85,247,0.6)]
          hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]
          hover:-translate-y-1 transition-all duration-300 cursor-pointer">

            <div className="flex items-center gap-3  text-purple-400 text-lg mb-2">
              <i className="fas fa-user-tie text-green-500"></i>
              Total Candidates
            </div>

            <p className="text-3xl font-bold">
              {candidates.length}
            </p>

          </div>


          {/* Total Votes */}

          <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_20px_rgba(168,85,247,0.6)]
          hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]
          hover:-translate-y-1 transition-all duration-300 cursor-pointer">

            <div className="flex items-center gap-3 text-purple-400 text-lg mb-2">
              <i className="fas fa-vote-yea text-blue-500"></i>
              Total Votes
            </div>

            <p className="text-3xl font-bold">
              {totalVotes}
            </p>

          </div>


          {/* Leading Candidate */}

          <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_20px_rgba(168,85,247,0.6)]
          hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]
          hover:-translate-y-1 transition-all duration-300 cursor-pointer">

            <div className="flex items-center gap-3 text-purple-400 text-lg mb-2">
              <i className="fas fa-crown text-yellow-500"></i>
              Leading Candidate
            </div>

            <p className="text-xl font-bold">
              {leadingCandidate?.name || "N/A"}
            </p>

          </div>

        </div>


        {/* Table + Chart */}

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Table */}

          <div className="flex-1 bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_30px_rgba(168,85,247,0.5)] overflow-x-auto">

            <h2 className="text-xl mb-4">
              Vote Details
            </h2>

            <table className="w-full text-left text-gray-300">

              <thead className="border-b border-gray-700 text-gray-400">

                <tr>
                  <th>ID</th>
                  <th>Candidate</th>
                  <th>Party</th>
                  <th>Votes</th>
                </tr>

              </thead>

              <tbody>

                {voteCount.map((c, index) => (

                  <tr
                    key={c._id}
                    className="border-b border-gray-700 hover:bg-slate-800 transition "
                  >

                    <td className="py-2">{index + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.party}</td>
                    <td className="text-purple-400 font-bold">
                      {c.votes}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* Chart */}

          <div className="w-full lg:w-1/2 bg-slate-900 p-6 rounded-xl border border-purple-500 
          shadow-[0_0_30px_rgba(168,85,247,0.5)] h-96">

            <h2 className="text-xl mb-4">
              Votes Distribution
            </h2>

            <Bar data={data} options={options} />

          </div>

        </div>

      </div>

    </div>
  );

};

export default Results;