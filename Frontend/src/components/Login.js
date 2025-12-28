import React, { useState } from "react";
import "../Style/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // ✅ LOGIN
        const res = await axios.post("http://ossama-backend-75tp.onrender.com/login", form);
        console.log("Login response:", res.data);
        alert(`Logged in as ${form.email}`);

        // 👉 بعد تسجيل الدخول → انتقل إلى LebanonGuide
        navigate("/LebanonGuide");
      } else {
        // ✅ SIGN UP
        const res = await axios.post("http://ossama-backend-75tp.onrender.com/signup", form);
        console.log("Signup response:", res.data);
        alert(`Signed up as ${form.email}`);

        // 👉 بعد إنشاء الحساب → انتقل أيضًا إلى LebanonGuide
        navigate("/LebanonGuide");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="auth-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/lebanon.mp4" type="video/mp4" />
      </video>

      <div className="auth-box">
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
        <p>
          {isLogin
            ? "Welcome back to Explore Lebanon"
            : "Join us today!"}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit">
            {isLogin ? "Log In" : "Sign Up"}
          </button>
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