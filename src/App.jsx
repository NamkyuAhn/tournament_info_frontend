import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TournamentDetailPage from "./pages/TournamentDetailPage";
import MyTournamentPage from "./pages/MyTournamentPage";
import MyTournamentDetailPage from "./pages/MyTournamentDetailPage";
import ShopManagePage from "./pages/ShopManagePage"
import ShopTournamentPage from "./pages/ShopTournamentPage"
import ShopTournamentDetailPage from "./pages/ShopTournamentDetailPage";
import ShopCreateEditPage from "./pages/ShopCreateEditPage";

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
          <Route
            path="/shop-manage"
            element={<ShopManagePage />}
          />
          <Route
            path="/shop-tournaments"
            element={<ShopTournamentPage />}
          />
          <Route
            path="/shop-tournaments/:id"
            element={<ShopTournamentDetailPage />}
          />
          <Route
            path="/shop-createedit"
            element={<ShopCreateEditPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;