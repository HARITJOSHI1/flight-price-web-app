import React from "react";
import OAuth from "./OAuth";
import './styles.css';

export default function NavBar() {
  return (
    <nav>
      <div className="logo">
        <h1>Flight Price App</h1>
      </div>

      <OAuth />
    </nav>
  );
}
