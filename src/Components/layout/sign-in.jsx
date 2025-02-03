import React, { useState, useEffect } from 'react';
import './layout.css';

function SignIn() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async () => {
    const signInData = { email: 'test@gmail.com', password: 'test@1234' };

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/LogIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
        // data: { email: 'test@gmail.com', password: 'test@1234' },
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or user not found");
      }

      const data = await response.json();
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("token", data.token);

      setUser(data.user);
      alert(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        {user ? (
          <div className="welcome-container">
            <h2>Welcome, {user.name}!</h2>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="signin-form">
            <h2>Please log in</h2>
            <form onSubmit={(e) => { e.preventDefault(); login(); }}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button
                type="submit"
                className={`submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
<div className='bg-green-300 '>
              <p className='text-white'>test credentials</p>
              <p>username: test</p>
<p>email: test@gmail.com</p>
<p>password: test@1234</p>    </div>      
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;
