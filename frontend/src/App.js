
import Register from './components/register';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Switch,
} from "react-router-dom";
import Login from "./components/login";
import { PrivateRoute } from "./utils/privateroute";
import { AuthProvider } from "./context/context";
import AddCat from './components/addcar';
import EditCar from './components/editcar';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* <Switch> */}
          <Route exact path="/" element={<PrivateRoute></PrivateRoute>}></Route>
          <Route exact path="/addcar" element={<AddCat></AddCat>}></Route>
          <Route exact path="/modify/:id" element={<EditCar></EditCar>}></Route>
          <Route exact path="/register" element={<Register></Register>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          {/* </Switch> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
