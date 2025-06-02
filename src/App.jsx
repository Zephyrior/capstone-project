import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ProfilePage from "./components/ProfilePage";
import WidgetsPage from "./components/WidgetsPage";
import GeneralCircleList from "./components/GeneralCircleList";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
