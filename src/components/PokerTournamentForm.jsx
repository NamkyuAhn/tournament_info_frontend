function PokerTournamentForm({
  value,
  onChange,
}) {


  const handleChange = (
    field,
    newValue
  ) => {

    onChange({
      ...value,
      [field]: newValue,
    });

  };


  const fields = [
    {
      key: "max_entries",
      label: "Max Entries",
    },
    {
      key: "starting_chips",
      label: "Starting Chips",
    },
    {
      key: "reentry_fee",
      label: "Reentry Fee",
    },

    {
      key: "max_reentries",
      label: "Max Reentries",
    },
    {
      key: "early_chips",
      label: "Early Chips",
    },
    {
      key: "addon_fee",
      label: "Addon Fee",
    },

    {
      key: "max_addons",
      label: "Max Addons",
    },
    {
      key: "reentry_chips",
      label: "Reentry Chips",
    },
    {
      key: "addon_chips",
      label: "Addon Chips",
    },
  ];



  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "25px",
        borderRadius: "10px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >

      <h2>
        Poker Information
      </h2>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >

        {
          fields.map((field) => (

            <div
              key={field.key}
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "8px",
              }}
            >

              <label>
                {field.label}
              </label>


              <input
                type="number"
                value={
                  value[field.key]
                }
                onChange={(e) =>
                  handleChange(
                    field.key,
                    e.target.value
                  )
                }
                style={{
                  padding: "10px",
                  fontSize: "15px",
                  width: "100%",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>

          ))
        }


      </div>


    </div>
  );
}

export default PokerTournamentForm;