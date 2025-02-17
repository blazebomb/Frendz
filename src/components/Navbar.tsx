import Link from "next/link";
import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

async function Navbar() {

  const user = await currentUser()
  if (user) await syncUser()

  return (
    <nav className="sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary font-serif tracking-wider">
              Frendz
            </Link>
          </div>

          {/* Add these components if they exist */}
          <DesktopNavbar />
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

