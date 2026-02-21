import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, PlusSquare, Mic, Users, History, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../common/Button.jsx";

const nav = [
  { to: "/client", label: "Home", icon: Home },
  { to: "/client/post-job", label: "Post Job", icon: PlusSquare },
  { to: "/client/voice-post-job", label: "Voice Post", icon: Mic },
  { to: "/client/workers", label: "Workers", icon: Users },
  { to: "/client/history", label: "History", icon: History },
];

export default function ClientLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="w-full flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">U</div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Unisquad Services</div>
              <div className="text-xs text-slate-500">Client Portal</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-xs text-slate-500">Signed in as</div>
              <div className="text-sm font-medium text-slate-900">{user?.phoneOrEmail || "Client"}</div>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                logout();
                navigate("/auth/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="w-full grid grid-cols-12 gap-4 px-4 py-6">
        <aside className="col-span-12 md:col-span-3">
          <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/client"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
            <div className="font-semibold text-slate-900">Demo Mode</div>
            <div className="mt-1">
              Jobs/bookings stored in <span className="font-medium">LocalStorage</span>. Later replace calls in
              <code className="ml-1 rounded bg-slate-100 px-1">services/</code>.
            </div>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}