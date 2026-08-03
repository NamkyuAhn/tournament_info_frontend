import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const showButton = location.pathname !== "/";

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {showButton && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
          <Link to="/">
            <button
              style={{
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Tournament List
            </button>
          </Link>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Layout;