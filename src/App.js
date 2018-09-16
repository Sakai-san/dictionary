// @flow
import React, { type Element } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Dictionary from "./Dictionary";
import NewDictionary from "./NewDictionary";

const App = (): Element<any> => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/dictionary/:name" component={Dictionary} />
        <Route path="/newDictionary" component={NewDictionary} />
      </div>
    </Router>
  );
};

export default App;
