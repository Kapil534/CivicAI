
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ComplaintDetails() {
    const { id } = useParams();

    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:5000/api/complaints/${id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch complaint"
                    );
                }

                setComplaint(data.complaint);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaint();
    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

                    <p className="text-gray-600 font-medium">
                        Loading complaint...
                    </p>

                </div>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

                <div className="bg-white shadow-xl rounded-3xl border border-red-100 p-10 text-center max-w-md w-full">

                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl">
                        ⚠️
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Complaint Not Found
                    </h2>

                    <p className="text-gray-500 mb-7">
                        {error}
                    </p>

                    <Link
                        to="/my-complaints"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                    >
                        ← Back to My Complaints
                    </Link>

                </div>

            </div>
        );
    }

    // Status styling
    const statusStyle =
        complaint.status === "Pending"
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : complaint.status === "In Progress"
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "bg-green-50 text-green-700 border-green-200";

    const statusIcon =
        complaint.status === "Pending"
            ? "⏳"
            : complaint.status === "In Progress"
            ? "🔄"
            : "✅";

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white">

                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full"></div>

                <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-white/5 rounded-full"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-10">

                    {/* Back */}
                    <Link
                        to="/my-complaints"
                        className="inline-flex items-center gap-2 text-blue-100 hover:text-white font-medium mb-7 transition"
                    >
                        <span className="text-xl">←</span>
                        Back to My Complaints
                    </Link>


                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                        <div>

                            <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">
                                Complaint Details
                            </p>

                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                {complaint.title}
                            </h1>

                            <p className="text-blue-100 mt-2">
                                Complaint #{complaint.id}
                            </p>

                        </div>


                        {/* Status Badge */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">

                            <p className="text-blue-200 text-xs uppercase tracking-wide mb-1">
                                Current Status
                            </p>

                            <p className="font-bold text-lg">
                                {statusIcon} {complaint.status}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid lg:grid-cols-3 gap-7">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-7">

                        {/* Image */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                            {complaint.image ? (

                                <img
                                    src={`http://localhost:5000/uploads/${complaint.image}`}
                                    alt={complaint.title}
                                    className="w-full h-72 sm:h-[420px] object-cover"
                                />

                            ) : (

                                <div className="w-full h-72 sm:h-[420px] bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">

                                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm mb-4">
                                        🖼️
                                    </div>

                                    <p className="text-gray-500 font-medium">
                                        No image uploaded
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* Description */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7 md:p-8">

                            <div className="flex items-center gap-4 mb-6">

                                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-xl">
                                    📝
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Description
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        Details provided with the complaint
                                    </p>
                                </div>

                            </div>

                            <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5">

                                <p className="text-gray-600 leading-8">
                                    {complaint.description}
                                </p>

                            </div>

                        </div>


                        {/* Location */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7 md:p-8">

                            <div className="flex items-center gap-4 mb-6">

                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl">
                                    📍
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Location
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        Where the issue was reported
                                    </p>
                                </div>

                            </div>

                            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">

                                <p className="text-gray-700 font-semibold">
                                    {complaint.location ||
                                        "Location not provided"}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT */}
                    <div className="space-y-7">

                        {/* Status */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

                            <div className="flex items-center justify-between mb-5">

                                <h2 className="text-lg font-bold text-gray-800">
                                    Current Status
                                </h2>

                                <span className="text-xl">
                                    {statusIcon}
                                </span>

                            </div>

                            <div
                                className={`border rounded-2xl p-4 ${statusStyle}`}
                            >

                                <div className="flex items-center gap-3">

                                    <div className="w-3 h-3 rounded-full bg-current"></div>

                                    <span className="font-bold text-lg">
                                        {complaint.status}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Category */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

                            <h2 className="text-lg font-bold text-gray-800 mb-5">
                                Category
                            </h2>

                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-xl">
                                    🏷️
                                </div>

                                <div>

                                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                                        Issue Type
                                    </p>

                                    <p className="font-bold text-gray-800 mt-1">
                                        {complaint.category}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Complaint Information */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

                            <h2 className="text-lg font-bold text-gray-800 mb-6">
                                Complaint Information
                            </h2>

                            <div className="space-y-5">

                                {/* ID */}
                                <div className="flex items-start gap-4">

                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                        #️⃣
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                            Complaint ID
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            #{complaint.id}
                                        </p>

                                    </div>

                                </div>


                                {/* Date */}
                                <div className="flex items-start gap-4">

                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                        📅
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                            Reported On
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1 break-words">
                                            {complaint.created_at}
                                        </p>

                                    </div>

                                </div>


                                {/* Location */}
                                <div className="flex items-start gap-4">

                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                        📍
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                            Location
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {complaint.location ||
                                                "Not provided"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Progress */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

                            <h2 className="text-lg font-bold text-gray-800 mb-7">
                                Complaint Progress
                            </h2>


                            {/* Submitted */}
                            <div className="flex items-start gap-4">

                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                        complaint.status === "Pending" ||
                                        complaint.status === "In Progress" ||
                                        complaint.status === "Resolved"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                                >
                                    ✓
                                </div>

                                <div>

                                    <p className="font-bold text-gray-800">
                                        Complaint Submitted
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1 leading-5">
                                        Your complaint has been received.
                                    </p>

                                </div>

                            </div>


                            {/* Connector */}
                            <div className="ml-5 h-9 border-l-2 border-gray-200"></div>


                            {/* In Progress */}
                            <div className="flex items-start gap-4">

                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                        complaint.status === "In Progress" ||
                                        complaint.status === "Resolved"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                                >
                                    ✓
                                </div>

                                <div>

                                    <p className="font-bold text-gray-800">
                                        In Progress
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1 leading-5">
                                        Authorities are working on it.
                                    </p>

                                </div>

                            </div>


                            {/* Connector */}
                            <div className="ml-5 h-9 border-l-2 border-gray-200"></div>


                            {/* Resolved */}
                            <div className="flex items-start gap-4">

                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                        complaint.status === "Resolved"
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                                >
                                    ✓
                                </div>

                                <div>

                                    <p className="font-bold text-gray-800">
                                        Resolved
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1 leading-5">
                                        Issue has been resolved.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Bottom Actions */}
                <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">

                    <Link
                        to="/my-complaints"
                        className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-7 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-sm transition"
                    >
                        ← Back to My Complaints
                    </Link>

                    <Link
                        to={`/complaints/${complaint.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-7 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
                    >
                        ✏️ Edit Complaint
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ComplaintDetails;

