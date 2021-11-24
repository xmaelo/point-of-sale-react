import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Card() {
  return (
    <Paper elevation={3} >
        <div style={{display: "flex"}}>
            <div style={{width: '20%'}}>
                <img src="http://localhost:8000/uploads/Capture-61991399e20d8.png" alt=""/>
            </div>
            <div  style={{width: '80%'}}>
                <h4>Riz de riziere orca</h4>
            </div>
        </div>
    </Paper>
  );
}