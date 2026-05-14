// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const AdminDashboard = () => {

//     const [votes, setVotes] = useState([])
//     const [candidates, setCandidates] = useState([])
//     const [voters, setVoters] = useState([])

//     useEffect(() => {

//         fetch("http://localhost:5000/api/votes")
//             .then(res => res.json())
//             .then(data => setVotes(data))

//         fetch("http://localhost:5000/api/candidates")
//             .then(res => res.json())
//             .then(data => setCandidates(data))

//         fetch("http://localhost:5000/api/voters")
//             .then(res => res.json())
//             .then(data => setVoters(data))

//     }, [])


//     const voteCount = candidates.map(candidate => {
//         const count = votes.filter(v => v.party === candidate.party).length
//         return { ...candidate, votes: count }
//     })


//     const recentVotes = [...votes].reverse().slice(0, 5)

//     const votedVoters = voters.filter(v => v.hasVoted).length


//     const chartData = {
//         labels: voteCount.map(c => c.name),
//         datasets: [
//             {
//                 label: "Votes",
//                 data: voteCount.map(c => c.votes),
//                 backgroundColor: "rgba(168,85,247,0.8)",
//                 borderRadius: 8
//             }
//         ]
//     }

//     const chartOptions = {
//         responsive: true,
//         plugins: { legend: { display: false } },
//         scales: {
//             x: { ticks: { color: "white" } },
//             y: { ticks: { color: "white" } }
//         }
//     }
// //updae candidaye status    
// const updateStatus = async (id,status)=>{

// await fetch(`http://localhost:5000/api/candidates/${id}`,{
// method:"PUT",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({status})
// })

// window.location.reload()

// }
// const deleteCandidate = async(id)=>{

// await fetch(`http://localhost:5000/api/candidates/${id}`,{
// method:"DELETE"
// })

// window.location.reload()

// }

//     return (

//         <div className="flex min-h-screen bg-slate-950 text-white">

//             {/* Sidebar */}

//             <div className="w-64 bg-slate-800 p-6 hidden md:block">

//                 <h1 className="text-3xl font-bold mb-10 text-purple-400">
//                     Admin Panel
//                 </h1>

//                 <ul className="space-y-4">

//                     <li className="bg-purple-600 p-4 rounded-lg flex items-center gap-3">
//                         <i className="fas fa-chart-line"></i>
//                         Dashboard
//                     </li>

//                     <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
//                         <i className="fas fa-user-tie"></i>
//                         <Link to="/candidates" className="text-gray-300 hover:text-purple-400">
//                             Candidates
//                         </Link>
//                     </li>

//                     <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
//                         <i className="fas fa-users"></i>
//                         <Link to="/voters" className="text-gray-300 hover:text-purple-400">
//                             Voter List
//                         </Link>
//                     </li>

//                     <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
//                         <i className="fas fa-trophy"></i>
//                         <Link to="/results" className="text-gray-300 hover:text-purple-400">
//                             Results
//                         </Link>
//                     </li>

//                     <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
//                         <i className="fas fa-sign-out-alt"></i>
//                         <Link to="/login" className="text-gray-300 hover:text-purple-400">
//                             Logout
//                         </Link>
//                     </li>

//                 </ul>

//             </div>



//             {/* Main */}

//             <div className="flex-1 p-8">

//                 <h1 className="text-4xl font-bold text-purple-400 mb-10">
//                     Admin Dashboard
//                 </h1>


//                 {/* Stats Boxes */}

//                 <div className="grid grid-cols-4 gap-8 mb-10">


//                     {/* Total Votes */}

//                     <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] flex items-center gap-4 hover:scale-105 transition">

//                         <i className="fas fa-vote-yea text-4xl text-purple-400"></i>

//                         <div>
//                             <h2 className="text-xl text-purple-400 font-semibold">
//                                 Total Votes
//                             </h2>

//                             <p className="text-3xl font-bold">
//                                 {votes.length}
//                             </p>
//                         </div>

//                     </div>



//                     {/* Total Voters */}

//                     <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] flex items-center gap-4 hover:scale-105 transition">

//                         <i className="fas fa-users text-4xl text-purple-400"></i>

//                         <div>
//                             <h2 className="text-xl text-purple-400 font-semibold">
//                                 Total Voters
//                             </h2>

//                             <p className="text-3xl font-bold">
//                                 {voters.length}
//                             </p>
//                         </div>

//                     </div>



//                     {/* Voted Users */}

//                     <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] flex items-center gap-4 hover:scale-105 transition">

//                         <i className="fas fa-check-circle text-4xl text-purple-400"></i>

//                         <div>
//                             <h2 className="text-xl text-purple-400 font-semibold">
//                                 Voted Users
//                             </h2>

//                             <p className="text-3xl font-bold">
//                                 {votedVoters}
//                             </p>
//                         </div>

