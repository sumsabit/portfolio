import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import '../components/AdminLogin.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid password');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1 className="admin-login-title">
          Admin <span>Login</span>
        </h1>
        <p className="admin-login-subtitle">
          Enter your password to access the dashboard
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-login-input"
            required
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}