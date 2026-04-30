import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PlusCircle,
  Wallet,
  Menu,
  X,
  Target,
} from "lucide-react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <div
        className={`
  fixed top-0 left-0 h-full z-30 flex flex-col
  bg-white 
  transition-transform duration-300 w-56
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0
`}
      >
        {/* Logo */}
        <div className="px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Wallet size={16} className="text-black" />
            </div>
            <h1 className="text-black text-lg font-bold">SpendSmart</h1>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          <p className="text-gray-600 text-xs font-medium px-4 mb-2 uppercase tracking-wider">
            Main
          </p>

          <NavLink
            to="/"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-gray-800 text-white font-medium"
                  : "text-black hover:bg-gray-200 hover:text-black"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-gray-800 text-white font-medium"
                  : "text-black hover:bg-gray-200 hover:text-black"
              }`
            }
          >
            <ArrowLeftRight size={18} />
            Transactions
          </NavLink>

          <NavLink
            to="/budget"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-gray-800 text-white font-medium"
                  : "text-black hover:bg-gray-200 hover:text-black"
              }`
            }
          >
            <Target size={18} />
            Budget
          </NavLink>

          <NavLink
            to="/add"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-gray-800 text-white font-medium"
                  : "text-black hover:bg-gray-200 hover:text-black"
              }`
            }
          >
            <PlusCircle size={18} />
            Add Transaction
          </NavLink>
        </nav>

        {/* Bottom */}
        <div className="p-4 ">
          <div className=" rounded-xl p-3 text-center">
            <p className="text-gray-400 text-xs">SpendSmart</p>
            <p className="text-gray-600 text-xs">Track every rupee 💰</p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col lg:ml-56">
        {/* Mobile header */}
        <div className="lg:hidden bg-white px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-black"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <Wallet size={12} className="text-black" />
            </div>
            <span className="text-black font-bold text-sm">SpendSmart</span>
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
