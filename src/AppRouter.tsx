import { Route, Routes } from "react-router";
import MainPage from "./components/main-page/MainPage";
import "./assets/styles/global.scss";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Chat from "./components/chat/Chat";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/room/:roomTitle" element={<Chat />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default AppRouter;
