import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Header } from "./components/nav";
import {Dashboard} from "./components/dashboard";
import {Favorite} from "./components/favorite";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="favorite" element={<Favorite />}/>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
