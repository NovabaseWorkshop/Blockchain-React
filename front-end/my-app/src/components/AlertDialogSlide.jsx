import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 400,
    maxWidth: 800
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function getList(props) {
  let object = props.object;
  let array;
  array = object[props.item.date][props.item.product];

  console.log(props.object);
  console.log(props.item);
  console.log(array);
  return array;
}

function Message(props) {
  const { classes } = props;
  if (props.value === "farm")
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Product with id {props.productId} registered.
      </DialogContentText>
    );
  else if (props.value === "coop")
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Product with id {props.productId} purchased.
      </DialogContentText>
    );
  else if (props.value === "retailering") {
    let list = getList(props);
    console.log(list);
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Click on the button to check timeline
        <br />
        <br />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>
                  <b>BoxId</b>
                </CustomTableCell>
                <CustomTableCell align="right">
                  {" "}
                  <b>Product</b>
                </CustomTableCell>

                <CustomTableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.product}</TableCell>

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      date="name"
                      className={classes.button}
                      component={Link}
                      color="secondary"
                      to={{
                        pathname: "/productTimeLine/" + row.id,
                        date: row.date,
                        id: row.id
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {/* <div>
            <Paper className>
              <b>IdCaixa:</b> {row.product} <b>Product:</b> {row.id}{" "}
              <Button variant="contained" date="name" onClick={""}>
                TimeLine
              </Button>
            </Paper>
            <br />
          </div> */}
      </DialogContentText>
    );
  }
}

class AlertDialogSlide extends React.Component {
  state = {
    open: true,
    disabled: false
  };

  handleClickOpen = () => {
    this.props.handleClickOpen();
  };

  handleClose = () => {
    if (this.props.value === "error") window.location.reload();
    this.props.handleClose();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.props.title}
          </DialogTitle>
          <DialogContent>{Message(this.props)}</DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AlertDialogSlide);
