import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white">

        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-white/5 rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">

          <div className="max-w-3xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-7 backdrop-blur-sm">
              🏙️ Smart Civic Problem Reporting
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Make Your City
              <span className="block text-blue-200">
                Better Together.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-8 mb-9">
              Report local civic problems quickly, track your complaints,
              and help create a cleaner, safer and better community.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">

              <Link
                to="/report-issue"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition"
              >
                📝 Report an Issue
              </Link>

              <Link
                to="/my-complaints"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition"
              >
                📋 Track Complaints
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* Problem Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition">
            <div className="text-3xl mb-2">🛣️</div>
            <h3 className="font-bold text-gray-800">Potholes</h3>
            <p className="text-sm text-gray-500 mt-1">
              Damaged roads
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition">
            <div className="text-3xl mb-2">🗑️</div>
            <h3 className="font-bold text-gray-800">Garbage</h3>
            <p className="text-sm text-gray-500 mt-1">
              Waste issues
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition">
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-bold text-gray-800">Street Lights</h3>
            <p className="text-sm text-gray-500 mt-1">
              Lighting problems
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition">
            <div className="text-3xl mb-2">💧</div>
            <h3 className="font-bold text-gray-800">Water Leakage</h3>
            <p className="text-sm text-gray-500 mt-1">
              Water problems
            </p>
          </div>

        </div>

      </section>


      {/* How CivicAI Works */}
      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          {/* Section Heading */}
          <div className="text-center mb-12">

            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-2">
              Simple Process
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              How CivicAI Works
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              From reporting a problem to tracking its progress,
              CivicAI keeps the process simple.
            </p>

          </div>


          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-7">

            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition">

              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center text-2xl mb-5">
                📝
              </div>

              <div className="text-sm text-blue-600 font-bold mb-2">
                STEP 01
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Report
              </h3>

              <p className="text-gray-500 leading-7">
                Submit a civic problem with its title, description,
                category, location and image.
              </p>

            </div>


            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition">

              <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center text-2xl mb-5">
                🔍
              </div>

              <div className="text-sm text-indigo-600 font-bold mb-2">
                STEP 02
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Track
              </h3>

              <p className="text-gray-500 leading-7">
                Check your complaints anytime and see whether
                they are Pending, In Progress or Resolved.
              </p>

            </div>


            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition">

              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-2xl mb-5">
                ✅
              </div>

              <div className="text-sm text-green-600 font-bold mb-2">
                STEP 03
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Solve
              </h3>

              <p className="text-gray-500 leading-7">
                Admin reviews reported issues and updates their
                status as the problem gets resolved.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Why CivicAI */}
      <section className="bg-white py-20 px-6 border-y border-gray-100">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>

            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">
              Why CivicAI?
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-5">
              Your complaint deserves
              <span className="text-blue-600"> attention.</span>
            </h2>

            <p className="text-gray-500 leading-7 mb-7">
              CivicAI provides a simple digital platform where citizens
              can report local problems and stay informed about their
              complaint status.
            </p>

            <div className="space-y-4">

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  📍
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Easy Reporting
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Submit issues with location and useful details.
                  </p>
                </div>
              </div>


              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  📊
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Track Progress
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Know the current status of your complaint.
                  </p>
                </div>
              </div>


              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  🤝
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Better Community
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Help make your local area cleaner and safer.
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* Right Visual */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white shadow-xl">

            <div className="text-6xl mb-6">
              🏙️
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Click. Report. Solve.
            </h3>

            <p className="text-blue-100 leading-7 mb-7">
              Small reports can lead to meaningful improvements.
              Together, citizens and administrators can build
              better communities.
            </p>

            <Link
              to="/report-issue"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
            >
              Start Reporting →
            </Link>

          </div>

        </div>

      </section>


      {/* Bottom CTA */}
      <section className="bg-slate-50 py-16 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            See a problem in your area?
          </h2>

          <p className="text-gray-500 mb-7">
            Don't just notice it. Report it and help make a difference.
          </p>

          <Link
            to="/report-issue"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold shadow-md hover:bg-blue-700 hover:-translate-y-0.5 transition"
          >
            📝 Report an Issue
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;