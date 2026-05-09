import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailPage";
import CartPage from "./pages/cartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Footer from "./components/layout/footer";
import ProfilePage from "./pages/ProfilePage";

export default function App(){
    return(
        <BrowserRouter>
            <Toaster position="top-right" toastOptions={{
                style: {
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    borderRadius: "12px",
                    color: "#fdf8f0"
                }
            }}/>
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/product/:id" element={<ProductDetailsPage />}/>
                        <Route path="/cart" element={<CartPage />}/>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}