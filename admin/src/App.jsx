import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import WarningsBar from "./WarningBar";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import Analytics from "./Analytics";
import Payments from "./Payments";
import Ongoing from "./Ongoing";
import Scheduled from "./Scheduled";
import Completed from "./Completed";
import Settings from "./Settings";
import Login from "./Login";
import AddUser from "./AddUser";
import AddGuard from "./AddGuard";
import ResetPassword from "./ResetPassword";
import ClientManagement from "./Client";
import GuardManagement from "./Guard";
import ViewClients from "./ViewUsers";
import ViewGuards from "./ViewGuards";

// Layout wrapper
function AdminLayout({ children }) {
  const location = useLocation();
  const hideFor = ["/", "/reset-password"]; // hide sidebar + warnings here
  const shouldHide = hideFor.includes(location.pathname);

  return (
    <div className="dashboard-container">
      {!shouldHide && <Sidebar />}
      <main className={shouldHide ? "full-width-content" : "main-content"}>
        {children}
      </main>
      {!shouldHide && <WarningsBar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/ongoing" element={<Ongoing />} />
          <Route path="/scheduled" element={<Scheduled />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/addGuard" element={<AddGuard />} />
          <Route path="/client" element={<ClientManagement />} />
          <Route path="/guard" element={<GuardManagement />} />
          <Route path="/viewUsers" element={<ViewClients />} />
          <Route path="/viewGuards" element={<ViewGuards />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;