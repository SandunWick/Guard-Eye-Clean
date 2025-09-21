import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './assets/logo.png';
import Home from './Home';
import About from './About';
import Services from './Services';
import Pricing from './Pricing';
import Contact from './Contact';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import BookAGuard from './BookAGuard';
import CurrentBookings from './CurrentBookings';
import GuardTracking from './GuardTracking';
import AlertsNotifications from './AlertsNotifications';
import Reports from './Reports';
import Settings from './Settings';
import MyProfile from './MyProfile';
import { ThemeProvider } from './ThemeProvider';
import ResetPassword from './ResetPassword'; 

function Navbar() {
  return (
    <nav>
      <div className="container nav-content">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
          <span className="topic">GuardEye</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/dashboard' ||
    location.pathname.startsWith('/book-a-guard') ||
    location.pathname.startsWith('/current-bookings') ||
    location.pathname.startsWith('/guard-tracking') ||
    location.pathname.startsWith('/alerts-notifications') ||
    location.pathname.startsWith('/reports') ||
    location.pathname.startsWith('/settings') ||
    location.pathname.startsWith('/my-profile');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-a-guard" element={<BookAGuard />} />
        <Route path="/current-bookings" element={<CurrentBookings />} />
        <Route path="/guard-tracking" element={<GuardTracking />} />
        <Route path="/alerts-notifications" element={<AlertsNotifications />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
