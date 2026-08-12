import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/formatDateTime";

function TournamentCard({
  tournament,
  showImage = true,
  path = `/tournaments/${tournament.id}`,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      {showImage && tournament.primary_image && (
        <img
          src={tournament.primary_image}
          alt={tournament.title}
          width="200"
        />
      )}

      <h3>{tournament.title}</h3>

      <p>
        Shop: {tournament.shop_name}
      </p>

      <p>
        Game: {tournament.game_type}
      </p>

      <p>
        Start:{" "}
        {formatDateTime(tournament.start_time)}
      </p>
    </div>
  );
}

export default TournamentCard;