import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { formatDateTime } from "../utils/formatDateTime";
import BlindStructureDisplay from "../components/BlindStructureDisplay";

function TournamentDetailPage() {
  const { id } = useParams();

  const [tournament, setTournament] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
          
  const handleEntryRequest = async () => {
    try {
      const response = await api.post(
        `/tournaments/${id}/buyin/`,
        {
          type: "ENTRY",
        }
      );

      console.log(response.data);

      alert("Entry request submitted successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to submit entry request."
      );
    }
  };

  useEffect(() => {
    
    const fetchTournament = async () => {
      try {
        const response = await api.get(`/tournaments/${id}/`);

        const data = response.data;

        const sortedImages = [...data.images].sort((a, b) => {
          if (a.is_primary && !b.is_primary) {
            return -1;
          }

          if (!a.is_primary && b.is_primary) {
            return 1;
          }

          return a.id - b.id;
        });
        setTournament(data);
        setImages(sortedImages);
        setCurrentImage(0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTournament();
  }, [id]);

  if (!tournament) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        <div style={{ width: "500px" }}>
          {images.length > 0 && (
            <>
              <div
                style={{
                  position: "relative",
                  width: "500px",
                  height: "350px",
                  border: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {images.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentImage(
                        currentImage === 0
                          ? images.length - 1
                          : currentImage - 1
                      )
                    }
                    style={{
                      position: "absolute",
                      left: "10px",
                      fontSize: "24px",
                      zIndex: 1,
                    }}
                  >
                    {"<"}
                  </button>
                )}

                <img
                  src={images[currentImage].image}
                  alt={tournament.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />

                {images.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentImage(
                        currentImage === images.length - 1
                          ? 0
                          : currentImage + 1
                      )
                    }
                    style={{
                      position: "absolute",
                      right: "10px",
                      fontSize: "24px",
                      zIndex: 1,
                    }}
                  >
                    {">"}
                  </button>
                )}
              </div>

              {images.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  {images.map((_, index) => (
                    <span
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor:
                          currentImage === index
                            ? "black"
                            : "#ccc",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <h1>{tournament.title}</h1>

          <p>
            <strong>Shop:</strong> {tournament.shop_name}
          </p>

          <p>
            <strong>Game Type:</strong> {tournament.game_type}
          </p>

          <p>
            <strong>Status:</strong> {tournament.status}
          </p>

          <p>
            <strong>Max Participants:</strong> {tournament.max_participants}
          </p>

          <p>
            <strong>Start Time:</strong>{" "}
            {formatDateTime(tournament.start_time)}
          </p>

          <p>
            <strong>Registration Deadline:</strong>{" "}
            {formatDateTime(
                tournament.registration_deadline
                )}
          </p>

          {["WAITING", "RUNNING", "REGI_CLOSED"].includes(
            tournament.status
          ) && (
            <>
              <p>
                <strong>Live Players:</strong>{" "}
                {tournament.live_players_cache}
              </p>

              <button
                type="button"
                onClick={handleEntryRequest}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Entry
              </button>
            </>
          )}
        </div>
      </div>

      <hr />

      <h2>Description</h2>

      <p>{tournament.description}</p>

      <hr />

      <h2>Prize Structure</h2>

      {Object.entries(tournament.prize_structure).map(
        ([rank, prize]) => (
          <p key={rank}>
            {rank} Place: {prize.toLocaleString()}
          </p>
        )
      )}

      {tournament.poker_tournament && (
        <>
          <hr />

          <h2>Poker Information</h2>

          <p>
            <strong>Max Entries:</strong>{" "}
            {tournament.poker_tournament.max_entries}
          </p>

          <p>
            <strong>Max Reentries:</strong>{" "}
            {tournament.poker_tournament.max_reentries}
          </p>

          <p>
            <strong>Max Addons:</strong>{" "}
            {tournament.poker_tournament.max_addons}
          </p>

          <p>
            <strong>Starting Chips:</strong>{" "}
            {tournament.poker_tournament.starting_chips.toLocaleString()}
          </p>

          <p>
            <strong>Early Chips:</strong>{" "}
            {tournament.poker_tournament.early_chips.toLocaleString()}
          </p>

          <p>
            <strong>Reentry Chips:</strong>{" "}
            {tournament.poker_tournament.reentry_chips.toLocaleString()}
          </p>

          <p>
            <strong>Addon Chips:</strong>{" "}
            {tournament.poker_tournament.addon_chips.toLocaleString()}
          </p>

          <p>
            <strong>Reentry Fee:</strong>{" "}
            {tournament.poker_tournament.reentry_fee.toLocaleString()}
          </p>

          <p>
            <strong>Addon Fee:</strong>{" "}
            {tournament.poker_tournament.addon_fee.toLocaleString()}
          </p>

          <h3>Blind Structure</h3>
          <BlindStructureDisplay
            value={
              tournament.poker_tournament.blind_structure
            }
          />

        </>
      )}
    </div>
  );
}

export default TournamentDetailPage;