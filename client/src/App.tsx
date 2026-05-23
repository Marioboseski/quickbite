import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Layout from "./layouts/Layout";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />}/>
      </Route>

    </Routes>
  );
}

export default App;