function RestaurentFetchingError({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-semibold text-red-600 mb-4">Error!!</h1>
        <p className="text-2xl text-black-300 font-semibold">{error.message}</p>
        <button
          className="bg-black rounded-lg text-white mt-4 p-4 cursor-pointer"
          onClick={resetErrorBoundary}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default RestaurentFetchingError;
