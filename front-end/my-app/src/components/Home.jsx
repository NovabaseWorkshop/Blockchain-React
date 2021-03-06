import React, { Component } from "react";
import AppBar from "./AppBar.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AlertDialogSlide from "./AlertDialogSlide.jsx";
import { MenuItem } from "@material-ui/core";

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
  },
  title: {
    textAlign: "left"
  },
  div: {
    paddingLeft: 40,
    paddingRight: 40
  }
});

const selectObject = [
  {
    id: "Potatoes"
  },
  {
    id: "Onions"
  },
  {
    id: "Truffles"
  },
  {
    id: "Oranges"
  }
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: "",
      transport_cost: "",
      weight: "",
      price: "",
      id: -1,
      date: "2018-2-14",
      open: false,
      productId: "", //id of last product registed,
      alert_type: "",
      title: ""
    };
  }

  submitData = () => {
    var min = 1;
    var max = 1000000000;
    var rand = parseInt(min + Math.random() * (max - min));

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
    }).then(
      this.setState({
        open: true,
        alert_type: "farm",
        weight: "",
        price: "",
        transport_cost: "",
        productId: rand,
        title: "Success"
      })
    );
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  myHandlerInput = event => {
    let aux = event.target.value;

    let rgx = /^[0-9]*\.?[0-9]*$/;
    if (
      aux.match(rgx) ||
      event.target.name === "product" ||
      event.target.name === "date"
    )
      this.setState({ [event.target.name]: aux.toString() });
    else this.setState({ open: true, alert_type: "alert", title: "Error" });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    if (this.props.value === "error") window.location.reload();
    this.setState({ open: false, title: "Error" });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        <div className={classes.div}>
          <h2 className={classes.title}>Product Registration </h2>

          {this.state.open ? (
            <AlertDialogSlide
              value={this.state.alert_type}
              title={this.state.title}
              handleClickOpen={this.handleClickOpen}
              productId={this.state.productId}
              handleClose={this.handleClose}
            />
          ) : null}

          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Product"
                  name="product"
                  className={classes.textField}
                  value={this.state.product}
                  onChange={this.myHandlerInput}
                  margin="normal"
                >
                  {selectObject.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.id}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  value={this.state.transport_cost}
                  margin="normal"
                  label="Transport Cost"
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
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  value={this.state.weight}
                  label="Weight"
                  id="simple-start-adornment"
                  name="weight"
                  onChange={this.myHandlerInput}
                  className={classNames(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Kg</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={this.state.price}
                  margin="normal"
                  label="Price"
                  name="price"
                  id="simple-start-adornment"
                  onChange={this.myHandlerInput}
                  className={classNames(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">€/Kg</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  id="date"
                  name="date"
                  label="Date"
                  onChange={this.myHandlerInput}
                  type="date"
                  defaultValue="2018-02-14"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>

              <Grid item />
            </Grid>
          </Paper>

          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Button
              variant="contained"
              date="name"
              color="secondary"
              disabled={
                this.state.product &&
                this.state.transport_cost &&
                this.state.weight &&
                this.state.price
                  ? false
                  : true
              }
              className={classes.button}
              onClick={this.submitData}
            >
              Submit
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
