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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
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
      disabled: false
    };
  }

  submitData = item => {
    let array = this.state.avaliable_boxes;

    var index = array.indexOf(item);
    console.log(index);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.setState({ avaliable_boxes: array });

    console.log("maria: " + item);
    fetch("http://localhost:3001/retailerMineBlock", {
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
        final_cost: item.final_cost_retailer
      })
    });
  };

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
        this.setState({ avaliable_boxes: this.getListItems(object) });
      });
  }

  getListItems(fullist) {
    let object = fullist;
    let object2;
    let boxes;
    let items = [];

    let total_weight = 0;
    let total_price = 0;
    let product;
    let date;

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        {this.getListItems()}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Date </CustomTableCell>

                <CustomTableCell align="right">Product</CustomTableCell>
                <CustomTableCell align="right">Total Weight/kg</CustomTableCell>
                <CustomTableCell align="right">Total Cost</CustomTableCell>
                <CustomTableCell align="right" />
                <CustomTableCell align="right" />
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.avaliable_boxes
                ? this.state.avaliable_boxes.map(row => (
                    <TableRow className={classes.row} key={Math.random()}>
                      <CustomTableCell component="th" scope="row">
                        {row.date}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.product}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.weight}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.total_price}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.final_cost_retailer}
                      </CustomTableCell>

                      <CustomTableCell align="right">
                        <Fab
                          color="default"
                          aria-label="Add"
                          className={classes.fab}
                          onClick={() => alert("maumau")}
                        >
                          <AddIcon />
                        </Fab>
                      </CustomTableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

RetailerPurchase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, styles2)(RetailerPurchase);
