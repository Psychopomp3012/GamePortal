import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import RPS from "./pages/RPS";
import BCG from "./pages/BCG";
import Game1 from "./components/Game1/Game1.js";
import BTG from "./pages/BTG.js";
import NoPage from "./pages/NoPage";


export default function App() {
  
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rps" element={<RPS />} />
          <Route path="bcg" element={<BCG />} />
          <Route path="clickBox" element={<Game1 />} />
          <Route path="birdTapGame" element={<BTG />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);