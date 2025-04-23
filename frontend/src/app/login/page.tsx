"use client";

// Ensure axios is installed: Run `npm install axios` in the project root.

import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          { username, password }
      );
      const token = response.data.token;
      localStorage.setItem("jwtToken", token); // トークンをローカルストレージに保存
      alert("ログイン成功！");
    } catch (err) {
      setError("ログインに失敗しました。ユーザー名またはパスワードが間違っています。");
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>ユーザー名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;

