import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./header/Navbar.jsx"
import Home from "../pages/Home.jsx"
import Trailer from "./Components/Trailer.jsx"


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Trailer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
