import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import TournamentCard from "../components/TournamentCard";
import Pagination from "../components/Pagination";

function HomePage() {
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState(null);

  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await api.get("/users/me/");
      setUser(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  const fetchTournaments = async (page) => {
    try {
      const response = await api.get(
        `/tournaments/?page=${page}`
      );

      setTournaments(response.data.results);

      setTotalPages(
        Math.ceil(response.data.count / 6)
      );

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchTournaments(1);

    if (token) {
      fetchUser();
    }

  }, [token]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTournaments(page);
  };


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

          <Link to="/my-tournaments">
            <button>
              My Tournaments
            </button>
          </Link>

          <br />

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            Login
          </Link>

          <br />

          <Link to="/signup">
            Sign Up
          </Link>
        </>
      )}


      <h2>Tournaments</h2>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
          />
        ))}
      </div>


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  );
}

export default HomePage;