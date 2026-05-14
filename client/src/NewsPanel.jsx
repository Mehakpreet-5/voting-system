import React, { useEffect, useState } from "react"
import { FaBell, FaArrowLeft, FaArrowRight } from "react-icons/fa"

const NewsPanel = () => {

const [news,setNews] = useState([])
const [current,setCurrent] = useState(0)

useEffect(()=>{

fetch("http://localhost:5000/api/news")
.then(res=>res.json())
.then(data=>setNews(data))

},[])


// next news
const nextNews = ()=>{

if(news.length === 0) return

setCurrent((prev)=> (prev + 1) % news.length)

}


// previous news
const prevNews = ()=>{

if(news.length === 0) return

setCurrent((prev)=> (prev - 1 + news.length) % news.length)

}


return (

<div className="bg-slate-900 p-6 rounded-xl border border-purple-500 mt-10 relative overflow-hidden">

{/* Header */}

<div className="flex items-center gap-3 mb-6">

<FaBell className="text-yellow-400 text-xl"/>

<h2 className="text-2xl text-purple-400">
Election News & Updates
</h2>

</div>


{/* News Card */}

{news.length > 0 && (

<div className="bg-slate-800 p-6 rounded-lg border border-purple-500 transition-all duration-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">

<h3 className="text-xl text-purple-300 font-semibold">
{news[current].title}
</h3>

<p className="text-gray-300 mt-3">
{news[current].message}
</p>

<p className="text-gray-500 text-sm mt-4">
{new Date(news[current].createdAt).toLocaleString()}
</p>

</div>

)}


{/* Navigation Buttons */}

<div className="flex justify-between mt-6">

<button
onClick={prevNews}
className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
>
<FaArrowLeft/>
</button>

<button
onClick={nextNews}
className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
>
<FaArrowRight/>
</button>

</div>


{/* Dots */}

<div className="flex justify-center gap-2 mt-4">

{news.map((_,index)=>(

<div
key={index}
onClick={()=>setCurrent(index)}
className={`w-3 h-3 rounded-full cursor-pointer transition ${
index === current ? "bg-purple-500 scale-125" : "bg-gray-600"
}`}
></div>

))}

</div>

</div>

)

}

export default NewsPanel