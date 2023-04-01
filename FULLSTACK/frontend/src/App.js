import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Cars from "./pages/Cars";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddCar from "./pages/AddCar";
import EditCars from "./pages/EditCars";

function App() {
  return (
    <div> 
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/add" element={<AddUser/>}/>
            <Route path="/users/edit/:id" element={<EditUser/>}/>
            <Route path="/cars" element={<Cars/>}/>
            <Route path="/cars/add" element={<AddCar/>}/>
            <Route path="/cars/edit/:id" element={<EditCars/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
