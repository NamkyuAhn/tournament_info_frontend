import { Link } from "react-router-dom";

function ShopManagePage() {
  return (
    <div>
      <h1>Shop Manage</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "300px",
        }}
      >
        <Link to="/shop-createedit">
          <button
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            Shop Create/Edit
          </button>
        </Link>

        <Link to="/shop-tournaments/create">
          <button
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            Create Tournament
          </button>
        </Link>
        
        <Link to="/shop-tournaments">
          <button
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            My Shop Tournaments
          </button>
        </Link>

        <Link to="/entry-manage">
          <button
            style={{
              width: "100%",
              padding: "15px",
            }}
          >
            Entry Manage
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ShopManagePage;