
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();

//       if (data.message === "Login successful") {
//         setTimeout(async () => {
//           try {
//             const voteRes = await fetch(
//               `http://localhost:5000/api/check?email=${encodeURIComponent(email)}`
//             );

//             if (!voteRes.ok) throw new Error("Vote API failed");

//             const voteData = await voteRes.json();
//             if (voteData.voted) {
//               navigate("/VoteDashboard", { state: voteData.voter });
//             } else {
//               navigate("/vote", { state: voteData.voter });
//             }
//           } catch (err) {
//             console.error(err);
//             navigate("/vote");
//           } finally {
//             setLoading(false);
//           }
//         }, 1500);
//       } else {
//         setError(data.message);
//         setLoading(false);
//       }
//     } catch (err) {
//       setError("Server error");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900">
//       <div className="absolute w-96 h-96 bg-purple-600 opacity-50 blur-3xl rounded-full"></div>

//       <div
//         className="relative bg-slate-800/90 backdrop-blur-lg p-10 rounded-xl shadow-2xl w-96 border border-purple-500"
//       >
//         <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">E-Vote Login</h1>

//         {/* Form with autocomplete off */}
//         <form className="space-y-5" onSubmit={handleLogin} autoComplete="off">
//           {/* Hidden field to block browser autofill */}
//           <input type="text" style={{ display: "none" }} autoComplete="username" />

//           <input
//             type="email"
//             placeholder="Email"
//             autoComplete="off"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-3 rounded-lg bg-slate-700 text-white border border-purple-500"
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               //autoComplete="new-password" // prevents browser suggestion
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 rounded-lg bg-slate-700 text-white border border-purple-500"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full p-3 rounded-lg text-white ${
//               loading
//                 ? "bg-purple-400 cursor-not-allowed"
//                 : "bg-purple-600 hover:bg-purple-700 transition"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {error && <p className="text-red-500 text-center">{error}</p>}
//         </form>

//         <p className="text-center text-gray-400 mt-6">
//           Don’t have an account?
//           <Link to="/register" className="text-purple-400 ml-2 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message === "Login successful") {
        // console.log(data)
localStorage.setItem("userId", data.user._id)        // ⭐ Admin check
        if (data.user && data.user.role === "admin") {
          setLoading(false);
          navigate("/admin-dashboard");
          return;
        }

        // ⭐ Voter flow
        setTimeout(async () => {
          try {
            const voteRes = await fetch(
              `http://localhost:5000/api/check?email=${encodeURIComponent(email)}`
            );

            if (!voteRes.ok) throw new Error("Vote API failed");

            const voteData = await voteRes.json();

            if (voteData.voted) {
              navigate("/VoteDashboard", { state: voteData.voter });
            } else {
              navigate("/vote", { state: voteData.voter });
            }
          } catch (err) {
            console.error(err);
            navigate("/vote");
          } finally {
            setLoading(false);
          }
        }, 1500);

      } else {
        setError(data.message);
        setLoading(false);
      }

    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="absolute w-96 h-96 bg-purple-600 opacity-50 blur-3xl rounded-full"></div>

      <div className="relative bg-slate-800/90 backdrop-blur-lg p-10 rounded-xl shadow-2xl w-96 border border-purple-500">

        <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">
          E-Vote Login
        </h1>

        <form className="space-y-5" onSubmit={handleLogin} autoComplete="off">

          <input type="text" style={{ display: "none" }} autoComplete="username" />

          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-slate-700 text-white border border-purple-500"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-purple-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 transition"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-purple-400 ml-2 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;