import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute"; // Import your new file
import './App.css'

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Protected Route */}
      <Route 
        path="/Home" 
        element={
          // <Home/>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App