import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

const WorkerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-72 p-8 md:p-12">
        <div className="fixed top-6 right-8 z-50">
          <LanguageSwitcher />
        </div>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WorkerLayout;
