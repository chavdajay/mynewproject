// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import BookList from './components/BookList';
// import BookForm from './components/BookForm';
// import { AuthProvider } from './context/AuthContext';
// import { BookProvider } from './context/BookContext';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {

//   const islogin = localStorage.getItem("token");
//   console.log(islogin)
//   return (
//     <AuthProvider>
//       <BookProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <BookList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/book-list"
//               element={
//                 <ProtectedRoute>
//                   <BookList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/add-book"
//               element={
//                 <ProtectedRoute>
//                   <BookForm />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Signup />} />
//           </Routes>
//         </BrowserRouter>
//       </BookProvider>
//     </AuthProvider>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { useEffect } from 'react';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current location (URL path)
  const isLogin = localStorage.getItem("token");

  useEffect(() => {
    // Check if the current route is "/" or "/localhost:3000" (home route)
    if (location.pathname === "/") {
      localStorage.removeItem("token");
      navigate('/login');
    }
    if(!isLogin){
      navigate('/login')
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
              path="/"
              element={
                <PrivateRoute>
                  {/* Content for / route if logged in */}
                  {/* <BookList /> */}
                </PrivateRoute>
              }
            />
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
