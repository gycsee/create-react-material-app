import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const HelpDialog = withMobileDialog()(({ fullScreen, open, handleClose, ...restProps }) => (
  <div>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      {...restProps}
    >
      <DialogTitle id="responsive-dialog-title">{"技术支持"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          由 GYCSEE 提供技术支持！
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  </div>
));

export default HelpDialog