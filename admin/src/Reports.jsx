import { useNavigate } from 'react-router-dom';

function Reports() {
  const navigate = useNavigate(); // Used below

  return (
    <section className="dashboard-section reports" onClick={() => navigate('/reports')}>
      <h2>Reports</h2>
    </section>
  );
}

export default Reports;