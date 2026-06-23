import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import HistoryOrders from "./pages/OrderHistory";
import { RegisterForm } from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import Profile from "./pages/Profile";
import Layout from "./layouts/Layout";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersHistory" element={<HistoryOrders />} />
        <Route path="/profile" element={<Profile />} />
        
      </Route>

      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

    </Routes>
  );
}

export default App;