import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;