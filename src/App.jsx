import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserBookings from "./components/UserBookings";
import "./App.css";
import { BackgroundImageProvider } from "../backgroundImageContext";

export default function App() {
  return (
    <AuthProvider>
      <BackgroundImageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/booking" element={<UserBookings />} />
            <Route path="*" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </BackgroundImageProvider>
    </AuthProvider>
  );
}
