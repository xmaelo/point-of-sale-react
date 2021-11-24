import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
    TextField,
  } from '@mui/material';

export default function Card({row}) {
  return (
    <Paper elevation={3} >
        <div style={{display: "flex"}}>
            <div style={{width: '20%'}}>
                <img src="http://localhost:8000/uploads/Capture-61991399e20d8.png" alt=""/>
            </div>
            <div  style={{width: '80%'}}>
                <h4>{row.name}{' - '}{row.typeConsommable.name} {' - '} {row.price}</h4>
                <p>
                    {row.description}
                </p>
                <div>
                    <br/>
                    Quantité: 
                    <input
                        type="number"
                        label="Quantité"
                        value={1}
                    />
                </div>
            </div>
        </div>
    </Paper>
  );
}