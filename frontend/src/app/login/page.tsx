"use client";

import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // 成功メッセージ用の状態を追加

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // エラーメッセージをリセット
    setSuccessMessage(""); // 成功メッセージをリセット
    try {
      const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          { username, password }
      );
      const token = response.data.token;
      localStorage.setItem("jwtToken", token); // トークンをローカルストレージに保存
      setSuccessMessage("ログイン成功！"); // 成功メッセージを設定
      window.dispatchEvent(new Event("login")); // ログインイベントを発火
    } catch (err) {
      if (err.response) {
        // サーバーからのエラーレスポンスがある場合
        setError(`エラー: ${err.response.data}`);
      } else if (err.request) {
        // リクエストが送信されたが応答がない場合
        setError("サーバーから応答がありません。");
      } else {
        // その他のエラー
        setError("ログイン処理中にエラーが発生しました。");
      }
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
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} {/* 成功メッセージを表示 */}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
