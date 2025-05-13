// src/App.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      {user ? (
        <div style={{ padding: "1rem" }}>
          <p>こんにちは、{user.email} さん</p>
          <button onClick={() => signOut(auth)}>ログアウト</button>
          {/* ここにメインアプリ（AI育成）機能を追加していく */}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
