import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Title from "./components/Title_page";
import Secret_lab from "./components/Secret_lab";
import Game from "./components/Game";
import Winner_page from "./components/Winner_page";
import Loser_page from "./components/Loser_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path= '/' element={<Title />} />
          <Route path="/secret_lab" element={<Secret_lab />} />
          <Route path="/game" element={<Game />} />
          <Route path="/winner" element={<Winner_page />} />
          <Route path="/game_over" element={<Loser_page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
