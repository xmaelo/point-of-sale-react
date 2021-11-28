import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { request_patch, onOrder, request_get } from '../../../config';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function OrderMoreMenu({order}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const socket = useSelector(p =>p.socket)

  const [lond, setL] = useState({})

  async function onLoadTask(task){
    try {
      const result =  await request_get('order_states?page=1&task_name='+task)
      if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
        return result['hydra:member'][0]
      }
    } catch (error) {
      console.log('onLoadTyeOnWait', error)
    }
  }
  

  async function patch(task_name){
    try {
      const task = await onLoadTask(task_name)
      const l = {[task_name]: true}
      setL(l)
      const res = await request_patch("commandes/"+order.id, {status: task['@id'], task: task.task_name})
      await socket.send(JSON.stringify(res))
      console.log('res res res patch', res)
      await onOrder(res)
      setL({})
      setIsOpen(false)
    } catch (error) {
      console.log('error cathing', error)
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
        <MenuItem sx={{ color: 'text.secondary' }} onClick={()=>patch('archive')}>
          <ListItemIcon>
          {lond['archive'] ? <CircularProgress  size={20} />
            :
            <Icon icon="eva:archive-outline"  width={24} height={24}/>
          }
          </ListItemIcon>
          <ListItemText primary="Archiver" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={()=>patch('livre')}>
          <ListItemIcon>
          {lond['livre'] ? <CircularProgress  size={20} />
            :
            <Icon icon="eva:list-outline" width={24} height={24} />
          }
          </ListItemIcon>
          <ListItemText primary="Pret a livrer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* {order?.status.task_name !== "archive"&&
          <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={()=>onDelete()}>
            <ListItemIcon>
            {lond['suprimer'] ? <CircularProgress  size={20} />
              :
              <Icon icon={trash2Outline} width={24} height={24} />
            }
            </ListItemIcon>
            <ListItemText primary="Suprimer" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        } */}

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon="eva:printer-outline" width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Imprimer la facture" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
