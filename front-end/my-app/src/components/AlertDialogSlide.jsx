import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function Message(value, productId) {
  if (value === "farm")
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Product with id {productId} registered.
      </DialogContentText>
    );
  else if (value === "coop")
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Product with id {productId} purchased.
      </DialogContentText>
    );
  else if (value === "forgery")
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Vai ser apresentada uma assinatura aleatória da Base de Dados para
        tentar forjar. É possivel calhar a sua assinatura, se assim for, pedimos
        então que assine normalmente.
        <br />
        <br />
        Após o forjar da assinatura clique Submeter no fim da pagina.
      </DialogContentText>
    );
  else if (value === "final")
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Caso decida repetir o processo terá apenas que assinar 2 vezes.
        <br />
        <br />
        <b>Obrigado</b> por nos ajudar a melhorar o algoritmo.
      </DialogContentText>
    );
  else if (value === "error")
    return (
      <DialogContentText id="alert-dialog-slide-description">
        Ocorreu um erro. Comece de novo.
      </DialogContentText>
    );
}

class AlertDialogSlide extends React.Component {
  state = {
    open: true
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
          <DialogTitle id="alert-dialog-slide-title">{"Success"}</DialogTitle>
          <DialogContent>
            {Message(this.props.value, this.props.productId)}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="default">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
