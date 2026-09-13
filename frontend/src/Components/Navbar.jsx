
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("token");

      setToken(currentToken);

      if (currentToken) {
        try {
          const payload = JSON.parse(atob(currentToken.split(".")[1]));
          setRole(payload.role);
        } catch (error) {
          setRole("");
        }
      } else {
        setRole("");
      }
    };

    checkToken();

    window.addEventListener("login", checkToken);
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("login", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole("");

    // Logout ke baad Home Page par jayega
    navigate("/");
  };

  // Active link check
  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive(path)
        ? "bg-white/20 text-white"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-18 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            {/* Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-xl shadow-sm group-hover:bg-white/25 transition">
              🏙️
            </div>

            {/* Logo Text */}
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Civic<span className="text-blue-200">AI</span>
              </h1>

              <p className="text-[10px] text-blue-200 font-medium tracking-wider uppercase">
                Smart Civic Reporting
              </p>
            </div>

          </Link>


          {/* Navigation */}
          <div className="flex items-center gap-1">

            {/* Home */}
            <Link
              to="/"
              className={linkClass("/")}
            >
              🏠 <span className="hidden md:inline">Home</span>
            </Link>


            {token ? (
              <>
                {/* Report Issue */}
                <Link
                  to="/report-issue"
                  className={linkClass("/report-issue")}
                >
                  📝 <span className="hidden md:inline">
                    Report Issue
                  </span>
                </Link>


                {/* My Complaints */}
                <Link
                  to="/my-complaints"
                  className={linkClass("/my-complaints")}
                >
                  📋 <span className="hidden md:inline">
                    My Complaints
                  </span>
                </Link>


                {/* Admin Dashboard */}
                {role === "admin" && (
                  <Link
                    to="/admin"
                    className={linkClass("/admin")}
                  >
                    🛡️ <span className="hidden md:inline">
                      Admin Dashboard
                    </span>
                  </Link>
                )}


                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 rounded-lg bg-white text-blue-700 text-sm font-semibold hover:bg-blue-50 hover:shadow-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive("/login")
                      ? "bg-white/20 text-white"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Login
                </Link>


                {/* Signup */}
                <Link
                  to="/signup"
                  className="ml-2 px-4 py-2 rounded-lg bg-white text-blue-700 text-sm font-semibold hover:bg-blue-50 hover:shadow-md transition"
                >
                  Get Started
                </Link>
              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;

