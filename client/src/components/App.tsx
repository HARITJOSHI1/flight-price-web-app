import React, { createContext, useState, useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { User } from "firebase/auth";
import { firebase } from "../firebaseInit";
import FlightDetailsPage from "../pages/FlightDetails";
import RouteNotFoundPage from "../pages/RouteNotFoundPage";
import "./App.css";

interface AuthState {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthStateStore = createContext<AuthState>({
  currentUser: null,
  setCurrentUser: () => {},
});

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);
    });
  }, []);

  return (
    <AuthStateStore.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/flightDetails" element={<FlightDetailsPage />} />
          <Route path="*" element={<RouteNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthStateStore.Provider>
  );
}
