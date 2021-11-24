import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Card() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 208,
          height: 128,
        },
      }}
    >
      <Paper elevation={3} >
      </Paper>
    </Box>
  );
}