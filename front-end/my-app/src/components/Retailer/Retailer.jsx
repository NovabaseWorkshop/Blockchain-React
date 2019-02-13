import React, { Component } from "react";
import AppBar from "../AppBar.jsx";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AlertDialogSlide from "../AlertDialogSlide.jsx";
import Moment from "react-moment";
import {
  currencyFormatter,
  floatNumberFormatter
} from "../../utils/formatters.js";

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
  div: {
    paddingLeft: 40,
    paddingRight: 40
  }
});

const styles2 = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 16
  },
  body: {
    fontSize: 16
  }
}))(TableCell);

class RetailerPurchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: "",
      transport_cost: "",
      weight: "",
      price: "",
      id: -1,
      date: "2018-2-14",
      avaliable_boxes: [],
      item: {},
      margin: null,
      disabled: false,
      open: false,
      detail: [],
      object: {}
    };
  }

  componentDidMount() {
    let boxes;
    let object = {};

    fetch("http://localhost:3001/getBoxesByDate")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        for (var key in data) {
          boxes = data[key].boxes;
          object[key] = {};

          for (let j = 0; j < boxes.length; j++)
            object[key][boxes[j].product] = [];

          for (let i = 0; i < boxes.length; i++) {
            object[key][boxes[i].product].push(boxes[i]);
          }
        }
        console.log(object);
        this.setState({
          avaliable_boxes: this.getListItems(object),
          object: object
        });
      });
  }

  getListItems(fullist) {
    let object = fullist;
    let object2;
    let boxes;
    let items = [];

    let total_weight = 0;
    let total_price = 0;

    console.log(object);
    for (var key in object) {
      object2 = object[key];
      for (var key2 in object2) {
        boxes = object2[key2];
        for (let i = 0; i < boxes.length; i++) {
          total_weight += Number(boxes[i].weight);
          let aux = boxes[i].weight * boxes[i].price;
          total_price += Number(aux);
        }
        items.push({
          date: key,
          weight: total_weight,
          product: key2,
          total_price: total_price
        });
        total_weight = 0;
        total_price = 0;
      }
    }
    console.log(items);
    return items;
  }

  getFarmerData = () => {};

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  myHandlerInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getProductObject() {
    for (let i = 0; i < this.state.avaliable_boxes.length; i++) {
      if (this.state.avaliable_boxes[i].id === this.state.product) {
        return this.state.avaliable_boxes[i];
      }
    }
  }

  getFinalPrice(item) {
    console.log("meeeeh");
    let final_cost =
      (item.price * item.weight + item.transport_cost) * this.state.margin;
    console.log("camarao: " + final_cost);
    return final_cost;
  }

  handleClickOpen = item => {
    this.setState({ open: true, item: item });
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

        <div className={classes.div}>
          <h2>Retailer Iventory</h2>
          {this.state.open ? (
            <AlertDialogSlide
              value="retailering"
              title="Boxes"
              item={this.state.item}
              object={this.state.object}
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
            />
          ) : null}
          {this.getListItems()}
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Date </CustomTableCell>

                  <CustomTableCell align="center">Product</CustomTableCell>
                  <CustomTableCell align="center">Total Weight</CustomTableCell>
                  <CustomTableCell align="center">Total Cost</CustomTableCell>
                  <CustomTableCell align="right" />
                  <CustomTableCell align="right" />
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.avaliable_boxes
                  ? this.state.avaliable_boxes.map(row => (
                      <TableRow className={classes.row} key={Math.random()}>
                        <CustomTableCell component="th" scope="row">
                          <Moment format="DD/MM/YYYY">{row.date}</Moment>
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.product}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {floatNumberFormatter(row.weight)} kg
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {currencyFormatter(row.total_price)}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.final_cost_retailer}
                        </CustomTableCell>

                        <CustomTableCell align="right">
                          <Fab
                            size="small"
                            color="secondary"
                            aria-label="Add"
                            className={classes.fab}
                            onClick={() => this.handleClickOpen(row)}
                          >
                            <AddIcon color={"inherent"} />
                          </Fab>
                        </CustomTableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

RetailerPurchase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, styles2)(RetailerPurchase);
