import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { auth, db } from "./firebase"; // Updated to use db (Firestore) instead of database
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database"; // Keep for bookings and alerts
import { doc, getDoc } from "firebase/firestore"; // Added for Firestore
import { Moon, Sun } from "lucide-react";
import { AlertTriangle } from "lucide-react";

import BookAGuard from "./BookAGuard";
import CurrentBookings from "./CurrentBookings";
import GuardTracking from "./GuardTracking";
import AlertsNotifications from "./AlertsNotifications";
import Reports from "./Reports";
import Settings from "./Settings";
import MyProfile from "./MyProfile";

import "./Dashboard.css";

function Dashboard() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [activePage, setActivePage] = useState("home"); // home | profile | book | reports | settings | track
  const [userName, setUserName] = useState("");
  const [status, setstatus] = useState("Unregisted"); // Default to Basic
  const [bookings, setBookings] = useState([]); // [{id, jobNo, guardName}]
  const [notifications, setNotifications] = useState([]); // ["text", "text", ...]

  // Watch auth state and load user profile + data
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Not logged in -> go to login
        window.location.href = "/login";
        return;
      }

      // Name: displayName first, else try DB fallback, else email
      let name = user.displayName || user.email || "User";
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          name = data.name || name; // Use Firestore name if available
          setstatus(data.status || "Unregisted"); // Set subscription type
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setUserName(name);

      // Realtime bookings for this user
      const bookingsRef = ref(database, `bookings/${user.uid}`);
      onValue(bookingsRef, (snap) => {
        const list = [];
        snap.forEach((child) => {
          const val = child.val() || {};
          list.push({
            id: child.key,
            jobNo: val.jobNo ?? child.key,
            guardName: val.guardName ?? "",
          });
        });
        setBookings(list);
      });

      // Realtime alerts for this user (optional path; if empty, show none)
      const alertsRef = ref(database, `alerts/${user.uid}`);
      onValue(alertsRef, (snap) => {
        const arr = [];
        snap.forEach((c) => {
          const v = c.val();
          // support either {text:"..."} or raw string
          arr.push(typeof v === "string" ? v : v?.text || JSON.stringify(v));
        });
        setNotifications(arr.length ? arr : []);
      });
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (e) {
      console.error("Logout failed:", e);
      alert("Logout failed: " + e.message);
    }
  };

  const HomePanel = () => (
    <div className="home-grid">
      <div className="welcome-pill">
        Hello {userName}
        <span style={{ display: "block", fontSize: "0.8em", color: "#666" }}>
           {status} User
        </span>
      </div>

      <div className="row">
        <button className="tile btn-tile profile" onClick={() => setActivePage("profile")}>
          <span>Profile settings</span>
        </button>

        <div className="tile bookings">
          <h3>Current Bookings</h3>
          {bookings.length ? (
            <ul>
              {bookings.map((b) => (
                <li key={b.id}>
                  <strong>{b.jobNo}</strong>
                  {b.guardName ? ` – ${b.guardName}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No bookings yet</p>
          )}
        </div>
      </div>

      <div className="row">
        <button className="tile btn-tile" onClick={() => setActivePage("book")}>
          <span>Book a Guard</span>
        </button>

        <button className="tile btn-tile" onClick={() => setActivePage("reports")}>
          <span>Reports</span>
        </button>
      </div>
    </div>
  );

  const renderLeft = () => {
    switch (activePage) {
      case "profile":
        return <MyProfile />;
      case "book":
        return <BookAGuard />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "track":
        return <GuardTracking />;
      default:
        // "home"
        return <HomePanel />;
    }
  };

  return (
    <div className={`dashboard-root ${theme}`}>
      {/* Header */}
      <header className="dash-header">
        <div className="brand">GuardEye</div>
        <div className="header-actions">
          <button className="ghost" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Main */}
      <main className="dash-main">
        <section className="left">
          {/* Top nav buttons: these switch the left side only */}
          <div className="mini-nav">
            <button
              className={`mini ${activePage === "home" ? "active" : ""}`}
              onClick={() => setActivePage("home")}
            >
              Home
            </button>
            <button
              className={`mini ${activePage === "profile" ? "active" : ""}`}
              onClick={() => setActivePage("profile")}
            >
              Profile
            </button>
            <button
              className={`mini ${activePage === "book" ? "active" : ""}`}
              onClick={() => setActivePage("book")}
            >
              Book a Guard
            </button>
            <button
              className={`mini ${activePage === "reports" ? "active" : ""}`}
              onClick={() => setActivePage("reports")}
            >
              Reports
            </button>
            <button
              className={`mini ${activePage === "settings" ? "active" : ""}`}
              onClick={() => setActivePage("settings")}
            >
              Settings
            </button>
          </div>

          {/* Content that changes */}
          <div className="left-content">{renderLeft()}</div>
        </section>

        {/* Right panel stays fixed */}
        <aside className="right">
          <div className="alerts-card">
            <div className="alerts-header">Alerts &amp; Notifications</div>
            <div className="alerts-body">
              {notifications.length ? (
                notifications.map((n, i) => (
                  <div className="alert-row" key={i}><AlertTriangle size={20} color="orange" /> {n}</div>
                ))
              ) : (
                <>
                  <div className="section-title">Random alerts log</div>
                  <div className="muted">No alerts yet</div>
                  <div className="section-title">Missed responses</div>
                  <div className="muted">—</div>
                  <div className="section-title">Safety checks</div>
                  <div className="muted">—</div>
                </>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Dashboard;