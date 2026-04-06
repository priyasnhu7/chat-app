import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (e) => {
      e.preventDefault();
      if(currentState=== "Sign Up" && !isDataSubmitted) {
        setIsDataSubmitted(true);
        return;
      }

      login(currentState==="Sign Up" ? 'signup': 'login', {fullName, email, password, bio})
  }

  return (
    <div className="min-h-screen text-[#fff8e8] bg-cover bg-center flex select-none items-center justify-center gap-8 md:justify-evenly max-md:flex-col backdrop-blur-2xl">
      <div className="flex flex-col items-center pb-6">
        <img
          src={assets.logo_icon}
          alt=""
          className="w-xs max-md:hidden max-lg:w-3xs"
        />
        <h1 className="text-8xl max-lg:text-6xl max-md:text-4xl">
          QuickChat
        </h1>
      </div>

      <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 border-[#FDE7B3]/50 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currentState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-[#FDE7B3]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600/60"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-[#FDE7B3]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600/60"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-[#FDE7B3]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600/60"
            />
          </>
        )}

        {currentState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-[#FDE7B3]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600/60"
            placeholder="Write a bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-linear-to-r from-green-700 to-emerald-700 rounded-md cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        {/* <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" className="accent-green-300" />
          <p>Agree to the tern of use & privacy policy</p>
        </div> */}

        <div className="flex flex-col items-center gap-2">
          {currentState === "Sign Up" ? (
            <p
              onClick={() => {
                setCurrentState("Login");
                setIsDataSubmitted(false);
              }}
              className="text-sm font-medium text-green-400 cursor-pointer"
            >
              Already have an account?
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="text-sm font-medium text-green-400 cursor-pointer"
            >
              Create an account
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
