import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <BookList />
                    <BookForm />
                  </>
                </ProtectedRoute>
              }
            />
            
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;