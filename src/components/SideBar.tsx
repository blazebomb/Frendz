import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { getUserByClerkId } from "@/actions/user.action";
import { LinkIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

async function SideBar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />; 

  const user = await getUserByClerkId(authUser.id);
  if(!user) return null

  return (
    <div className="sticky top-20 w-64 bg-gray-100 dark:bg-gray-900 p-6 shadow-lg rounded-lg">
      <div className="flex flex-col items-center text-center">
        {/* Profile Link */}
        <Link
          href={`/profile/${user.username}`}
          className="flex flex-col items-center justify-center"
        >
          {/* Avatar */}
          <div className="relative w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
            <img src={user.image || "/avatar.png"} alt="Profile" className="w-full h-full object-cover" />
          </div>
  
          {/* Name & Username */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
          </div>
        </Link>
  
        {/* Bio */}
        {user.bio && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>}
  
        {/* Followers & Following */}
        <div className="w-full mt-4 border-t border-gray-300 dark:border-gray-700 pt-3 flex justify-around text-center">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-200">{user._count.following}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
          </div>
          <div className="border-l border-gray-300 dark:border-gray-700"></div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-200">{user._count.followers}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
          </div>
        </div>
  
        {/* Location & Website */}
        <div className="w-full mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
            {user.location || "No location"}
          </div>
          <div className="flex items-center justify-center">
            <LinkIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
            {user.website ? (
              <a href={user.website} className="text-blue-600 dark:text-blue-400 hover:underline truncate" target="_blank">
                {user.website}
              </a>
            ) : (
              "No website"
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default SideBar;

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20 w-64 bg-gray-100 dark:bg-gray-900 p-6 shadow-lg rounded-lg">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center mb-4">
        Welcome to Frendz
    </h2>
    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
      Login to access your profile and connect with others.
    </p>

    <div className="flex flex-col gap-3">
      <SignInButton mode="modal">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
          Login
        </Button>
      </SignInButton>

      <SignUpButton mode="modal">
        <Button className="w-full border border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            Sign Up
        </Button>
        </SignUpButton>
    </div>
  </div>
);
