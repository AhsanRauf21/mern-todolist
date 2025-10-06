import React from "react";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import { MainContext } from "./context/MainContext";
import ProtectedLayer from "./layout/ProtectedLayer";

const App = () => {
  return (
    <>
      <Router>
          <ToastContainer />
        <MainContext>
          <NavBar />

          <Routes>
            <Route Component={ProtectedLayer}>

            <Route path="/" Component={Dashboard} />
            </Route>

            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={Register} />
            <Route path="*" Component={ErrorPage} />
          </Routes>

          <Footer />
        </MainContext>
      </Router>
    </>
  );
};

export default App;
