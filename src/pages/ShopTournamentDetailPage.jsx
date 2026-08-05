import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import { formatDateTime } from "../utils/formatDateTime";


function ShopTournamentDetailPage() {
  const { id } = useParams();


  const [tournament, setTournament] = useState(null);

  const [entries, setEntries] = useState([]);

  const [entryPage, setEntryPage] = useState(1);

  const [entryTotalPages, setEntryTotalPages] = useState(0);



  const fetchTournament = async () => {
    try {
      const response = await api.get(
        `/tournaments/my-shop-tournaments/${id}/`
      );

      setTournament(response.data);

    } catch (error) {
      console.error(error);
    }
  };



  const fetchEntries = async (page) => {
    try {
      const response = await api.get(
        `/tournaments/my-shop-tournaments/${id}/entries/?page=${page}`
      );


      setEntries(response.data.results);


      setEntryTotalPages(
        Math.ceil(response.data.count / 10)
      );


    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchTournament();
    fetchEntries(1);

  }, [id]);



  const handleEntryPageChange = (page) => {

    if (page < 1 || page > entryTotalPages) {
      return;
    }


    setEntryPage(page);

    fetchEntries(page);
  };



  if (!tournament) {
    return (
      <div>
        Loading...
      </div>
    );
  }



  return (
    <div>

      <h1>
        {tournament.title}
      </h1>



      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginBottom: "30px",
        }}
      >


        <section>

          <h2>
            Tournament Info
          </h2>


          <p>
            Description: {tournament.description}
          </p>


          <p>
            Game: {tournament.game_type}
          </p>


          <p>
            Status: {tournament.status}
          </p>


          <p>
            Start Time:{" "}
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
            Live Players:{" "}
            {tournament.live_players_cache}
          </p>


        </section>





        {tournament.poker_tournament && (

          <section>

            <h2>
              Poker Information
            </h2>


            <p>
              Max Entries:{" "}
              {
                tournament.poker_tournament.max_entries
              }
            </p>


            <p>
              Max Reentries:{" "}
              {
                tournament.poker_tournament.max_reentries
              }
            </p>


            <p>
              Max Addons:{" "}
              {
                tournament.poker_tournament.max_addons
              }
            </p>


            <p>
              Total Entries:{" "}
              {
                tournament.poker_tournament.total_entries_cache
              }
            </p>


            <p>
              Total Reentries:{" "}
              {
                tournament.poker_tournament.total_reentries_cache
              }
            </p>


            <p>
              Total Addons:{" "}
              {
                tournament.poker_tournament.total_addons_cache
              }
            </p>


          </section>

        )}


      </div>





      <section>

        <h2>
          Entries
        </h2>



        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>

            <tr>

              <th>
                Player
              </th>

              <th>
                Status
              </th>

              <th>
                Approval Status
              </th>

              <th>
                Buy In Type
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>



          <tbody>

            {entries.map((entry) => (

              <tr
                key={entry.id}
                style={{
                  textAlign: "center",
                }}
              >

                <td>
                  {entry.player_email}
                </td>


                <td>
                  {entry.status}
                </td>


                <td>
                  {entry.approval_status}
                </td>


                <td>
                  {entry.buy_in_type}
                </td>


                <td>

                  {entry.approval_status === "PENDING" && (

                    <>
                      <button>
                        Approve
                      </button>


                      <button>
                        Reject
                      </button>
                    </>

                  )}

                </td>


              </tr>

            ))}


          </tbody>


        </table>





        {entryTotalPages > 0 && (

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >

            <button
              disabled={entryPage === 1}
              onClick={() =>
                handleEntryPageChange(
                  entryPage - 1
                )
              }
            >
              {"<"}
            </button>



            <span>
              {entryPage} / {entryTotalPages}
            </span>



            <button
              disabled={
                entryPage === entryTotalPages
              }
              onClick={() =>
                handleEntryPageChange(
                  entryPage + 1
                )
              }
            >
              {">"}
            </button>


          </div>

        )}


      </section>


    </div>
  );
}


export default ShopTournamentDetailPage;