import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItemText } from '@mui/material';

export default function EncaisseDialog({order, onArchive}) {
  const [open, setOpen] = React.useState(false);
  const [amountReceive, setAmountReceive] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItemText primary="Encaisser" primaryTypographyProps={{ variant: 'body2' }} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ecaisser la commande d'id {order.id} ?</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Montant reçu"
            type="number"
            fullWidth
            variant="standard"
            value={amountReceive}
            onChange={(e)=>setAmountReceive(e.target.value?parseInt(e.target.value):null)}
          />
          <br/>
          Montant à rembourser: {parseInt(amountReceive) > 0 ?  parseInt(amountReceive) - order.price : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={onArchive}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}