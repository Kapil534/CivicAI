
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/complaints", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch complaints");
                }

                return res.json();
            })
            .then((data) => {
                setComplaints(data.complaints);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load complaints");
                setLoading(false);
            });
    }, []);

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

                    <p className="text-gray-600 font-medium">
                        Loading your complaints...
                    </p>

                </div>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

                <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 text-center max-w-md w-full">

                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Unable to Load Complaints
                    </h2>

                    <p className="text-red-500">
                        {error}
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white">

                {/* Decorative circles */}
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full"></div>

                <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-white/5 rounded-full"></div>


                <div className="relative max-w-7xl mx-auto px-6 py-12">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>

                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                📋 Your Reports
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                My Complaints
                            </h1>

                            <p className="text-blue-100 text-lg mt-3 max-w-xl">
                                Track and manage the civic issues you have reported.
                            </p>

                        </div>


                        {/* Total Reports */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-7 py-5 min-w-[170px]">

                            <p className="text-blue-200 text-sm font-medium">
                                Total Reports
                            </p>

                            <p className="text-4xl font-extrabold mt-1">
                                {complaints.length}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Main */}
            <div className="max-w-7xl mx-auto px-6 py-10">

                {complaints.length === 0 ? (

                    /* Empty State */
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 md:p-16 text-center">

                        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">
                            📋
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            No Complaints Yet
                        </h2>

                        <p className="text-gray-500 mb-7 max-w-md mx-auto">
                            You haven't reported any civic issue yet.
                            Start by reporting a problem in your area.
                        </p>

                        <Link
                            to="/report-issue"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
                        >
                            📝 Report an Issue →
                        </Link>

                    </div>

                ) : (

                    /* Complaint Cards */
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

                        {complaints.map((complaint) => (

                            <div
                                key={complaint.id}
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
                            >

                                {/* Image */}
                                <div className="relative">

                                    {complaint.image ? (

                                        <img
                                            src={`http://localhost:5000/uploads/${complaint.image}`}
                                            alt={complaint.title}
                                            className="w-full h-56 object-cover"
                                        />

                                    ) : (

                                        <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">

                                            <div className="text-4xl mb-2">
                                                📷
                                            </div>

                                            <span className="text-gray-400 text-sm font-medium">
                                                No Image Available
                                            </span>

                                        </div>

                                    )}

                                    {/* Complaint ID */}
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                                        #{complaint.id}
                                    </div>

                                </div>


                                {/* Content */}
                                <div className="p-6">

                                    {/* Category + Status */}
                                    <div className="flex justify-between items-center gap-3 mb-4">

                                        <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold">
                                            🏷️ {complaint.category}
                                        </span>

                                        <span
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                                                complaint.status === "Pending"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : complaint.status === "In Progress"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {complaint.status === "Pending" && "⏳ "}
                                            {complaint.status === "In Progress" && "🔄 "}
                                            {complaint.status === "Resolved" && "✅ "}
                                            {complaint.status}
                                        </span>

                                    </div>


                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                                        {complaint.title}
                                    </h2>


                                    {/* Description */}
                                    <p className="text-gray-500 leading-6 mb-5 line-clamp-2">
                                        {complaint.description}
                                    </p>


                                    {/* Location */}
                                    {complaint.location && (
                                        <div className="flex items-start gap-2 text-gray-500 text-sm mb-3">

                                            <span className="mt-0.5">
                                                📍
                                            </span>

                                            <span className="line-clamp-1">
                                                {complaint.location}
                                            </span>

                                        </div>
                                    )}


                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-5">

                                        <span>
                                            📅
                                        </span>

                                        <span>
                                            {complaint.created_at}
                                        </span>

                                    </div>


                                    {/* Buttons */}
                                    <div className="space-y-3">

                                        {/* View */}
                                        <Link
                                            to={`/complaints/${complaint.id}`}
                                            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-md transition"
                                        >
                                            👁️ View Complaint
                                        </Link>


                                        {/* Edit */}
                                        <Link
                                            to={`/complaints/${complaint.id}/edit`}
                                            className="flex items-center justify-center gap-2 w-full bg-amber-500 text-white py-3 rounded-xl font-bold hover:bg-amber-600 hover:shadow-md transition"
                                        >
                                            ✏️ Edit Complaint
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyComplaints;

