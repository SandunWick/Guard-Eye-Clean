import { useNavigate } from 'react-router-dom';

function BookAGuard() {
  const navigate = useNavigate(); // Used below, no unused warning

  return (
    <section className="dashboard-section book-a-guard" onClick={() => navigate('/book-a-guard')}>
      <h2>Book a Guard</h2>
    </section>
  );
}

export default BookAGuard;