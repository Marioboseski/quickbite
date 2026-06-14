import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import HistoryOrders from "./pages/OrderHistory";
import Auth from "./pages/Auth";
import Layout from "./layouts/Layout";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersHistory" element={<HistoryOrders />} />
      </Route>

      <Route path="/" element={<Auth />} />

    </Routes>
  );
}

export default App;