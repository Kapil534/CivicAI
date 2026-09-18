import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Existing complaint fetch karna
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://civicai-7jnj.onrender.com/api/complaints/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Complaint fetch nahi ho paayi");
          setLoading(false);
          return;
        }

        const complaint = data.complaint;

        setTitle(complaint.title);
        setDescription(complaint.description);
        setCategory(complaint.category);
        setLocation(complaint.location || "");

        // Existing status preserve
        setStatus(complaint.status);

        setLoading(false);
      } catch (error) {
        setError("Server se connection nahi ho pa raha.");
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  // Complaint update karna
  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://civicai-7jnj.onrender.com/api/complaints/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            description,
            category,
            location,

            // Status preserve hoga
            status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Complaint update nahi ho paayi");
        setSaving(false);
        return;
      }

      alert("Complaint updated successfully!");

      navigate(`/complaints/${id}`);
    } catch (error) {
      setError("Server se connection nahi ho pa raha.");
    }

    setSaving(false);
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-gray-600 font-medium">Loading complaint...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full"></div>

        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-white/5 rounded-full"></div>

        <div className="relative max-w-4xl mx-auto px-6 py-10">
          <button
            onClick={() => navigate(`/complaints/${id}`)}
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white font-medium mb-7 transition"
          >
            <span className="text-xl">←</span>
            Back to Complaint
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
              ✏️
            </div>

            <div>
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-1">
                Complaint Management
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Edit Complaint
              </h1>

              <p className="text-blue-100 mt-1">
                Update the details of your complaint
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Complaint ID */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-7 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
            #️⃣
          </div>

          <div>
            <p className="text-xs text-blue-500 uppercase tracking-wide font-semibold">
              Editing Complaint
            </p>

            <p className="font-bold text-blue-800 mt-1">Complaint #{id}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl mb-7 flex items-start gap-3">
            <span className="text-xl">⚠️</span>

            <div>
              <p className="font-bold">Something went wrong</p>

              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Form Header */}
          <div className="px-7 md:px-9 py-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">
              Complaint Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Make the required changes and save your complaint.
            </p>
          </div>

          {/* Form Body */}
          <div className="p-7 md:p-9">
            {/* Title */}
            <div className="mb-7">
              <label className="block text-gray-700 font-semibold mb-2">
                Complaint Title
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  📝
                </span>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  placeholder="Enter complaint title"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-7">
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>

              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400">📄</span>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="6"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition resize-none"
                  placeholder="Describe the civic issue..."
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-7">
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                  🏷️
                </span>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition appearance-none"
                  required
                >
                  <option value="">Select Category</option>

                  <option value="Pothole">Pothole</option>

                  <option value="Garbage">Garbage</option>

                  <option value="Street Light">Street Light</option>

                  <option value="Water Leakage">Water Leakage</option>

                  <option value="Fallen Tree">Fallen Tree</option>

                  <option value="Traffic Signal">Traffic Signal</option>

                  <option value="Stray Animals">Stray Animals</option>

                  <option value="Dangerous Building">Dangerous Building</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">
                Location
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  📍
                </span>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter complaint location"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />
              </div>
            </div>

            {/* Status Info */}
            <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
                  🔄
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                    Current Status
                  </p>

                  <p className="font-bold text-gray-800 mt-1">{status}</p>

                  <p className="text-xs text-gray-500 mt-1">
                    Complaint status is managed through the admin dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate(`/complaints/${id}`)}
                className="sm:w-1/3 border border-gray-200 bg-white text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-sm transition"
              >
                ← Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {saving ? "Updating Complaint..." : "Save Changes →"}
              </button>
            </div>
          </div>
        </form>

        {/* Bottom Tip */}
        <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            💡
          </div>

          <div>
            <p className="font-bold text-gray-800">Quick Tip</p>

            <p className="text-sm text-gray-500 mt-1 leading-6">
              Keep your complaint details accurate so authorities can understand
              and resolve the issue faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditComplaint;
