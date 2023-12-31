"use client";
import Link from "next/link"
import AnimationWrapper from "./animationWrapper"
import { FaPencilAlt } from "react-icons/fa"
import { useAuth } from "@/contexts/UserContext"
import { removeFromSession } from "@/common/session";

function UserNavigationPanel() {
  const { userAuth: { username }, setUserAuth } = useAuth();

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null })
  }

  return (
    <AnimationWrapper transition={{ duration: 0.2 }} className="absolute right-0 z-50">
        <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
            
            <Link href="/editor">
                <span className="flex gap-2 link md:hidden pl-8 py-4">
                    <FaPencilAlt />
                    Write
                </span>
            </Link>
            <Link href={`/user/${username}`}>
                <span className="link pl-8 py-4">Profile</span>
            </Link>
            <Link href="/dashboard/blogs">
                <span className="link pl-8 py-4">Dashboard</span>
            </Link>
            <Link href="/settings/edit-profile">
                <span className="link pl-8 py-4">Settings</span>
            </Link>
            <span className="absolute border-t border-grey w-[100%]"></span>
            <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4" onClick={signOutUser}>
                <h1 className="font-bold text-xl mb-1">Sign Out</h1>
                <p className="text-dark-grey">@{username}</p>
            </button>
        </div>
    </AnimationWrapper>
  )
}

export default UserNavigationPanel