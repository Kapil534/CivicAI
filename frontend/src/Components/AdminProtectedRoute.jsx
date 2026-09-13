import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    // Token nahi hai
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // JWT payload read karna
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Admin nahi hai
    if (payload.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // Admin hai
    return children;
}

export default AdminProtectedRoute;