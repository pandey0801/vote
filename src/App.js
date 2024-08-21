import "./App.css";
import Login from "./component/Login";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";
import LogOut from "./component/LogOut";
import ForgetPas from "./component/ForgetPas";
import Vote from "./component/Vote";
import HomePage from "./component/HomePage";
import { useSelector } from "react-redux";
import Update from "./component/Update";

function App() {
  const { isLoggedIn } = useSelector((state) => state.log);

  return (
    <>
      <Router>
        <nav className="p-3 flex bg-slate-950 justify-center items-center">
          <div className="flex-none w-20 h-7">
            <NavLink to="/home" className="text-white">
              Home
            </NavLink>
          </div>

         {!isLoggedIn && <div className="flex-none w-20 h-7">
            <NavLink to="/login" className="text-white">
              Login
            </NavLink>
          </div>}
          

          {isLoggedIn && (
            <div className="flex-none w-20 h-7">
              <NavLink to="/update" className="text-white">
                Profile
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex-none w-20 h-7">
              <NavLink to="/daily" className="text-white">
                Vote
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex-none w-20 h-7">
              <NavLink to="/logout" className="text-white">
                LogOut
              </NavLink>
            </div>
          )}


        </nav>

        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/Forget" component={ForgetPas} />
          <Route path="/daily" component={Vote} />
          <Route path="/update" component={Update} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
