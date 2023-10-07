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
    <div className="bg-cover bg-fixed w-screen overscroll-contain">
      <Router>
        <StickyNavbar />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/members" element={<Members />} />
          <Route exact path="/podcasts" element={<Podcasts />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
