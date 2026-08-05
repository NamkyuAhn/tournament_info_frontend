import { useEffect, useState } from "react";
import api from "../services/api";
import Pagination from "../components/Pagination";
import ShopTournamentCard from "../components/ShopTournamentCard";

function ShopTournamentPage() {
  const [tournaments, setTournaments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);


  const fetchTournaments = async (page) => {
    try {
      const response = await api.get(
        `/tournaments/my-shop-tournaments/?page=${page}`
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
  }, []);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTournaments(page);
  };


  return (
    <div>
      <h1>My Shop Tournaments</h1>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {tournaments.map((tournament) => (
          <ShopTournamentCard
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

export default ShopTournamentPage;