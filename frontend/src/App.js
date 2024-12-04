import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";
import "./App.css";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = localStorage.getItem("token");

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem("token");
      navigate("/login");
    }
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate, location]);

  return isLogin ? children : null;
}

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/book-list"
              element={
                <PrivateRoute>
                  <BookList />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-book"
              element={
                <PrivateRoute>
                  <BookForm />
                </PrivateRoute>
              }
            />
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
