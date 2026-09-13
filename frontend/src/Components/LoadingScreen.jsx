function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-300">

      {/* CivicAI Logo */}
      <div className="flex h-34 w-60 items-center justify-center overflow-hidden rounded-xl shadow-lg">
        <img
          src="/civicai-loading.jpeg"
          alt="CivicAI Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Loading Spinner */}
      <div className="mt-8 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-medium tracking-wide text-gray-600">
        Loading...
      </p>

    </div>
  );
}

export default LoadingScreen;