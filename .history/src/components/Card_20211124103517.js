import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Card() {
  return (
    <Paper elevation={3} >
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: '20%',
                height: 100,
                },
            }}
        >
            <img src="http://localhost:8000/uploads/Capture-61991399e20d8.png" alt=""/>
        </Box>
    </Paper>
  );
}