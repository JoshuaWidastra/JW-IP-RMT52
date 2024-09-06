import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail } from '../store/authSlice';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const error = auth?.error;
  const loading = auth?.loading;

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerWithEmail({ email, password }));
    if (!result.error) navigate('/');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card" style={{ width: "400px", maxWidth: "100%", backgroundColor: "#2a2a2a" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-light">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="mt-3 text-center">
            <Link to="/login" className="text-light">Already have an account? Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;