import React, { useEffect, useState } from "react"

const AdminNews = () => {

const [news,setNews] = useState([])
const [title,setTitle] = useState("")
const [message,setMessage] = useState("")
const [editingId,setEditingId] = useState(null)


// load news
useEffect(()=>{

fetch("https://voting-system-6zk3.onrender.com/api/news")
.then(res=>res.json())
.then(data=>setNews(data))

},[])



// add news
const addNews = async ()=>{

if(!title || !message) return alert("Fill all fields")

const res = await fetch("https://voting-system-6zk3.onrender.com/api/news",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title,message})
})

const data = await res.json()

setNews([...news,data])

setTitle("")
setMessage("")

// 🔥 show which emails got notification
if(data.sentTo && data.sentTo.length > 0){
alert(`News sent to:\n${data.sentTo.join(", ")}`)
} else {
alert("News posted but no emails sent")
}

}



// update news
const updateNews = async ()=>{

await fetch(`https://voting-system-6zk3.onrender.com/api/news/${editingId}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title,message})
})

window.location.reload()

}



// delete news
const deleteNews = async(id)=>{

await fetch(`https://voting-system-6zk3.onrender.com/api/news/${id}`,{
method:"DELETE"
})

setNews(news.filter(n=>n._id !== id))

}



return (

<div className="bg-slate-900 p-6 rounded-xl border border-purple-500 mt-10">

<h2 className="text-2xl text-purple-400 mb-6">
News / Notification Manager
</h2>


{/* Form */}

<div className="flex flex-col gap-4 mb-6">

<input
type="text"
placeholder="News Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="p-3 rounded bg-slate-800 text-white"
/>


<textarea
placeholder="News Message"
value={message}
onChange={(e)=>setMessage(e.target.value)}
className="p-3 rounded bg-slate-800 text-white"
/>


{editingId ? (

<button
onClick={updateNews}
className="bg-yellow-600 px-5 py-2 rounded-lg hover:bg-yellow-700"
>
Update News
</button>

) : (

<button
onClick={addNews}
className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700"
>
Add News
</button>

)}

</div>



{/* News List */}

<table className="w-full text-gray-300">

<thead className="border-b border-gray-700 text-gray-400">

<tr>
<th className="px-3">#</th>
<th className="px-4" >Title</th>
<th className="px-3">Message</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{news.map((n,index)=>(

<tr key={n._id} className="border-b border-gray-700">

<td className="pl-3">{index+1}</td>
<td>{n.title}</td>
<td className="px-3 pr-5 pt-2">{n.message}</td>

<td className="flex gap-3 pt-4 text-black font-semi-bold">

<button
className="bg-yellow-600 px-3 py-1 rounded"
onClick={()=>{
setTitle(n.title)
setMessage(n.message)
setEditingId(n._id)
}}
>
Edit
</button>

<button
className="bg-red-600 px-3 py-1 rounded"
onClick={()=>deleteNews(n._id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default AdminNews