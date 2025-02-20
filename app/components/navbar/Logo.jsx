"use client";
import { useTheme } from "@/app/providers/Theme-context";
import Link from "next/link";

export const Logo = () => {
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/images/logo.png" : "/images/logo1.png";

  return (
    <Link href="/" className="text-2xl font-semibold">
      <img src={logoSrc} alt="ala kefak logo" className="w-[90px] md:w-[120px] h-[60px] md:h-[70px]" />
    </Link>
  );
};
