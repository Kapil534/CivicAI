import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://civicai-7jnj.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");
    } catch (error) {
      alert("Server se connection nahi ho pa raha.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-7">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
              🏙️
            </div>

            <div className="text-left">
              <h1 className="text-2xl font-extrabold text-gray-800">
                Civic<span className="text-blue-600">AI</span>
              </h1>

              <p className="text-xs text-gray-500 font-medium">
                SMART CIVIC REPORTING
              </p>
            </div>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-9">
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              👋
            </div>

            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

            <p className="text-gray-500 mt-2">
              Join CivicAI and make your city better
            </p>
          </div>

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-7">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔐
                </span>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 hover:-translate-y-0.5 transition"
            >
              Create CivicAI Account →
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-xs text-gray-400">OR</span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Login */}
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:text-indigo-700 hover:underline transition"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Join citizens working towards a better community. 🤝
        </p>
      </div>
    </div>
  );
}

export default Signup;
