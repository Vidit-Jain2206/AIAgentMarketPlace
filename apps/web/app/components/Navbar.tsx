"use client";
import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <nav className="w-full mx-auto h-16 flex items-center justify-between text-muted-foreground border-b-2 px-4 sticky top-0 z-50 bg-black">
      <div className="w-[70%] mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">AI Agents List</div>
        <div className="flex gap-6 text-white">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
