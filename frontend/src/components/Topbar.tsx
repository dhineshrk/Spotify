import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { LayoutDashboardIcon } from "lucide-react";

const Topbar = () => {
    const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
        <div className="flex gap-2 items-center">
            Spotify
        </div>
        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={"/admin"}>
                    <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                    Admin Dashboard
                </Link>
            )}

            <SignedIn>
                <SignOutButton />
            </SignedIn>
            <SignedOut>
                <SignInOAuthButtons />
            </SignedOut>
        </div>
    </div>
  )
}

export default Topbar