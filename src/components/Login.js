import React, { useState } from "react";
import "../Style/Login.css";

 function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${isLogin ? "Login" : "Sign up"} data:`, form);
    alert(`${isLogin ? "Logged in" : "Signed up"} as ${form.email}`);
  };

  return (
    <div className="auth-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/lebanon.mp4" type="video/mp4"/>
      </video>
      <div className="auth-box">
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
        <p>{isLogin ? "Welcome back to Explore Lebanon" : "Join us today!"}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
        </form>

        <p className="toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
export default Login;