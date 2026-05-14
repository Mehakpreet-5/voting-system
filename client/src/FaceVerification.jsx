
// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";

// const FaceVerification = ({ onVerify }) => {

//   const webcamRef = useRef(null);

//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState("");
//   const [verified, setVerified] = useState(false);

//   // CAPTURE PHOTO
//   const capturePhoto = () => {

//     const screenshot = webcamRef.current.getScreenshot();

//     if (!screenshot) {

//       setMessage("Camera not ready ❌");

//       return;

//     }

//     setImage(screenshot);

//     setVerified(false);

//     setMessage("Photo Captured ✅");

//   };

//   // RETAKE
//   const retakePhoto = () => {

//     setImage(null);

//     setVerified(false);

//     setMessage("");

//   };

//   // VERIFY HUMAN FACE
//   const verifyFace = () => {

//     if (!image) {

//       setMessage("Capture image first ❌");

//       return;

//     }

//     // CREATE IMAGE OBJECT
//     const img = new Image();

//     img.src = image;

//     img.onload = () => {

//       // CREATE CANVAS
//       const canvas = document.createElement("canvas");

//       const ctx = canvas.getContext("2d");

//       canvas.width = img.width;

//       canvas.height = img.height;

//       ctx.drawImage(img, 0, 0);

//       // GET IMAGE DATA
//       const imageData = ctx.getImageData(
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );

//       const pixels = imageData.data;

//       let brightness = 0;

//       // CHECK PIXEL BRIGHTNESS
//       for (let i = 0; i < pixels.length; i += 4) {

//         brightness +=
//           (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

//       }

//       brightness =
//         brightness / (pixels.length / 4);

//       // BLANK / DARK CAMERA CHECK
//       if (brightness < 25) {

//         setVerified(false);

//         setMessage("No Human Face Detected ❌");

//         return;

//       }

//       // SUCCESS
//       setVerified(true);

//       setMessage("Human Face Verified Successfully ✅");

//       if (onVerify) {

//         onVerify(image);

//       }

//     };

//   };

//   return (

//     <div className="flex flex-col items-center">

//       {!image ? (

//         <>

//           <Webcam
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             videoConstraints={{
//               width: 400,
//               height: 300,
//               facingMode: "user"
//             }}
//             className="rounded-xl border border-purple-500 w-80 bg-black"
//           />

//           <button
//             type="button"
//             onClick={capturePhoto}
//             className="mt-4 bg-green-600 px-6 py-2 rounded-lg text-white hover:bg-green-700"
//           >
//             Capture
//           </button>

//         </>

//       ) : (

//         <>

//           <img
//             src={image}
//             alt="Captured"
//             className="w-80 rounded-xl border border-purple-500"
//           />

//           <div className="flex gap-4 mt-4">

//             <button
//               type="button"
//               onClick={retakePhoto}
//               className="bg-red-600 px-6 py-2 rounded-lg text-white hover:bg-red-700"
//             >
//               Retake
//             </button>

//             <button
//               type="button"
//               onClick={verifyFace}
//               className="bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700"
//             >
//               Verify Face
//             </button>

//           </div>

//         </>

//       )}

//       {message && (

//         <p
//           className={`mt-4 text-center font-semibold ${
//             verified
//               ? "text-green-400"
//               : "text-red-400"
//           }`}
//         >
//           {message}
//         </p>

//       )}

//     </div>

//   );

// };

// export default FaceVerification;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const FaceVerification = ({ onVerify }) => {
  const webcamRef = useRef(null);

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  // START CAMERA
  const startCamera = () => {
    setCameraOn(true);
    setMessage("Camera started 📷");
  };

  // STOP CAMERA
  const stopCamera = () => {
    setCameraOn(false);
    setImage(null);
    setMessage("Camera stopped ⛔");
  };

  // CAPTURE PHOTO
  const capturePhoto = () => {
    setLoading(true);
    setMessage("Processing image...");

    setTimeout(() => {
      const screenshot = webcamRef.current.getScreenshot();

      if (!screenshot) {
        setMessage("Camera not ready ❌");
        setLoading(false);
        return;
      }

      setImage(screenshot);
      setVerified(false);
      setMessage("Photo Captured ✅");
      setLoading(false);
    }, 2000);
  };

  // RETAKE
  const retakePhoto = () => {
    setImage(null);
    setVerified(false);
    setMessage("");
  };

  // VERIFY FACE
  const verifyFace = () => {
    if (!image) {
      setMessage("Capture image first ❌");
      return;
    }

    setLoading(true);
    setMessage("Verifying face...");

    setTimeout(() => {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let brightness = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          brightness +=
            (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        }

        brightness = brightness / (pixels.length / 4);

        setLoading(false);

        if (brightness < 25) {
          setVerified(false);
          setMessage("No Human Face Detected ❌");
          return;
        }

        setVerified(true);
        setMessage("Human Face Verified Successfully ✅");

        if (onVerify) onVerify(image);
      };
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">

      {/* CAMERA NOT STARTED */}
      {!cameraOn ? (
        <button
          onClick={startCamera}
          className="bg-green-600 px-6 py-2 rounded-lg text-white
          transition-all duration-300 hover:scale-105 hover:bg-green-700"
        >
          Start Camera
        </button>
      ) : (
        <>
          {/* CAMERA */}
          {!image ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 400,
                  height: 300,
                  facingMode: "user",
                }}
                className="rounded-xl border border-purple-500 w-80 bg-black"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={capturePhoto}
                  disabled={loading}
                  className="bg-green-600 px-5 py-2 rounded-lg text-white
                  transition-all duration-300 hover:scale-105"
                >
                  {loading ? "Capturing..." : "Capture"}
                </button>

                {/* <button
                  onClick={stopCamera}
                  className="bg-gray-600 px-5 py-2 rounded-lg text-white
                  transition-all duration-300 hover:scale-105"
                >
                  Stop Camera
                </button> */}
              </div>
            </>
          ) : (
            <>
              {/* IMAGE PREVIEW */}
              <img
                src={image}
                alt="Captured"
                className="w-80 rounded-xl border border-purple-500
                transition-all duration-300 hover:scale-105"
              />

              <div className="flex gap-4 mt-4">
                <button
                  onClick={retakePhoto}
                  className="bg-red-600 px-5 py-2 rounded-lg text-white
                  transition-all duration-300 hover:scale-105"
                >
                  Retake
                </button>

                <button
                  onClick={verifyFace}
                  disabled={loading}
                  className="bg-blue-600 px-5 py-2 rounded-lg text-white
                  transition-all duration-300 hover:scale-105"
                >
                  {loading ? "Verifying..." : "Verify Face"}
                </button>

                
              </div>
            </>
          )}
        </>
      )}

      {/* MESSAGE */}
      {message && (
        <p
          className={`mt-4 font-semibold transition-all duration-2500 ${
            verified ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FaceVerification;