import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
	root: {
		display: "flex"
	},
	paper: {
		marginRight: theme.spacing.unit * 2
	}
});

class MenuListComposition extends React.Component {
	state = {
		anchorEl: null
	};

	handleChange = event => {
		this.setState({ auth: event.target.checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<IconButton
					aria-owns={open ? "menu-appbar" : undefined}
					aria-haspopup="true"
					onClick={this.handleMenu}
					color="inherit"
				>
					<MenuIcon />
				</IconButton>

				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: " bottom",
						horizontal: "right"
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right"
					}}
					open={open}
					onClose={this.handleClose}
				>
					<MenuItem component={Link} to="/farmer">
						Farmer
					</MenuItem>
					<MenuItem
						component={Link}
						to="/cooperative"
						onClick={this.handleClose}
					>
						Cooperative
					</MenuItem>
					<MenuItem component={Link} to="/retailerpurchase">
						Retailer Purchase
					</MenuItem>
					<MenuItem component={Link} to="/retailer">
						Retailer
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default withStyles(styles)(MenuListComposition);
