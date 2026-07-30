import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Tournament Info</h1>

      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default HomePage;