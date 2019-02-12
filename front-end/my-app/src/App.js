import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home.jsx";
import Cooperative from "./components/Cooperative/Cooperative.jsx";
import Retailer from "./components/Retailer/Retailer.jsx";
import RetailerPurchase from "./components/Retailer/RetailerPurchase.jsx";
import ProductTimeLine from "./components/Retailer/ProductTimeLine";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#000" }, // Purple and green play nicely together.
    secondary: { main: "#ff0000" } // This is just green.A700 as hex.
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/farmer" component={Home} />
            <Route path="/cooperative" component={Cooperative} />
            <Route path="/retailerpurchase" component={RetailerPurchase} />
            <Route path="/productTimeLine/:id" component={ProductTimeLine} />
            <Route path="/retailer" component={Retailer} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
