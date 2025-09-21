import { useNavigate } from 'react-router-dom';

function GuardTracking() {
  const navigate = useNavigate();

  return (
    <section className="dashboard-section guard-tracking" onClick={() => navigate('/guard-tracking')}>
      <h2>Guard Tracking</h2>
    </section>
  );
}

export default GuardTracking;