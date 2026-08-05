import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/formatDateTime";

function ShopTournamentCard({ tournament }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/shop-tournaments/${tournament.id}`)
      }
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        cursor: "pointer",
      }}
    >
      <h3>{tournament.title}</h3>

      <p>
        Game: {tournament.game_type}
      </p>

      <p>
        Status: {tournament.status}
      </p>

      <p>
        Start: {formatDateTime(tournament.start_time)}
      </p>

      <p>
        Entry Fee: {tournament.entry_fee}
      </p>

      {(tournament.status === "WAITING" ||
        tournament.status === "RUNNING" ||
        tournament.status === "REGI_CLOSED") && (
        <p>
          Live Players: {tournament.live_players_cache}
        </p>
      )}
    </div>
  );
}

export default ShopTournamentCard;