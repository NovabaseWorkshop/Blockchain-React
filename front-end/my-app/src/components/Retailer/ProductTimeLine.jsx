import React, { Component } from "react";
import AppBar from "../AppBar.jsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

import Typography from "@material-ui/core/Typography";

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

const styles = theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  div: {
    paddingLeft: 40,
    paddingRight: 40
  }
});

class RetailerPurchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        Farmer: [],
        Cooperative: [],
        Retailer: []
      }
    };
  }

  componentDidMount() {
    // "http://localhost:3001/getBoxTimeline/id:"
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar />
        <div className={classes.div}>
          <Typography style={{ padding: 20 }} variant="h5">
            Product Time Line
          </Typography>
        </div>
      </div>
    );
  }
}

RetailerPurchase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RetailerPurchase);
