import React from "react";
import { AlertTriangle } from "lucide-react";
import "./layout.css";

function WarningsBar() {
  return (
    <div className="warnings-bar">
      <div className="alerts-header">Alerts</div>
      <div className="alerts-body">
        <div className="alert-row">
          <AlertTriangle size={20} color="orange" />
          Warning: System update in progress!
        </div>
      </div>
    </div>
  );
}

export default WarningsBar;