import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import radioButtonOnFill from '@iconify/icons-eva/radio-button-on-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {request_delete, request_patch} from '../../../config'
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [lond, setT] = useState({});

  async function onDelete(t) {
    try {
      if(!window.confirm("Attention! Il se peut qu'ils aient des commandes associées a ce consommable. Souhaitez vous vraiment effacer ?")){
        return
      }
      const tx = {[t]: true}
      setT(tx)
      const res = await request_delete('consommables/'+props.id)
      if(!res){
        return
      }
      setT({})
      setIsOpen(false)
      props.onReload()
    } catch (error) {
      console.log('error deleting', error)
    }
  }
  async function onActive(t) {
    try {
      const tx = {[t]: true}
      setT(tx)
      const res = await request_patch('consommables/'+props.id, {activated: !props.row?.activated})
      console.log('res res res res', res)
      if(!res){
        return
      }
      setT({})
      setIsOpen(false)
      props.onReload()
    } catch (error) {
      console.log('error deleting', error)
    }
  }


  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => onDelete('effacer')}>
          <ListItemIcon>
          {lond['effacer'] ? <CircularProgress  size={20} />
              :
              <Icon icon={trash2Outline} width={24} height={24} />
            }
          </ListItemIcon>
          <ListItemText primary="Effacer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={() => onActive('activate')}>
          <ListItemIcon>
          {lond['activate'] ? <CircularProgress  size={20} />
              :
            <Icon icon={radioButtonOnFill} width={24} height={24} />
          }
          </ListItemIcon>
          <ListItemText primary={!props.row.activated? "Activer" : "Desactiver"} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
