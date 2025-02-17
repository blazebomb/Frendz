"use client";

import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";

function DesktopNavbar() {
  const { user } = useUser(); // Use the client-side hook

  // Get username or fallback to email (before @) safely
  const username =
    user?.username || user?.primaryEmailAddress?.emailAddress?.split("@")[0];

  return (
    <div className="hidden md:flex items-center space-x-6">
      {/* Unique Mode Toggle Button */}
      <ModeToggle />

      {/* Styled Home Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition"
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span className="hidden lg:inline text-gray-700 dark:text-gray-300 font-medium">
            Home
          </span>
        </Link>
      </Button>

      {user ? (
        <>
          {/* Notifications Button - Unique Styling */}
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-800 px-4 py-2 rounded-lg transition"
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="hidden lg:inline text-blue-600 dark:text-blue-400 font-medium">
                Notifications
              </span>
            </Link>
          </Button>

          {/* Profile Button with Border */}
          <Button
            variant="ghost"
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700"
            asChild
          >
            <Link href={`/profile/${username}`}>
              <UserIcon className="w-5 h-5 text-gray-900 dark:text-gray-200" />
              <span className="hidden lg:inline text-gray-900 dark:text-gray-200 font-medium">
                Profile
              </span>
            </Link>
          </Button>

          {/* Styled User Button */}
          <div className="border border-gray-300 dark:border-gray-700 p-1 rounded-full transition hover:shadow-md">
            <UserButton />
          </div>
        </>
      ) : (
        /* Styled Sign In Button */
        <SignInButton mode="modal">
          <Button
            variant="default"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition"
          >
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
