import React from "react";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import "./index.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar selected_Item={0}/>
    </div>
  );
}

export default App;
