
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
import AddCat from './components/addcat';
import AddCar from './components/addcar';
import EditCar from './components/editcar';
import EditCat from './components/editcat';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* <Switch> */}
          <Route exact path="/" element={<PrivateRoute></PrivateRoute>}></Route>
          <Route exact path="/addcar" element={<AddCar></AddCar>}></Route>
          <Route exact path="/modify/:id" element={<EditCar></EditCar>}></Route>
          <Route exact path="/addcat" element={<AddCat></AddCat>}></Route>
          <Route exact path="/modifycat/:id" element={<EditCat></EditCat>}></Route>
          <Route exact path="/register" element={<Register></Register>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          {/* </Switch> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
