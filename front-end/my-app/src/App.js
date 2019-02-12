import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home.jsx";
import Cooperative from "./components/Cooperative/Cooperative.jsx";
import Retailer from "./components/Retailer/Retailer.jsx";
import RetailerPurchase from "./components/Retailer/RetailerPurchase.jsx";
import ProductTimeLine from "./components/Retailer/ProductTimeLine";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/farmer" component={Home} />
          <Route path="/cooperative" component={Cooperative} />
          <Route path="/retailerpurchase" component={RetailerPurchase} />
          <Route
            path="/productTimeLine/:date/:product"
            component={ProductTimeLine}
          />
          <Route path="/retailer" component={Retailer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
