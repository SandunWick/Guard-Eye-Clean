function AlertsNotifications({ notifications }) {
  return (
    <div className="alerts-box">
      <h2>Alerts & Notifications</h2>
      <div className="alerts-list">
        {notifications.length > 0 ? (
          notifications.map((note, idx) => <p key={idx}>⚠️ {note}</p>)
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  );
}

export default AlertsNotifications;

