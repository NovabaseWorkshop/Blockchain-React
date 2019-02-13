import React, { Component } from "react";
import AppBar from "../AppBar.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Selecter from "../Selecter.jsx";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import AlertDialogSlide from "../AlertDialogSlide.jsx";
import Typography from "@material-ui/core/Typography";

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
    square: true,
    marginTop: "40px"
  },
  paper2: {
    padding: theme.spacing.unit * 3
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
  div: {
    textAlign: "center"
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
      date: "2018-2-14",
      boxes_sold: [],
      item: {},
      margin: "",
      open: false,
      avaliable_boxes: [],
      lastProductSold: {}
    };
  }

  submitData = item => {
    var array = this.state.boxes_sold;

    var index = array.indexOf(item);
    console.log(index);
    if (index > -1) {
      array.splice(index, 1);
    }

    fetch("http://localhost:3001/cooperativeMineBlock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: item.id,
        product: item.product,
        weight: item.weight,
        price: item.price,
        date: this.state.date,
        margin: this.state.margin,
        transport_cost: this.state.transport_cost,
        final_cost_retailer: this.getFinalPrice(item)
      })
    }).then(
      this.setState({
        product: "",
        transport_cost: "",
        margin: "",
        open: true,
        boxes_sold: array,
        lastProductSold: item
      })
    );
  };

  componentDidMount() {
    fetch("http://localhost:3001/farmerGetAvailableBoxes")
      .then(data => data.json())
      .then(data => {
        this.setState({ boxes_sold: data.boxesToSold });
        console.log(this.state.boxes_sold);
      });
  }

  myHandlerInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getProductObject() {
    for (let i = 0; i < this.state.boxes_sold.length; i++) {
      if (this.state.boxes_sold[i].id === this.state.product) {
        return this.state.boxes_sold[i];
      }
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    if (this.props.value === "error") window.location.reload();
    this.setState({ open: false });
  };
  getFinalPrice(item) {
    let margin = this.state.margin / 100 + 1;
    let final_cost =
      (item.price * item.weight +
        Number(item.transport_cost) +
        Number(this.state.transport_cost)) *
      margin;

    return Math.round(final_cost);
  }

  getTotalBoxCost(item) {
    let price = item.price * item.weight + Number(item.transport_cost);
    return price;
  }

  render() {
    const { classes } = this.props;
    let product = this.getProductObject();

    return (
      <div>
        <AppBar />
        {this.state.open ? (
          <AlertDialogSlide
            value="coop"
            productId={this.state.lastProductSold.id}
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
          />
        ) : null}
        <h1 className={classes.div}>Cooperative: Product Purchase</h1>

        <Paper className={classes.paper2}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Selecter
                name="product"
                handleChange={this.myHandlerInput}
                selectedProduct={this.state.product}
                description="BoxID"
                items={this.state.boxes_sold}
              />
            </Grid>
            <Grid item>
              <TextField
                value={this.state.transport_cost}
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
            </Grid>
            <Grid item>
              <TextField
                value={this.state.margin}
                label="Margin"
                id="simple-start-adornment"
                name="margin"
                onChange={this.myHandlerInput}
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item>
              <form className={classes.container} noValidate>
                <TextField
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
              </form>
            </Grid>
            <Grid item />
          </Grid>
        </Paper>

        {this.state.product ? (
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Paper className={classes.paper}>
                Product name: <span />
                <b>{product ? product.product : null}</b>
                <br />
                <br />
                Total Box Cost:
                <b>{product ? this.getTotalBoxCost(product) : null}€</b>
                <br />
                <br />
                Cost kg: <b>{product ? product.price : null} €</b>
                <br />
                <br />
                Weight: <b>{product ? product.weight : null} kg </b>
                <br />
                <br />
                Final Cost for Retailer:
                <b>
                  {this.state.margin && product
                    ? this.getFinalPrice(product)
                    : null}{" "}
                  €
                </b>
              </Paper>
            </Grid>

            <Grid item>
              <div>
                <Button
                  variant="contained"
                  date="name"
                  className={classes.button}
                  onClick={() => this.submitData(product)}
                  color="secondary"
                  disabled={
                    this.state.product &&
                    this.state.transport_cost &&
                    this.state.margin
                      ? false
                      : true
                  }
                >
                  <Typography color="primary">BUY</Typography>
                </Button>
              </div>
            </Grid>
          </Grid>
        ) : null}
      </div>
    );
  }
}

Cooperative.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Cooperative);
