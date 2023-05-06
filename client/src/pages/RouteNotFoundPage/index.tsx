import React from "react";
import "./styles.css";

function NotFound(): JSX.Element {
  return (
    <div className="not-found-container">
      <h1 className="not-found-header">404 - Page Not Found</h1>
      <p className="not-found-message">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
