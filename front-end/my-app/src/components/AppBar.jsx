import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import Menu from "./Menu.jsx";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
  avatar: {
    margin: 10
  }
};

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Menu />
          <Typography variant="h6" color="secondary">
            Market Chain
          </Typography>
          <Avatar
            alt="Logo"
            src="https://pbs.twimg.com/profile_images/889510630402797570/Zh2f3sMv_400x400.jpg"
            className={classes.avatar}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DenseAppBar);
