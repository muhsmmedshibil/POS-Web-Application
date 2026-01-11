import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute"; // Import your new file
import './App.css'
import AdminPanel from "./Pages/AdminPanel";
// import AdminPanel from "./Pages/AdminPanel";

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
      <Route path="/AdminPanel" element={<AdminPanel />} />
    </Routes>
  );
}

export default App