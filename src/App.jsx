import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ProfilePage from "./components/ProfilePage";
import WidgetsPage from "./components/WidgetsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Widgets" element={<WidgetsPage />} />
            <Route path="/Profile/:id" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
