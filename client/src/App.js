import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import Popup from "./components/Popup";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import NotFound from "./pages/NotFound";
import PassReset from "./pages/PassReset";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me/:id" element={<Profile />} />
        <Route path="/messenger/:chatId" element={<Messenger />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<PassReset />} />
        <Route path="/verify" element={<Verify />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Popup />
    </div>
  );
}

export default App;
