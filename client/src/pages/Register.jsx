
import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const Register = () => {

const navigate = useNavigate()
const webcamRef = useRef(null)

const [image,setImage] = useState(null)

const [form,setForm] = useState({
name:"",
dob:"",
voterId:"",
email:"",
password:""
})

const [error,setError] = useState("")
const [success,setSuccess] = useState("")
const [loading,setLoading] = useState(false)

const handleChange = (e)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}

// capture image
const capturePhoto = ()=>{

const photo = webcamRef.current.getScreenshot()

setImage(photo)

}

// retake
const retakePhoto = ()=>{

setImage(null)

}

const handleSubmit = async(e)=>{

e.preventDefault()

setError("")
setSuccess("")

if(!form.name || !form.dob || !form.voterId || !form.email || !form.password){

setError("Please fill all fields")

return

}

if(!image){

setError("Please capture your photo")

return

}

setLoading(true)

try{

await axios.post("https://voting-system-6zk3.onrender.com/api/auth/register",{

...form,
faceImage:image

})

setSuccess("Account created successfully! Redirecting...")

setTimeout(()=>{

navigate("/login")

},1500)

}catch(err){

console.log(err)

setError("Registration failed")

}

setLoading(false)

}

return(

<div className="min-h-screen flex items-center justify-center bg-slate-900 p-10">

<div className="flex gap-10 bg-slate-800 p-10 rounded-xl border border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)]">

{/* FORM SECTION */}

<div className="w-96">

<h1 className="text-3xl text-purple-400 mb-6 text-center">
Register
</h1>

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
className="w-full p-3 bg-slate-700 text-white rounded outline-none"
/>

<input
type="date"
name="dob"
value={form.dob}
onChange={handleChange}
max={new Date(
new Date().setFullYear(new Date().getFullYear() - 18)
).toISOString().split("T")[0]}
className="w-full p-3 bg-slate-700 text-white rounded outline-none"
/>

<input
name="voterId"
placeholder="Voter ID"
value={form.voterId}
onChange={handleChange}
className="w-full p-3 bg-slate-700 text-white rounded outline-none"
/>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
className="w-full p-3 bg-slate-700 text-white rounded outline-none"
/>

<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
className="w-full p-3 bg-slate-700 text-white rounded outline-none"
/>

<button
type="submit"
disabled={loading}
className="w-full bg-purple-600 p-3 rounded text-white hover:bg-purple-700 transition"
>
{loading ? "Registering..." : "Create Account"}
</button>

{error && <p className="text-red-400 text-center">{error}</p>}
{success && <p className="text-green-400 text-center">{success}</p>}

</form>

<p className="text-center text-gray-400 mt-6">
Already have an account?

<Link to="/login" className="text-purple-400 ml-2 hover:underline">
Login
</Link>

</p>

</div>

{/* CAMERA SECTION */}

<div className="flex flex-col items-center">

<h2 className="text-purple-400 text-xl mb-4">
Face Registration
</h2>

{!image ? (

<>

<Webcam
ref={webcamRef}
screenshotFormat="image/jpeg"
className="rounded-lg border border-purple-500 w-80"
/>

<button
type="button"
onClick={capturePhoto}
className="mt-4 bg-green-600 px-6 py-2 rounded text-white transition transform hover:scale-105 hover:bg-green-700"
>
Capture
</button>

</>

) : (

<>

<img
src={image}
alt="Captured"
className="rounded-lg border border-purple-500 w-80"
/>

<button
type="button"
onClick={retakePhoto}
className="mt-4 bg-red-600 px-6 py-2 rounded text-white transition transform hover:scale-105 hover:bg-red-700"
>
Retake
</button>

</>

)}

</div>

</div>

</div>

)

}

export default Register