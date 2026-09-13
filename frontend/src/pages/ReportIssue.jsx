
import { useState } from "react";

function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Complaint submission failed");
        return;
      }

      alert("Complaint submitted successfully!");

      // Form reset
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
      setLocation("");

      // File input reset
      document.getElementById("imageInput").value = "";
    } catch (error) {
      console.error(error);
      alert("Server se connection nahi ho pa raha.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-6">

      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl shadow-lg mx-auto mb-4">
            📝
          </div>

          <h1 className="text-4xl font-extrabold text-gray-800">
            Report an Issue
          </h1>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto leading-6">
            Found a civic problem in your area? Report it with
            useful details and help make your community better.
          </p>

        </div>


        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-7 md:p-9">

          {/* Card Heading */}
          <div className="flex items-center gap-3 pb-6 mb-7 border-b border-gray-100">

            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-xl">
              📋
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Complaint Details
              </h2>

              <p className="text-sm text-gray-500">
                Provide accurate information about the issue.
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                Issue Title
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  📝
                </span>

                <input
                  type="text"
                  placeholder="Example: Large pothole near main road"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />

              </div>

            </div>


            {/* Description */}
            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>

              <div className="relative">

                <span className="absolute left-4 top-4 text-gray-400">
                  💬
                </span>

                <textarea
                  placeholder="Describe the problem in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="5"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition resize-none"
                  required
                />

              </div>

            </div>


            {/* Category */}
            <div className="mb-6">

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
                  <option value="">Select a category</option>
                  <option value="Pothole">Pothole</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Street Light">Street Light</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Fallen Tree">Fallen Tree</option>
                  <option value="Traffic Signal">Traffic Signal</option>
                  <option value="Stray Animals">Stray Animals</option>
                  <option value="Other">Other</option>
                </select>

              </div>

            </div>


            {/* Image */}
            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                Upload Image
              </label>

              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-6 text-center hover:border-blue-400 transition">

                <div className="text-4xl mb-3">
                  📷
                </div>

                <p className="font-semibold text-gray-700 mb-1">
                  Upload a photo of the problem
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  An image helps administrators understand the issue better.
                </p>

                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 file:cursor-pointer"
                />

                {image && (
                  <p className="text-sm text-green-600 font-medium mt-3">
                    ✅ {image.name}
                  </p>
                )}

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
                  placeholder="Enter problem location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />

              </div>

              <p className="text-sm text-gray-500 mt-2 ml-1">
                Example: Near City Mall, Main Road
              </p>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 hover:-translate-y-0.5 transition"
            >
              Submit Complaint →
            </button>

          </form>

        </div>


        {/* Bottom Info */}
        <div className="mt-6 bg-white/70 border border-blue-100 rounded-2xl p-5 text-center">

          <p className="text-sm text-gray-500">
            💡 <span className="font-semibold text-gray-700">
              Tip:
            </span>{" "}
            Add a clear description, correct location and a photo
            whenever possible.
          </p>

        </div>

      </div>

    </div>
  );
}

export default ReportIssue;

