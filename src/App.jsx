import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserBookings from "./components/UserBookings";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/booking" element={<UserBookings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
