"use client";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Homepage from "./components/home";
import Nav from "./components/Nav";
import Banner from "./components/banner";
import Search from "./components/search";
import Register from "./login/register";
import Login from "./login/login";
import ProductDetail from "./components/ProductDetail";
import Promotion from "./components/promotion";
import NavSucess from "./login/Navsuccess";
import Roomtype from "./components/roomtype";
import City from "./components/city";
import ReservePage from "./components/reserve";
import Navadmin from "./login/navadmin";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<"user" | "admin" | null>(null);

  // Pages where header should be hidden
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  // Show Banner/Search only on user pages
  const showUserHeader = !hideHeader && role !== "admin";

  return (
    <>
      {!hideHeader && (
        <>
          {role === "admin" && isLoggedIn ? (
            <Navadmin />
          ) : isLoggedIn ? (
            <NavSucess />
          ) : (
            <Nav />
          )}
          {showUserHeader && (
            <>
              <Banner />
              <Search />
            </>
          )}
        </>
      )}

      <main>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={(r) => {
                  setIsLoggedIn(true);
                  setRole(r);
                }}
              />
            }
          />
          <Route
            path="/admin"
            element={
              isLoggedIn && role === "admin" ? (
                <>
                  <Banner/>
                  <Search/>
                  <Homepage /> 
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/roomtype/:product" element={<Roomtype />} />
          <Route path="/city/:city" element={<City />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </main>
    </>
  );
}


export default App;
