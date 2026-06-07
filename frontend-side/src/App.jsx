import { useState } from "react";
import "./App.css";
import Login from "./login";
import { useNavigate } from "react-router-dom";

function App() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleRegister = async () => {
try {
setLoading(true);
setMessage("");
  const response = await fetch(
    "http://localhost:3000/api/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
 
  const data = await response.json();

  if (!response.ok) {
    setMessage(data.message);
    return;
  }

  setMessage("Registration Successful");

  setEmail("");
  setPassword("");
} catch (error) {
  console.error(error);
  setMessage("Something went wrong");
} finally {
  setLoading(false);
}
};

return ( 
<div className="container"> 
  <div className="card"> 
    <h1>Welcome Back</h1>
     <p>Create your account</p>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      onClick={handleRegister}
      disabled={loading}
    >
      {loading ? "Registering..." : "Register"}
    </button>
    <br />
    <p>{message}</p>
  </div>
  <button onClick={() => navigate("/login")}>Go to Login</button>
</div>
);
}

export default App;
