import { useEffect, useState } from "react";
import api from "../services/api";
import TournamentCard from "../components/TournamentCard";
import Pagination from "../components/Pagination";

function MyTournamentPage() {
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const fetchTournaments = async (page) => {
    try {
      const response = await api.get(
        `/tournaments/my-tournaments/?page=${page}`
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
    fetchTournaments(currentPage);
  }, [currentPage]);


  return (
    <div>
      <h1>My Tournaments</h1>


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
            showImage={false}
            path={`/my-tournaments/${tournament.id}`}
          />
        ))}
      </div>


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  );
}

export default MyTournamentPage;