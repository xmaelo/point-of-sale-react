import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItemText } from '@mui/material';

export default function EncaisseDialog({order, show, handleClose}) {
  const [open, setOpen] = React.useState(false);
  console.log('show show show', show)


function on(){
    handleClose()
}
 

  return (
    <div>
      <ListItemText primary="Encaisser" primaryTypographyProps={{ variant: 'body2' }}  />
      <Dialog open={show} onClose={on}>
        <DialogTitle>{order.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={on}>Cancel</Button>
          <Button onClick={on}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}