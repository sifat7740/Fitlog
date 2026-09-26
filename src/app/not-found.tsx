import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="`font-(family-name:--font-oswald)` text-6xl md:text-8xl font-bold text-[#ccff00]">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-bold text-white">Page Not Found</h2>
      <p className="mt-2 text-gray-400 max-w-sm">
        Looks like this page skipped leg day. Let&apos;s get you back to the
        library.
      </p>
      <Link
        href="/"
        className="mt-8 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#b8e600] transition"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;