import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const SelecterFarmer = props => {
  const { classes, selectedProduct, handleChange, description, items } = props;
  console.log(items);

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select
          value={selectedProduct}
          onChange={handleChange}
          name="product"
          displayEmpty
        >
          <MenuItem value="" disabled>
            {description}
          </MenuItem>
          {items.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

SelecterFarmer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelecterFarmer);
