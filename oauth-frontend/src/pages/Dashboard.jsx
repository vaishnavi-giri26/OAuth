import { useEffect, useState } from "react";
import axios from "axios"; 

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  // Use the dynamic API URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://oauth-backend-s5bk.onrender.com"
  useEffect(() => {
    axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true })
      .then(res => {
        if (res.data && res.data.user){
          console.log("USER DATA:", res.data.user); 
          setUser(res.data.user);
        }
      })
      .catch(err => {
        console.error("Not authenticated", err);
        setError(true);
        window.location.href = "/";
      });
  }, []);

  // FIXED LOGOUT: Uses Axios instead of window.location.href
  const handleLogout = async () => {
    try {
      // 1. Send request to backend to destroy session and clear cookies
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      
      // 2. Client-side redirect to the login page
      window.location.href = "/"; 
    } catch (err) {
      console.error("Logout failed during API call", err);
      // Force redirect to login page even if the backend call fails
      window.location.href = "/";
    }
  };

  if (error) return <div style={styles.container}><h1>Redirecting to Login...</h1></div>;
  if (!user) return <div style={styles.container}><h1>Loading vaishnavi's Dashboard...</h1></div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome {user.displayName}</h1>
      <p style={styles.subText}>You have successfully logged in with Google</p>

      <div style={styles.card}>
        {user.image && <img
  src={user.image || "https://ui-avatars.com/api/?name=" + user.displayName}
  alt="profile"
  style={styles.avatar}
/>}
        
        <div style={styles.infoRow}><strong>Name:</strong> {user.displayName}</div>
        <div style={styles.infoRow}><strong>Email:</strong> {user.email}</div>
        <div style={styles.infoRow}><strong>Google ID:</strong> {user.googleId}</div>

        <button
  onClick={handleLogout}
  style={styles.logoutBtn}
  onMouseOver={(e) => (e.target.style.background = "#c62828")}
  onMouseOut={(e) => (e.target.style.background = "#e53935")}
>
  Logout
</button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#141E30,#243B55)",
    fontFamily: "Poppins, sans-serif",
    color: "white"
  },

  heading: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "5px"
  },

  subText: {
    color: "#d1d5db",
    marginBottom: "40px"
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: "40px",
    width: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    textAlign: "center"
  },

  avatar: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: "4px solid white",
    marginBottom: "20px",
    objectFit: "cover"
  },

  infoRow: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.15)",
    fontSize: "15px"
  },

  logoutBtn: {
    marginTop: "25px",
    background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
    border: "none",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "16px"
  }
};
