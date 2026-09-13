import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // JWT token save
      localStorage.setItem("token", data.token);

      // Navbar ko batana ki login ho gaya
      window.dispatchEvent(new Event("login"));

      // Login successful
      alert("Login successful!");

      navigate("/");
    } catch (error) {
      setError("Server se connection nahi ho pa raha.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-7">

          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
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


        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-9">

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              🔐
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue to CivicAI
            </p>

          </div>


          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}


          <form onSubmit={handleLogin}>

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
            <div className="mb-7">

              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />

              </div>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Logging in..." : "Login to CivicAI →"}
            </button>

          </form>


          {/* Divider */}
          <div className="flex items-center gap-3 my-7">

            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>

          </div>


          {/* Signup */}
          <p className="text-center text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-blue-600 font-bold hover:text-indigo-700 hover:underline transition"
            >
              Create Account
            </Link>

          </p>

        </div>


        {/* Bottom Text */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Together, let's build a better community. 🏙️
        </p>

      </div>

    </div>
  );
}

export default Login;