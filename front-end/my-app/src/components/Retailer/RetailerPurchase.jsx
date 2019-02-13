import React, { Component } from "react";
import AppBar from "../AppBar.jsx";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

    this.setState({ avaliable_boxes: array });
  };

  componentDidMount() {
    fetch("http://localhost:3001/cooperativeGetAvailableBoxes")
      .then(data => data.json())
      .then(data => {
        this.setState({ avaliable_boxes: data.boxesToSold });
        console.log(this.state.avaliable_boxes);
      });
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
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={{ color: "secondary" }}>
              <TableRow>
                <CustomTableCell>BoxId </CustomTableCell>
                <CustomTableCell align="right">Product</CustomTableCell>
                <CustomTableCell align="right">Cost/kg</CustomTableCell>
                <CustomTableCell align="right">Weight/kg</CustomTableCell>
                <CustomTableCell align="right">Total Cost</CustomTableCell>
                <CustomTableCell align="right" />
                <CustomTableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.avaliable_boxes.map(row => (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.id}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row.product}</CustomTableCell>
                  <CustomTableCell align="right">{row.price}</CustomTableCell>
                  <CustomTableCell align="right">{row.weight}</CustomTableCell>
                  <CustomTableCell align="right">
                    {row.final_cost_retailer}
                  </CustomTableCell>

                  <CustomTableCell align="right">
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
                  </CustomTableCell>

                  <CustomTableCell align="right">
                    <Button
                      variant="contained"
                      date="name"
                      className={classes.button}
                      color="secondary"
                      onClick={() => this.submitData(row)}
                      {...(this.state.disabled ? "disabled" : null)}
                    >
                      BUY
                    </Button>
                  </CustomTableCell>
                </TableRow>
              ))}
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