//                     </div>



//                     {/* Candidates */}

//                     <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] flex items-center gap-4 hover:scale-105 transition">

//                         <i className="fas fa-user-tie text-4xl text-purple-400"></i>

//                         <div>
//                             <h2 className="text-xl text-purple-400 font-semibold">
//                                 Candidates
//                             </h2>

//                             <p className="text-3xl font-bold">
//                                 {candidates.length}
//                             </p>
//                         </div>

//                     </div>


//                 </div>



//                 {/* Chart + Recent Votes */}

//                 <div className="grid grid-cols-2 gap-8">


//                     {/* Chart */}

//                     <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 h-80 shadow-[0_0_25px_rgba(168,85,247,0.6)]">

//                         <h2 className="text-2xl mb-4 text-purple-400">
//                             Party Vote Distribution
//                         </h2>

//                         <Bar data={chartData} options={chartOptions} />

//                     </div>



//                     {/* Recent Votes */}

//                     <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.6)]">

//                         <h2 className="text-2xl mb-4 text-purple-400">
//                             Recent Votes
//                         </h2>

//                         <ul className="space-y-4 text-gray-300">

//                             {recentVotes.map((vote, index) => (

//                                 <li key={index} className="border-b border-gray-700 pb-2">

//                                     {index + 1}) <span className="text-white font-semibold">{vote.name}</span> voted for <span className="text-purple-400">{vote.party}</span>

//                                 </li>

//                             ))}

//                         </ul>

//                     </div>


//                 </div>

// {/* Candidate Management */}

// <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 mt-10 shadow-[0_0_25px_rgba(168,85,247,0.6)]">

// <h2 className="text-2xl text-purple-400 mb-6">
// Candidate Management
// </h2>

// <div className="flex gap-4 mb-6">

// <button
// className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700"
// onClick={()=>alert("Add Candidate Form Open")}
// >
// ➕ Add Candidate
// </button>

// <button
// className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700"
// onClick={()=>alert("Remove Candidate")}
// >
// ❌ Remove Candidate
// </button>

// <button
// className="bg-yellow-600 px-5 py-2 rounded-lg hover:bg-yellow-700"
// onClick={()=>alert("Update Status")}
// >
// 🔄 Update Status
// </button>

// </div>

// <table className="w-full text-gray-300">

// <thead className="border-b border-gray-700 text-gray-400">

// <tr>
// <th className="pb-3">#</th>
// <th className="pb-3">Name</th>
// <th className="pb-3">Party</th>
// <th className="pb-3">Status</th>
// <th className="pb-3">Action</th>
// </tr>

// </thead>

// <tbody>

// {candidates.map((c,index)=>(
// <tr key={c._id} className="border-b border-gray-700 hover:bg-slate-800">

// <td className="py-3">{index+1}</td>
// <td>{c.name}</td>
// <td>{c.party}</td>

// <td className={c.status === "Active" ? "text-green-400":"text-red-400"}>
// {c.status}
// </td>

// <td className="flex gap-3">

// <button
// className="bg-yellow-500 px-3 py-1 rounded"
// onClick={()=>updateStatus(c._id,"Inactive")}
// >
// Status
// </button>

// <button
// className="bg-red-600 px-3 py-1 rounded"
// onClick={()=>deleteCandidate(c._id)}
// >
// Delete
// </button>

// </td>

// </tr>
// ))}

// </tbody>

// </table>

// </div> 
//             </div>

//         </div>

//     )

// }

