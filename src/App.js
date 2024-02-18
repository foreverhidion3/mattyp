import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Title from "./components/Title_page";
import Matt_load from "./components/Matt_load";
import Luke_load from "./components/Luke_load";
import Luke_Game_Container from "./components/Luke_Game_Container";
import Matt_Game_Container from "./components/Matt_Game_Container";
import Matt_secret_lab from "./components/Matt_secret_lab";
import Luke_secret_lab from "./components/Luke_secret_lab";
import Winner_page from "./components/Luke_winner_page";
import Matt_travel from "./components/Matt_travel";
import Matt_loser_page from "./components/Matt_loser_page";
import Matt_winner_page from "./components/Matt_winner_page";
import Matt_win_travel from "./components/Matt_win_travel";
import Luke_travel from "./components/Luke_travel";
import Luke_loser_page from "./components/Luke_loser_page";
import Luke_winner_page from "./components/Luke_winner_page";
import Luke_win_travel from "./components/Luke_win_travel";
import Game_full from "./components/Game_full";
import Story_mode from "./components/Story_mode";
import Photos from "./components/Photos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path= '/' element={<Title />} />
          <Route path= '/matt_loading' element={<Matt_load />} />
          <Route path= '/luke_loading' element={<Luke_load  />} />
          <Route path= '/luke_war' element={<Luke_Game_Container />} />
          <Route path= '/mattyp_war' element={<Matt_Game_Container />} />
          <Route path="/matt_secret_lab" element={<Matt_secret_lab />} />
          <Route path="/luke_secret_lab" element={<Luke_secret_lab />} />
          <Route path="/winner" element={<Winner_page />} />
          <Route path="/matt_travel" element={<Matt_travel />} />
          <Route path="/matt_game_over" element={<Matt_loser_page />} />
          <Route path="/matt_win_travel" element={<Matt_win_travel />} />
          <Route path="/matt_winner_page" element={<Matt_winner_page />} />
          <Route path="/luke_travel" element={<Luke_travel />} />
          <Route path="/luke_game_over" element={<Luke_loser_page />} />
          <Route path="/luke_win_travel" element={<Luke_win_travel />} />
          <Route path="/luke_winner_page" element={<Luke_winner_page />} />
          <Route path="/game_full" element={<Game_full />} />
          <Route path="/story_mode" element={<Story_mode />} />
          <Route path="/photos" element={<Photos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
