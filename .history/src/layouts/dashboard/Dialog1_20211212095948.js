import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '@iconify/react';
import { request_get } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

export default function Dialog1() {
  const [open, setOpen] = React.useState(false);
const [taux, setTaux] = React.useState(0)
const [obx, setObx] = React.useState({})
const [load, setLoad] = React.useState(false)

  const dispatch = useDispatch()
  React.useEffect(function(){
    onlastTaux()
  }, [])

  async function onlastTaux(){
    try {
      const result = await request_get('configs')
      console.log('result result result result result', result)
      if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
        dispatch({type: 'SAVE_COM', commission: result['hydra:member'][0].commission})
        setTaux(result['hydra:member'][0].commission)
        setObx(result['hydra:member'][0])
      }
    } catch (error) {
      console.log('errrrorrr', error)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function patch(){
    try {
      setLoad(true)
      const res = await request_patch("configs/"+obx.id, { commission: taux})
      setLoad(false)
      handleClose()
    } catch (error) {
      setLoad(false)
      handleClose()
      console.log('error cathing', error)
    }
  }

  return (
    <div>
      <Icon icon="mdi:cog-refresh-outline"  width={36} height={36} onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Config</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Redifinition du taux de Commission
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            label="Taux"
            fullWidth
            value={taux}
            onChange={(e) =>setTaux(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} disabled={load}>
              {load && <CircularProgress  size={20} />}
              Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}