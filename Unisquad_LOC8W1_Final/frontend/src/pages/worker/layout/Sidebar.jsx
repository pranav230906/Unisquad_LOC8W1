import { NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { to: "/worker", label: t("dashboard"), icon: "📊", end: true },
    { to: "/worker/profile", label: t("profile"), icon: "👤" },
    { to: "/worker/availability", label: t("availability"), icon: "📅" },
    { to: "/worker/incoming", label: t("incoming_jobs"), icon: "📬" },
    { to: "/worker/navigation", label: t("navigation"), icon: "🗺️" },
    { to: "/worker/earnings", label: t("earnings"), icon: "💰" },
    { to: "/worker/reviews", label: t("reviews"), icon: "⭐" },
  ];

  return (
    <div className="w-72 bg-white shadow-2xl shadow-blue-100 flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
            U
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">UNISQUAD</h2>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-bold tracking-tight">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Worker Mode</p>
          <p className="text-sm font-bold text-gray-900">v1.2.4 Premium</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-colors"
        >
          <span>🚪</span> {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
