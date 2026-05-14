

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FaceVerification from "../FaceVerification";

const VotingPage = () => {

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [verified, setVerified] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // REGISTERED VOTER ID
  const [originalVoterId, setOriginalVoterId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    voterId: "",
    party: "",
    gender: "",
    state: ""
  });

  // AUTO FETCH USER DATA
  useEffect(() => {

    const fetchUser = async () => {

      try {

        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await fetch(
          `http://localhost:5000/api/auth/userdata/${userId}`
        );

        const data = await res.json();

        if (res.ok) {

          // SAVE ORIGINAL VOTER ID
          setOriginalVoterId(data.voterId);

          // AUTO FILL OTHER DATA
          setForm({
            name: data.name || "",
            email: data.email || "",
            dob: data.dob || "",
            voterId: "",
            party: "",
            gender: data.gender || "",
            state: data.state || ""
          });

        }

      } catch (err) {

        console.log(err);

      }

    };

    fetchUser();

  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // FACE VERIFY SUCCESS
  const handleFaceVerify = (capturedImage) => {

    setImage(capturedImage);

    setVerified(true);

    setError("");

  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // EMPTY FIELD CHECK
    for (let key in form) {

      if (!form[key]) {

        setError(`Please fill in ${key}`);

        return;

      }

    }

    // VOTER ID MATCH CHECK
    if (form.voterId !== originalVoterId) {

      setError("Voter ID does not match registered data ❌");

      return;

    }

    // FACE VERIFY CHECK
    if (!verified) {

      setError("Please verify your face first");

      return;

    }

    setSubmitting(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            faceImage: image
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        setError("Vote submitted successfully ✅");

        setTimeout(() => {

          navigate("/VoteDashboard", {
            state: data.vote
          });

        }, 1500);

      } else {

        setError(data.message || "Vote submission failed");

      }

    } catch (err) {

      console.log(err);

      setError("Server error");

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-10">

      <div className="flex gap-10 bg-slate-800 p-10 rounded-xl border border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)]">

        {/* FORM SECTION */}

        <div className="w-96">

          <h1 className="text-3xl text-purple-400 mb-6 text-center">
            Cast Your Vote
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* NAME */}

            <input
              required
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 text-white rounded"
            />

            {/* EMAIL */}

            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 text-white rounded"
            />

            {/* DOB */}

            <input
              required
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              max={
                new Date(
                  new Date().setFullYear(
                    new Date().getFullYear() - 18
                  )
                ).toISOString().split("T")[0]
              }
              className="w-full p-3 bg-slate-700 text-white rounded"
            />

            {/* VOTER ID */}

            <input
              required
              name="voterId"
              placeholder="Enter Your Voter ID"
              value={form.voterId}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 text-white rounded"
            />

            {/* PARTY */}

            <select
              required
              name="party"
              value={form.party}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 text-white rounded"
            >

              <option value="">
                Select Party
              </option>

              <option>
                Bharatiya Janata Party (BJP)
              </option>

              <option>
                Indian National Congress (INC)
              </option>

              <option>
                Aam Aadmi Party (AAP)
              </option>

              <option>
                Samajwadi Party (SP)
              </option>

              <option>
                Bahujan Samaj Party (BSP)
              </option>

            </select>

            {/* GENDER + STATE */}

            <div className="flex gap-4">

              <select
                required
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-1/2 p-3 bg-slate-700 text-white rounded"
              >

                <option value="">
                  Gender
                </option>

                <option>
                  Male
                </option>

                <option>
                  Female
                </option>

              </select>

              <select
                required
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-1/2 p-3 bg-slate-700 text-white rounded"
              >

                <option value="">
                  State
                </option>

              <option>Andhra Pradesh</option>
<option>Arunachal Pradesh</option>
<option>Assam</option>
<option>Bihar</option>
<option>Chhattisgarh</option>
<option>Goa</option>
<option>Gujarat</option>
<option>Haryana</option>
<option>Himachal Pradesh</option>
<option>Jharkhand</option>
<option>Karnataka</option>
<option>Kerala</option>
<option>Madhya Pradesh</option>
<option>Maharashtra</option>
<option>Manipur</option>
<option>Meghalaya</option>
<option>Mizoram</option>
<option>Nagaland</option>
<option>Odisha</option>
<option>Punjab</option>
<option>Rajasthan</option>
<option>Sikkim</option>
<option>Tamil Nadu</option>
<option>Telangana</option>
<option>Tripura</option>
<option>Uttar Pradesh</option>
<option>Uttarakhand</option>
<option>West Bengal</option>

              </select>

            </div>

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-purple-600 p-3 rounded text-white transition hover:bg-purple-700"
            >

              {
                submitting
                ? "Submitting..."
                : "Submit Vote"
              }

            </button>

            {/* MESSAGE */}

            {error && (

              <p className="text-center mt-2 text-red-400">
                {error}
              </p>

            )}

            {verified && (

              <p className="text-center mt-2 text-green-400">
                Face Verified Successfully ✅
              </p>

            )}

          </form>

        </div>

        {/* FACE AI VERIFICATION */}

        <div className="flex flex-col items-center">

          <h2 className="text-purple-400 text-2xl mb-4">
            AI Face Verification
          </h2>

          <FaceVerification
            onVerify={handleFaceVerify}
          />

        </div>

      </div>

    </div>

  );

};

export default VotingPage;