import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Graficas from "./components/Graficas";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graficas" element={<Graficas />} />
    </Routes>
  );
}
