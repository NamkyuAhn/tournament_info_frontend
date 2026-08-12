function BlindStructureDisplay({ value }) {
  if (!value?.levels || value.levels.length === 0) {
    return (
      <div>
        No blind structure available.
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>
        Blind Structure
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "80px 1fr 1fr 1fr 120px",
          gap: "10px",
          alignItems: "center",
          padding: "10px 0",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
        }}
      >
        <span>Level</span>
        <span>Big Blind</span>
        <span>Small Blind</span>
        <span>Ante</span>
        <span>Duration</span>
      </div>

      {value.levels.map((item, index) => {
        if (item.type === "BREAK") {
          return (
            <div
              key={index}
              style={{
                padding: "14px 10px",
                textAlign: "center",
                fontWeight: "bold",
                background: "#f5f5f5",
                borderBottom: "1px solid #eee",
              }}
            >
              BREAK - {item.duration_minutes} mins
            </div>
          );
        }

        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns:
                "80px 1fr 1fr 1fr 120px",
              gap: "10px",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>
              {item.level}
            </span>

            <span>
              {item.big_blind}
            </span>

            <span>
              {item.small_blind}
            </span>

            <span>
              {item.ante}
            </span>

            <span>
              {item.duration_minutes} mins
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default BlindStructureDisplay;