// export default AdminDashboard

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import AdminNews from "../AdminNews"
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {

    const [votes, setVotes] = useState([])
    const [candidates, setCandidates] = useState([])
    const [voters, setVoters] = useState([])

    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState("")
    const [party, setParty] = useState("")

    useEffect(() => {

        fetch("http://localhost:5000/api/votes")
            .then(res => res.json())
            .then(data => setVotes(data))

        fetch("http://localhost:5000/api/candidates")
            .then(res => res.json())
            .then(data => setCandidates(data))

        fetch("http://localhost:5000/api/voters")
            .then(res => res.json())
            .then(data => setVoters(data))

    }, [])


    const voteCount = candidates.map(candidate => {
        const count = votes.filter(v => v.party === candidate.party).length
        return { ...candidate, votes: count }
    })

    const recentVotes = [...votes].reverse().slice(0, 5)

    const votedVoters = voters.filter(v => v.hasVoted).length


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

    const deleteCandidate = async (id) => {

        await fetch(`http://localhost:5000/api/candidates/${id}`, {
            method: "DELETE"
        })

        setCandidates(candidates.filter(c => c._id !== id))

    }

    const addCandidate = async (e) => {

        e.preventDefault()

        const res = await fetch("http://localhost:5000/api/candidates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                party,
                status: "Active"
            })
        })

        const data = await res.json()

        setCandidates([...candidates, data])

        setName("")
        setParty("")
        setShowForm(false)

    }


    return (

        <div className="flex min-h-screen bg-slate-950 text-white">

            {/* Sidebar */}

            <div className="w-64 bg-slate-800 p-6 hidden md:block">

                <h1 className="text-3xl font-bold mb-10 text-purple-400">
                    Admin Panel
                </h1>

                <ul className="space-y-4">

                    <li className="bg-purple-600 p-4 rounded-lg flex items-center gap-3">
                        <i className="fas fa-chart-line"></i>
                        Dashboard
                    </li>

                    <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
                        <i className="fas fa-user-tie"></i>
                        <Link to="/candidates">Candidates</Link>
                    </li>

                    <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
                        <i className="fas fa-users"></i>
                        <Link to="/voters">Voter List</Link>
                    </li>

                    <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
                        <i className="fas fa-trophy"></i>
                        <Link to="/results">Results</Link>
                    </li>

                    <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
                        <i className="fas fa-sign-out-alt"></i>
                        <Link to="/">Logout</Link>
                    </li>

                </ul>

            </div>


            {/* Main */}

            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold text-purple-400 mb-10">
                    Admin Dashboard
                </h1>


                {/* Stats */}

                <div className="grid grid-cols-4 gap-8 mb-10">

                    <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 flex items-center gap-4">
                        <i className="fas fa-vote-yea text-4xl text-purple-400"></i>
                        <div>
                            <h2 className="text-xl text-purple-400">Total Votes</h2>
                            <p className="text-3xl">{votes.length}</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 flex items-center gap-4">
                        <i className="fas fa-users text-4xl text-purple-400"></i>
                        <div>
                            <h2 className="text-xl text-purple-400">Total Voters</h2>
                            <p className="text-3xl">{voters.length}</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 flex items-center gap-4">
                        <i className="fas fa-check-circle text-4xl text-purple-400"></i>
                        <div>
                            <h2 className="text-xl text-purple-400">Voted Users</h2>
                            <p className="text-3xl">{votedVoters}</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 flex items-center gap-4">
                        <i className="fas fa-user-tie text-4xl text-purple-400"></i>
                        <div>
                            <h2 className="text-xl text-purple-400">Candidates</h2>
                            <p className="text-3xl">{candidates.length}</p>
                        </div>
                    </div>

                </div>


                {/* Chart + Recent Votes */}

                <div className="grid grid-cols-2 gap-8">

                    <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 h-80">
                        <h2 className="text-2xl mb-4 text-purple-400">Party Vote Distribution</h2>
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-purple-500">
                        <h2 className="text-2xl mb-4 text-purple-400">Recent Votes</h2>

                        <ul className="space-y-4 text-gray-300">

                            {recentVotes.map((vote, index) => (

                                <li key={index} className="border-b border-gray-700 pb-2">

                                    {index + 1}) <span className="text-white">{vote.name}</span> voted for <span className="text-purple-400">{vote.party}</span>

                                </li>

                            ))}

                        </ul>

                    </div>

                </div>


                {/* Candidate Management */}

                <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 mt-10">

                    <div className="flex justify-between mb-6">

                        <h2 className="text-2xl text-purple-400">
                            Candidate Management
                        </h2>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700"
                        >
                            ➕ Add Candidate
                        </button>

                    </div>

                    <table className="w-full text-gray-300">

                        <thead className="border-b border-gray-700 text-gray-400">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Party</th>
                                <th>Votes</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {voteCount.map((c, index) => (

                                <tr key={c._id} className="border-b border-gray-700 hover:bg-slate-800">

                                    <td>{index + 1}</td>
                                    <td>{c.name}</td>
                                    <td>{c.party}</td>
                                    <td>{c.votes}</td>

                                    <td>

                                        <button
                                            onClick={() => deleteCandidate(c._id)}
                                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
<AdminNews/>
            </div>


            {/* Add Candidate Modal */}

            {showForm && (

                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">

                    <form
                        onSubmit={addCandidate}
                        className="bg-slate-900 p-8 rounded-xl border border-purple-500 w-96"
                    >

                        <h2 className="text-2xl text-purple-400 mb-6">
                            Add Candidate
                        </h2>

                        <input
                            type="text"
                            placeholder="Candidate Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 mb-4 bg-slate-800 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Party"
                            value={party}
                            onChange={(e) => setParty(e.target.value)}
                            className="w-full p-3 mb-6 bg-slate-800 rounded"
                        />

                        <div className="flex gap-4">

                            <button
                                type="submit"
                                className="bg-green-600 px-5 py-2 rounded hover:bg-green-700"
                            >
                                Add
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-red-600 px-5 py-2 rounded hover:bg-red-700"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


        </div>

    )

}

export default AdminDashboard