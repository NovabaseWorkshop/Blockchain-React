import React, { Component } from "react";
import AppBar from "./AppBar.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Selecter from "./Selecter.jsx";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AlertDialogSlide from "./AlertDialogSlide.jsx";

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
      open: false
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
      this.setState({ open: true, weight: "", price: "", transport_cost: "" })
    );
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  myHandlerInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    if (this.props.value === "error") window.location.reload();
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />

        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <h2>Product Registration </h2>
          {this.state.open ? (
            <AlertDialogSlide
              value="farm"
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
            />
          ) : null}

          <form onSubmit={this.submitData}>
            <Paper className={classes.paper}>
              <Grid item>
                <Selecter
                  name="product"
                  handleChange={this.myHandlerInput}
                  selectedProduct={this.state.product}
                  description="Product"
                  items={selectObject}
                />
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

              {this.state.product ? (
                <Grid item>
                  <Button
                    variant="contained"
                    date="name"
                    className={classes.button}
                    onClick={this.submitData}
                  >
                    Submit
                  </Button>
                </Grid>
              ) : null}
            </Paper>
          </form>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
