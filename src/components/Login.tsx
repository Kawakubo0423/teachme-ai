import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "#eef3f7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        fontFamily: "sans-serif"
      }}>
        <h2 style={{ marginBottom: "1rem", color: "#0d6efd" }}>{isLogin ? "ログイン" : "新規登録"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.6rem", width: "100%", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "0.6rem", width: "100%", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button type="submit" style={{ width: "100%", padding: "0.7rem", background: "#0d6efd", color: "white", border: "none", borderRadius: "8px" }}>
            {isLogin ? "ログイン" : "登録"}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: "1rem", background: "none", border: "none", color: "#0d6efd", cursor: "pointer" }}>
          {isLogin ? "アカウントを作成する" : "ログインに切り替え"}
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
