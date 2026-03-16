import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      
      await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
      
      
      setUser(null);
      
      
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>OAuth App</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            
            {/* Show User's Name if available */}
            <span style={styles.userName}>{user.displayName}</span>
            
            <button 
              onClick={logout} 
              style={styles.logoutBtn}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9d2ce'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fce8e6'}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 40px",
    background: "#111827",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#60a5fa"
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px"
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px"  
  },
  username: {
    color: "#9ca3af",
    fontWeight: "500"
  },

  loginBtn: {
    background: "#3b82f6",
    padding: "8px 16px",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
    fontWeight: "600"
  },

  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600"
  }

};