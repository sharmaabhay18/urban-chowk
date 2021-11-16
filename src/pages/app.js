import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/Home";
import Header from "components/Header";
import Footer from "components/Footer";
import Error from "components/Error";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
