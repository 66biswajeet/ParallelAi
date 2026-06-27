import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { LogOut, LayoutGrid, Coins, Sparkles, User } from "lucide-react";
import { Logo } from "./Logo";

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate("/sign-in");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200/80 glass-header px-6 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2 group focus:outline-none"
      >
        <Logo size="sm" className="group-hover:scale-105 transition-transform" />
        <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-amber-500 transition-colors">
          Parallel<span className="text-primary-yellow">AI</span>
        </span>
      </Link>

      {user && (
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all
                ${
                  isActive("/dashboard")
                    ? "bg-primary-soft text-amber-600"
                    : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                }`}
            >
              <LayoutGrid size={16} />
              Dashboard
            </Link>
            <Link
              to="/credits"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all
                ${
                  isActive("/credits")
                    ? "bg-primary-soft text-amber-600"
                    : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                }`}
            >
              <Coins size={16} />
              Credits
            </Link>
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block"></div>

          {/* User Information & Actions */}
          <div className="flex items-center gap-4">
            {/* Credit Balance Indicator */}
            <Link
              to="/credits"
              className="flex items-center gap-1.5 bg-primary-soft border border-amber-200/60 px-3 py-1.5 rounded-full text-xs font-black text-amber-800 hover:bg-amber-100/80 transition-colors cursor-pointer"
            >
              <Sparkles size={13} className="text-primary-yellow fill-primary-yellow animate-pulse" />
              <span>{user.credits} Credits</span>
            </Link>

            {/* Profile Avatar Trigger */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-150 px-2.5 py-1.2 rounded-lg text-xs font-semibold text-slate-700">
              <User size={13} className="text-slate-400" />
              <span className="hidden md:inline max-w-[120px] truncate">
                {user.name || "Developer"}
              </span>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 focus:outline-none"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
