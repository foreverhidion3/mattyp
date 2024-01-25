import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Title from "./components/Title_page";
import Secret_lab from "./components/Secret_lab";
import Game from "./components/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path= '/' element={<Title />} />
          <Route path="/secret_lab" element={<Secret_lab />} />
          <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
