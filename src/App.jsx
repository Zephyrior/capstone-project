import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ProfilePage from "./components/ProfilePage";
import WidgetsPage from "./components/WidgetsPage";
import GeneralCircleList from "./components/GeneralCircleList";
import React from "react";
import { setNavigate } from "./services/navigation";
import EditProfile from "./components/EditProfile";

const NavigationSetter = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return null;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/widgets" element={<WidgetsPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/search/:name" element={<GeneralCircleList />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
