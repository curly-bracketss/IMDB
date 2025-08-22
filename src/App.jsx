import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import AllTrailers from "../pages/AllTrailers.jsx"
import MainLayout from "../layout/MainLayout.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import MovieAbout from "../pages/MovieAbout.jsx";
import AllLists from "../pages/AllLists.jsx";
import AlbumSwiper from "../pages/AlbumSwiper.jsx";
import VideoGallery from '../pages/VideoGallery.jsx'
import Register from "../pages/Register.jsx";
import SignIn from "../pages/SignIn.jsx";
import Account from "../pages/Account.jsx";

import Exact from "../pages/Exact.jsx";
import UserPage from "../pages/UserPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/video/:id" element={<MovieDetails />} />
          <Route path="/title/:id" element={<MovieAbout />} />
          <Route path="/title/:id/albumswiper/:srcId" element={<AlbumSwiper />} />
          <Route path='/title/:id/videogallery' element={<VideoGallery />} />
          <Route path="/trailers" element={<AllTrailers />} />
          <Route path="/find/:query/:filter/:matchType" element={<Exact />} />
          <Route path="/user/:userID/:listType" element={<UserPage/>}/>
          <Route path="/chart/:species" element={<AllLists />} />
          <Route path="/registration/signin" element={<Account />} />
        </Route>
        <Route path="/ap/register" element={<Register />} />
        <Route path="/ap/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;