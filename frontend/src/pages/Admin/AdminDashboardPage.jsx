import React from "react";
import Header from "../../components/Dashboard/Header";
import SideBar from "../../components/Dashboard/SideBar";

const AdminDashboardPage = () => {
  return (
    <div>
      <div className="flex flex-row gap-1">
        <div>
          <SideBar />
        </div>
        <div>
          <Header />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
