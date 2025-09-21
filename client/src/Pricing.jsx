import { Link } from 'react-router-dom';
import "./Pricing.css"

function Pricing() {
  return (
    <div className="pricing">
      <div className="Price-container">
        <h2>Pricing Plans</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <p className="price">Free Plan</p>
            <p>1 Guard, Basic Tracking</p>
            <Link to="/signup">Choose Plan</Link>
          </div>
          <div className="pricing-card">
            <h3>Pro</h3>
            <p className="price">LKR 30,000/6 months</p>
            <p>Guards, Advanced Tracking, Routing Patrol</p>
            <Link to="/signup">Choose Plan</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;