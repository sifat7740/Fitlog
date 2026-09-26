import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-6 border-t border-gray-800 mt-auto">
      <Link href="/" className="flex items-center gap-2">
        <Image
         src="/logo.png"
            alt=""
            height={25}
            width={25}
        />
        <span className="text-white font-bold text-sm tracking-wide">
          FITLOG
        </span>
      </Link>

      <p className="text-gray-500 text-xs">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
};

export default Footer;