import "./App.css";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import { useStateValue } from "./Components/StateProvider/StateProvider";
import { auth } from "./firebase/config";
import React, { useEffect } from "react";

function App() {
  const [{ user }, dispatch] = useStateValue();
  // console.log(user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });
  }, []);

  return (
    <Router>
      <Switch>
        {!user ? (
          <Login />
        ) : (
          <div className="App">
            <div className="app-body">
              <Sidebar />

              <Route exact path="/">
                <Chat />
              </Route>

              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </div>
          </div>
        )}
      </Switch>
    </Router>
  );
}

export default App;
