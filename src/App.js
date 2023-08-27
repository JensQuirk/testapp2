import React from "react";
import {  Routes, Route } from "react-router-dom";
import './App.css';

import './WriteNote.js';
import WriteNote from "./WriteNote.js";
import Home from './Home.js';
import { Navbar } from "./Navbar";
import BattleShipPage from "./BattleshipPage";

export default function App()
{
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<WriteNote />} />
        <Route path="/battleship" element={<BattleShipPage />}></Route>
      </Routes>
    </>
  );
}