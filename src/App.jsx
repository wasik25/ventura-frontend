import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./components/home/HomePage";
import NotFoundPage from "./components/ui/NotFoundPage";
import ProductPage from "./components/product/ProductPage";
import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import LoginPage from "./components/user/LoginPage";
import { useEffect, useState } from "react";
import api from "./api";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import UserProfilePage from "./components/user/UserProfilePage";
import PaymentStatusPage from "./components/payment/PaymentStatusPage";
import SignUpPage from "./components/user/SignUpPage";
import VerifyEmail from "./components/VerifyEmail";
import SuccessPage from "./components/SuccessPage";
import FailPage from "./components/FailPage";
import CancelPage from "./components/CancelPage";
const App = () => {
  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code");

  useEffect(() => {
    if (cart_code) {
      api
        .get(`get_cart_stat?cart_code=${cart_code}`)
        .then((res) => {
          console.log(res.data);
          setNumberCartItems(res.data.num_of_items);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [cart_code]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />} />
            <Route  path="success" element={<SuccessPage/>} />
            <Route  path="fail" element={<FailPage/>} />
            <Route  path="cancel" element={<CancelPage/>} />
            <Route
              path="products/:slug"
              element={<ProductPage setNumberCartItems={setNumberCartItems} />}
            />
            <Route
              path="cart"
              element={<CartPage setNumberCartItems={setNumberCartItems} />}
            />
             <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="payment-status"
              element={
                <PaymentStatusPage setNumberCartItems={setNumberCartItems} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
