
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import NewsPanel from "../NewsPanel";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {

const [votes,setVotes] = useState([])
const [candidates,setCandidates] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

Promise.all([
fetch("https://voting-system-6zk3.onrender.com/api/votes").then(res=>res.json()),
fetch("https://voting-system-6zk3.onrender.com/api/candidates").then(res=>res.json())
])
.then(([votesData,candidateData])=>{
setVotes(votesData)
setCandidates(candidateData)
setLoading(false)
})

},[])


const voteCount = candidates.map(c=>({
...c,
votes:votes.filter(v=>v.party===c.party).length
}))

const recentVotes = [...votes].reverse().slice(0,4)


const chartData = {
labels: voteCount.map(c=>c.name),
datasets:[
{
label:"Votes",
data:voteCount.map(c=>c.votes),
// borderColor:"rgba(200,5,600,2)",
backgroundColor:"rgba(168,85,247,0.8)",
borderRadius:8
}
]
}

const chartOptions = {
responsive:true,
plugins:{legend:{display:false}},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}


if(loading){
return(

<div className="flex items-center justify-center h-screen bg-slate-950">

<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid"></div>

</div>

)
}


return(

<div className="flex min-h-screen bg-slate-950 text-white">

{/* Sidebar */}

<div className="w-64 bg-slate-800 p-6 hidden md:block">

<h1 className="text-3xl font-bold mb-10 text-purple-400">
E-Vote
</h1>

<ul className="space-y-4">

<li className="bg-purple-600 p-4 rounded-lg flex items-center gap-3">
<i className="fas fa-chart-line"></i> Dashboard
</li>

{/* <li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
<i className="fas fa-vote-yea"></i> Elections
</li> */}

<li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
<i className="fas fa-user-tie"></i>
<Link to="/candidates" className="text-gray-300 hover:text-purple-400">
Candidates
</Link>
</li>

<li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
<i className="fas fa-users"></i>
<Link to="/voters" className="text-gray-300 hover:text-purple-400">
Voter List
</Link>
</li>

<li className="hover:bg-slate-700 p-4 rounded-lg flex items-center gap-3">
<i className="fas fa-trophy"></i>
<Link to="/results" className="text-gray-300 hover:text-purple-400">
Results
</Link>
</li>

</ul>

</div>



{/* Main */}

<div className="flex-1 p-6 md:p-8">

<div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">

<h1 className="text-3xl md:text-4xl font-bold text-purple-400">
Voting Dashboard
</h1>

<Link to="/login">
<button className="flex items-center gap-2 bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition hover:scale-105 shadow-lg mt-4 md:mt-0">
<i className="fas fa-sign-in-alt"></i> Login
</button>
</Link>

</div>



{/* Stats */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

{/* Total Votes */}

<div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)] flex items-center gap-4 hover:scale-105 transition">

<i className="fas fa-check-circle text-4xl text-green-500"></i>

<div>
<h2 className="text-xl text-purple-400 font-semibold">
Total Votes
</h2>
<p className="text-3xl font-bold">{votes.length}</p>
</div>

</div>


{/* Total Voters */}

<div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)] flex items-center gap-4 hover:scale-105 transition">

<i className="fas fa-users text-4xl text-yellow-600"></i>

<div>
<h2 className="text-xl text-purple-400 font-semibold">
Total Voters
</h2>
<p className="text-3xl font-bold">{votes.length}</p>
</div>

</div>


{/* Candidates */}

<div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)] flex items-center gap-4 hover:scale-105 transition">

<i className="fas fa-user-tie text-4xl text-blue-500"></i>

<div>
<h2 className="text-xl text-purple-400 font-semibold">
Candidates
</h2>
<p className="text-3xl font-bold">{candidates.length}</p>
</div>

</div>

</div>



{/* Chart + Recent Votes */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

{/* Chart */}

<div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.3)]">

<h2 className="text-2xl mb-4 text-purple-400">
Candidate Votes
</h2>

<Bar data={chartData} options={chartOptions} />

</div>



{/* Recent Votes */}

<div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.3)]">

<h2 className="text-2xl mb-4 text-purple-400">
Recent Votes
</h2>

<ul className="space-y-4 text-gray-300">

{recentVotes.map((vote,index)=>(

<li key={index} className="border-b border-gray-700 pb-2">

{index+1}) <span className="text-white font-semibold">{vote.name}</span> voted for <span className="text-purple-400">{vote.party}</span>

</li>

))}

</ul>

</div>

</div>


<NewsPanel/>

</div>

</div>

)

}

export default Dashboard