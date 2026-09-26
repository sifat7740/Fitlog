"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { todaysPlan, saved } = usePlan();

  const linkClass = (path: string) =>
    pathname === path
      ? "bg-[#ccff00] text-black px-4 py-1.5 rounded-full text-sm font-medium"
      : "text-white px-4 py-1.5 text-sm font-medium hover:text-[#ccff00] transition";

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
            src="/logo.png"
            alt=""
            height={30}
            width={30}
            />
        <span className="text-white font-bold text-lg tracking-wide">
          FITLOG
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-2">
        <Link href="/" className={linkClass("/")}>
          Workout
        </Link>
        <Link href="/my-plan" className={linkClass("/my-plan")}>
          My Plan
        </Link>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-4">
        <Link
          href="/my-plan"
          className="flex items-center gap-2 text-sm text-gray-300"
        >
          Plan
          <span className="bg-[#ccff00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {todaysPlan.length}
          </span>
        </Link>
        <Link
          href="/my-plan"
          className="flex items-center gap-2 text-sm text-gray-300"
        >
          Saved
          <span className="border border-gray-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {saved.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;