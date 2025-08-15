import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import AllTrailers from "./Components/AllTrailers.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import MovieAbout from "../pages/MovieAbout.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/video/:id" element={<MovieDetails />} />
          <Route path="/title/:id" element={<MovieAbout />} />
          <Route path="/trailers" element={<AllTrailers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;