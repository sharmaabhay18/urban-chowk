import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Error from "../component/Error";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Error} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
