import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TournamentDetailPage from "./pages/TournamentDetailPage";
import MyTournamentPage from "./pages/MyTournamentPage";
import MyTournamentDetailPage from "./pages/MyTournamentDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/tournaments/:id"
            element={<TournamentDetailPage />}
          />
          <Route
            path="/my-tournaments"
            element={<MyTournamentPage />}
          />
          <Route
            path="/my-tournaments/:id"
            element={<MyTournamentDetailPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;