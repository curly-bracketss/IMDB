import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import AllTrailers from "../pages/AllTrailers.jsx"
import MainLayout from "../layout/MainLayout.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import MovieAbout from "../pages/MovieAbout.jsx";
import AllLists from "../pages/AllLists.jsx";
import AlbumSwiper from "../pages/AlbumSwiper.jsx";
import VideoGallery  from '../pages/VideoGallery.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/video/:id" element={<MovieDetails />} />
          <Route path="/title/:id" element={<MovieAbout />} />
            <Route path="/title/:id/albumswiper/:srcId" element={<AlbumSwiper/>} />
            <Route path='/title/:id/videogallery' element={<VideoGallery/>}/>
          <Route path="/trailers" element={<AllTrailers />} />
          <Route path="/chart/:species" element={<AllLists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;