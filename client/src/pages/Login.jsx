import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle, loginWithEmail } from '../store/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const error = auth?.error;
  const loading = auth?.loading;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginWithEmail({ email, password }));
    if (!result.error) navigate('/');
  };

  const handleGoogleLogin = async () => {
    const result = await dispatch(loginWithGoogle());
    if (!result.error) navigate('/');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card" style={{ width: "400px", maxWidth: "100%", backgroundColor: "#2a2a2a" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-light">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleEmailLogin}>
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <hr className="bg-light" />
          <button onClick={handleGoogleLogin} className="btn btn-danger w-100" disabled={loading}>
            Sign in with Google
          </button>
          <div className="mt-3 text-center">
            <Link to="/register" className="text-light">Don't have an account? Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;