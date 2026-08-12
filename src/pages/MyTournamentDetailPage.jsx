import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import { formatDateTime } from "../utils/formatDateTime";
import BlindStructureDisplay from "../components/BlindStructureDisplay";

function MyTournamentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await api.get(
          `/tournaments/my-tournaments/${id}/`
        );

        setTournament(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTournament();
  }, [id]);

  const handleReentry = async () => {
    try {
      await api.post(
        `/tournaments/${tournament.id}/buyin/`,
        {
          type: "REENTRY",
        }
      );

      alert(
        "Reentry request submitted."
      );

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        JSON.stringify(
          error.response?.data ||
          "Reentry failed."
        )
      );
    }
  };

  const handleAddon = async () => {
    try {
      await api.post(
        `/tournaments/${tournament.id}/buyin/`,
        {
          type: "ADDON",
        }
      );

      alert(
        "Addon request submitted."
      );

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        JSON.stringify(
          error.response?.data ||
          "Addon failed."
        )
      );
    }
  };

  if (!tournament) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {tournament.title}
      </h1>

      <button
        onClick={() =>
          navigate(
            `/tournaments/${tournament.id}`
          )
        }
      >
        View Tournament Info
      </button>

      {tournament.game_type === "POKER" &&
        tournament.status === "RUNNING" &&
        tournament.entry?.status === "BUSTED" && (
          <button
            onClick={handleReentry}
            style={{
              marginLeft: "10px",
            }}
          >
            REENTRY
          </button>
        )}

      {tournament.game_type === "POKER" &&
        tournament.status === "RUNNING" &&
        tournament.entry?.status === "REGISTERED" && (
          <button
            onClick={handleAddon}
            style={{
              marginLeft: "10px",
            }}
          >
            ADDON
          </button>
        )}

      <hr />

      <h2>
        Basic Information
      </h2>

      <p>
        Shop: {tournament.shop_name}
      </p>

      <p>
        Game: {tournament.game_type}
      </p>

      <p>
        Status: {tournament.status}
      </p>

      <p>
        Start:{" "}
        {formatDateTime(
          tournament.start_time
        )}
      </p>

      <p>
        Registration Deadline:{" "}
        {formatDateTime(
          tournament.registration_deadline
        )}
      </p>

      <p>
        Entry Fee: {tournament.entry_fee}
      </p>

      <p>
        Description:{" "}
        {tournament.description}
      </p>

      <h2>
        Prize Structure
      </h2>

      {Object.entries(
        tournament.prize_structure
      ).map(([rank, prize]) => (
        <p key={rank}>
          {rank} Place : {prize}
        </p>
      ))}

      {tournament.poker_tournament && (
        <>
          <h2>
            Poker Information
          </h2>

          <p>
            Max Entries:{" "}
            {
              tournament.poker_tournament
                .max_entries
            }
          </p>

          <p>
            Max Reentries:{" "}
            {
              tournament.poker_tournament
                .max_reentries
            }
          </p>

          <p>
            Max Addons:{" "}
            {
              tournament.poker_tournament
                .max_addons
            }
          </p>

          <p>
            Starting Chips:{" "}
            {
              tournament.poker_tournament
                .starting_chips
            }
          </p>

          <p>
            Reentry Fee:{" "}
            {
              tournament.poker_tournament
                .reentry_fee
            }
          </p>

          <p>
            Addon Fee:{" "}
            {
              tournament.poker_tournament
                .addon_fee
            }
          </p>

          <BlindStructureDisplay
            value={
              tournament.poker_tournament
                .blind_structure
            }
          />
        </>
      )}

      {tournament.entry && (
        <>
          <h2>
            My Entry Information
          </h2>

          <p>
            Approval:{" "}
            {tournament.entry.approval_status}
          </p>

          <p>
            Entry Status:{" "}
            {tournament.entry.status}
          </p>

          <p>
            Table:{" "}
            {tournament.entry.table_number}
          </p>

          <p>
            Seat:{" "}
            {tournament.entry.seat_number}
          </p>

          <h2>
            Buy-in History
          </h2>

          {tournament.entry.buyin_events.map(
            (event) => (
              <p key={event.id}>
                {event.type} - {event.amount} (
                {formatDateTime(
                  event.created_at
                )}
                )
              </p>
            )
          )}
        </>
      )}
    </div>
  );
}

export default MyTournamentDetailPage;