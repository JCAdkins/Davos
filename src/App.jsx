import "./App.css";
import { StickyNavbar } from "./components/StickyNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Podcasts from "./pages/Podcasts";
import Members from "./pages/Members";
import Footer from "./components/StickyFooter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-cover bg-fixed w-fit">
      <Router>
        <StickyNavbar />
        <Routes>
          <Route exact path="jordy/about" element={<About />} />
          <Route exact path="jordy/events" element={<Events />} />
          <Route exact path="jordy/home" element={<Home />} />
          <Route exact path="jordy/members" element={<Members />} />
          <Route exact path="jordy/podcasts" element={<Podcasts />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
