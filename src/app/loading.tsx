const Loading = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-10 h-10 border-4 border-gray-700 border-t-[#ccff00] rounded-full animate-spin" />
      <p className="mt-4 text-gray-400 text-sm">Loading workouts…</p>
    </main>
  );
};

export default Loading;