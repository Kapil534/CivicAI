import { useEffect, useState } from "react";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://civicai-7jnj.onrender.com/api/admin/complaints",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch complaints");
      }

      setComplaints(data.complaints);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://civicai-7jnj.onrender.com/api/admin/complaints/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      // UI me bhi status immediately update karo
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === id ? { ...complaint, status: status } : complaint,
        ),
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Delete complaint
  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://civicai-7jnj.onrender.com/api/admin/complaints/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete complaint");
      }

      // Deleted complaint ko UI se remove karo
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint.id !== id),
      );

      alert("Complaint deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-gray-600 font-medium">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">⚠️</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Unable to Load Dashboard
          </h2>

          <p className="text-red-500 mb-6">{error}</p>

          <button
            onClick={fetchComplaints}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Statistics
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending",
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) => complaint.status === "In Progress",
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">
            CivicAI Administration
          </p>

          <h1 className="text-4xl font-bold">Admin Dashboard</h1>

          <p className="text-blue-100 mt-2">
            Manage and monitor reported civic issues.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Complaints
                </p>

                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {totalComplaints}
                </p>
              </div>

              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                📋
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>

                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {pendingComplaints}
                </p>
              </div>

              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-xl">
                ⏳
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Progress</p>

                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {inProgressComplaints}
                </p>
              </div>

              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                🔄
              </div>
            </div>
          </div>

          {/* Resolved */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Resolved</p>

                <p className="text-3xl font-bold text-green-600 mt-2">
                  {resolvedComplaints}
                </p>
              </div>

              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                ✅
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">All Complaints</h2>

            <p className="text-gray-500 text-sm mt-1">
              Review and manage citizen complaints.
            </p>
          </div>

          {/* Empty */}
          {complaints.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl mb-4">📭</div>

              <h3 className="text-xl font-bold text-gray-800">
                No Complaints Found
              </h3>

              <p className="text-gray-500 mt-2">
                There are currently no complaints in the system.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      {complaint.image ? (
                        <img
                          src={`https://civicai-7jnj.onrender.com/uploads/${complaint.image}`}
                          alt={complaint.title}
                          className="w-full lg:w-48 h-40 object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full lg:w-48 h-40 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Complaint Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-400 font-medium mb-1">
                            COMPLAINT #{complaint.id}
                          </p>

                          <h3 className="text-xl font-bold text-gray-800">
                            {complaint.title}
                          </h3>
                        </div>

                        <span
                          className={`h-fit px-3 py-1 rounded-full text-sm font-semibold ${
                            complaint.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : complaint.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {complaint.status}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="mb-3">
                        <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                          🏷️ {complaint.category}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-6 mb-3">
                        {complaint.description}
                      </p>

                      {/* Location + Date */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-gray-500 mb-5">
                        <span>📍 {complaint.location || "No location"}</span>

                        <span>📅 {complaint.created_at}</span>

                        <span>👤 User #{complaint.user_id}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* Status */}
                        <select
                          value={complaint.status}
                          onChange={(e) =>
                            updateStatus(complaint.id, e.target.value)
                          }
                          className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Pending">Pending</option>

                          <option value="In Progress">In Progress</option>

                          <option value="Resolved">Resolved</option>
                        </select>

                        {/* Delete */}
                        <button
                          onClick={() => deleteComplaint(complaint.id)}
                          className="px-5 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition"
                        >
                          🗑️ Delete Complaint
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
