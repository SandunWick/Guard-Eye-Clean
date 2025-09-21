import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  return (
    <section className="dashboard-section settings" onClick={() => navigate('/settings')}>
      <h2>Settings</h2>
    </section>
  );
}

export default Settings;