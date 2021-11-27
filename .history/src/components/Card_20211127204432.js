import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
    TextField,
  } from '@mui/material';

  import {imageBase} from '../config'

export default function Card({row, changedQ}) {
    const [quantity, setQ] = React.useState(1);

    function onCh(e, id){
        setQ(e.target.value)
        changedQ(id, e.target.value)
    }
  return (
    <Paper elevation={3} >
        <div style={{display: "flex"}}>
            <div style={{width: '20%'}}>
                <img src={imageBase+row.picture} alt=""/>
            </div>
            <div  style={{width: '80%'}}>
                <h4>{row.name}{' - '}{row.typeConsommable.name} {' - '} {row.price+ " FCFA"}</h4>
                <p>
                    {row.description}
                </p>
                <div>
                    <br/>
                    {/* Quantité: 
                    <input
                        type="number"
                        label="Quantité"
                        value={row.quantity}
                        onChange={(e)=>onCh(e, row.id)}
                    /> */}
                </div>
            </div>
        </div>
    </Paper>
  );
}