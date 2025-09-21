import { useNavigate } from 'react-router-dom';

function CurrentBookings() {
  const navigate = useNavigate();

  return (
    <section className="dashboard-section current-bookings" onClick={() => navigate('/current-bookings')}>
      <h2>Current Bookings</h2>
    </section>
  );
}

export default CurrentBookings;