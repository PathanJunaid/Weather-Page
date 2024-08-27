"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const route = useRouter();
  return (
    <div className="w-100 bg-color-2 text-color-beige shadow-md sticky top-0 shadow-white py-5 z-20">
      <nav className="w-11/12 py-4 grid grid-cols-2 mx-auto justify-center items-center">
        <div className="grid grid-cols-3">
          <Link href="/">Weather</Link>
        </div>
        <div className="grid grid-cols-2">
          <Link href="/">Home</Link>
          <Link href="#Contact">Contact</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
