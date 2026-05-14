


import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Candidates = () => {

  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {

    fetch("https://voting-system-6zk3.onrender.com/api/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data));

    fetch("https://voting-system-6zk3.onrender.com/api/votes")
      .then(res => res.json())
      .then(data => setVotes(data));

  }, []);

  // vote count same logic as dashboard
  const voteCount = candidates.map(candidate => {
    const count = votes.filter(v => v.party === candidate.party).length
    return { ...candidate, votes: count }
  })

  const chartData = {
    labels: voteCount.map(c => c.name),
    datasets: [
      {
        label: "Votes",
        data: voteCount.map(c => c.votes),
        backgroundColor: "rgba(168,85,247,0.8)",
        borderRadius: 8
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } }
    }
  }

  const totalCandidates = candidates.length
  const activeCandidates = candidates.filter(c => c.status === "Active").length
  const totalVotes = votes.length

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-purple-400 mb-10">
          Candidates Dashboard
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 p-5 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)]">
            <h2 className="text-gray-400 text-xl">Total Candidates</h2>
            <p className="text-2xl font-bold">{totalCandidates}</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)]">
            <h2 className="text-gray-400 text-xl">Active Candidates</h2>
            <p className="text-2xl font-bold">{activeCandidates}</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)]">
            <h2 className="text-gray-400 text-xl">Total Votes</h2>
            <p className="text-2xl font-bold">{totalVotes}</p>
          </div>

        </div>

        {/* Candidates Table */}

        <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 mb-10">

          <h2 className="text-lg mb-5 font-semibold">
            Candidates List
          </h2>

          <table className="w-full text-gray-300">

            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="pb-3">ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Party</th>
                <th className="pb-3">Votes</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>

              {voteCount.map((c, index) => (

                <tr key={c._id} className="border-b border-gray-700 hover:bg-slate-800">

                  <td className="py-3">{index + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.party}</td>
                  <td>{c.votes}</td>

                  <td className={c.status === "Active" ? "text-green-400" : "text-red-400"}>
                    {c.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Candidate Votes Chart (Dashboard wala) */}

        <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 h-96">

          <h2 className="text-lg mb-4 font-semibold">
            Candidate Votes
          </h2>

          <Bar data={chartData} options={chartOptions} />

        </div>

      </div>

    </div>
  )
}

export default Candidates