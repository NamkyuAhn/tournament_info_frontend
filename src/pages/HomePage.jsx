import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function HomePage() {
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me/");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    alert("Logged out.");

    window.location.reload();
  };

  return (
    <div>
      <h1>Tournament Info</h1>

      {token ? (
        <>
          <p>Welcome, {user?.name}</p>
          <p>Money: {user?.money}</p>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}

export default HomePage;