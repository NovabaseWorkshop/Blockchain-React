import React, { Component } from "react";
import AppBar from "../AppBar.jsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const styles = theme => ({
  root: {
    width: "90%"
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
  }
});
const tableStyles = theme => ({
  root: {
    width: "90%"
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
  }
});

function getSteps() {
  return ["Farmer", "Cooperative", "Retailer"];
}

function getStepContent(step, boxes) {
  switch (step) {
    case 0:
      return (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Box Id </TableCell>
                <TableCell>Transportaion Cost €</TableCell>
                <TableCell>Weight Kg</TableCell>
                <TableCell>Price €/KG</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boxes.Farmer.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.transport_cost}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    case 1:
      return (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Box Id </TableCell>
                <TableCell>Deliver Cost €</TableCell>
                <TableCell>Margin Kg</TableCell>
                <TableCell>Final Price €</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boxes.Cooperative.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.transport_cost}</TableCell>
                  <TableCell>{row.margin}</TableCell>
                  <TableCell>{row.final_cost_retailer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    case 2:
      return (
        <div>
          {boxes.Retailer.map(box => (
            <h1>
              {box.id} | {box.product} | {box.final_cost} |{box.weight} |{" "}
              {box.price}
            </h1>
          ))}
        </div>
      );
    default:
      return "Unknown step";
  }
}

class RetailerPurchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      data: {
        Farmer: [],
        Cooperative: [],
        Retailer: []
      }
    };
  }

  componentDidMount() {
    let url = "http://localhost:3001/getBoxes/2018-2-14/Oranges";
    fetch(url)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        for (var key in data) {
        }
        this.setState({ data: data });
      });
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };
  handleClick = index => {
    this.setState(state => ({
      activeStep: index
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    console.log(this.state.data);
    return (
      <div>
        <AppBar />
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel onClick={() => this.handleClick(index)}>
                {label}
              </StepLabel>
              <StepContent>
                <Typography>
                  {getStepContent(index, this.state.data)}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

RetailerPurchase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, tableStyles)(RetailerPurchase);