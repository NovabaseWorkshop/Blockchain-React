import React, { Component } from "react";
import AppBar from "./AppBar.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Selecter from "./SelecterFarmer.jsx";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Utils from "./ultils.jsx";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: "20px",
    elevation: 0,
    square: true
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Cooperative extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      product: "",
      transport_cost: "",
      weight: "",
      price: "",
      id: -1,
      date: "2018-2-14"
    };
  }

  submitData = () => {
  
    var min = 1;
    var max = 1000000000;
    var rand =  parseInt(min + (Math.random() * (max-min)));

    fetch("http://localhost:3001/farmerMineBlock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: rand,
        product: this.state.product,
        transport_cost: this.state.transport_cost,
        weight: this.state.weight,
        price: this.state.price,
        date: this.state.date
      })
    })
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  
  myHandlerInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    var a = this.state.product;
    return (
      <div>
        <AppBar />
        <h1 style={{ color: "black", marginRight: "30px" }}>
          Registo do produto{" "}
        </h1>
        <Grid
  container
  direction="row"
  justify="space-evenly"
  alignItems="center"
>
          <Grid item>
            <Paper className={classes.paper}>
              <Selecter
                name="product"
                handleChange={this.myHandlerInput}
                selectedProduct={this.state.product}
                description="BoxID"
                
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <TextField
                label="Deliever Cost"
                name="transport_cost"
                onChange={this.myHandlerInput}
                id="simple-start-adornment"
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  )
                }}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <TextField
                label="Margin"
                id="simple-start-adornment"
                name="weight"
                onChange={this.myHandlerInput}
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  )
                }}
              />
            </Paper>
          </Grid>
        </Grid>

<Grid item>

  Custo: €
  <br></br>
  <br></br>
  Custo: €/kg
  <br></br>
  <br></br>
  Peso: kg
  <br></br>
  <br></br>
  Final Cost for Retailer: €
</Grid>     

     
        <Grid item>
            <div className={classes.paper}>
              <Button
                variant="contained"
                date="name"
                className={classes.button}
                onClick={this.submitData}
              >
                Submit
              </Button>
            </div>
          </Grid>
      </div>
    );
  }
}

Cooperative.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Cooperative);
