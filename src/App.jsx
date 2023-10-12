import "./App.css";
import StickyNavbar from "./navigation/StickyNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Podcasts from "./pages/Podcasts";
import Members from "./pages/Members";
import StickyFooter from "./navigation/StickyFooter";
import Profile from "./pages/Profile";
import UserSettings from "./pages/UserSettings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import ProtectedRoute from "./navigation/ProtectedRoute";

function App() {
  const [user, setUser] = useState();

  return (
    <div className="bg-cover bg-fixed w-fit">
      {console.log(user)}
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <StickyNavbar />
          <Routes>
            <Route exact path="/jordy/about" element={<About />} />
            <Route exact path="/jordy/events" element={<Events />} />
            <Route exact path="/jordy" element={<Home />} />
            <Route
              exact
              path="/jordy/members"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Members />
                </ProtectedRoute>
              }
            />
            <Route exact path="/jordy/podcasts" element={<Podcasts />} />
            <Route
              exact
              path="/profile"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/profile/settings"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <UserSettings user={user} />
                </ProtectedRoute>
              }
            />
          </Routes>
          <StickyFooter />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
