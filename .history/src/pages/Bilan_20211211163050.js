import React from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
//
import {
    Card,
  } from '@mui/material';
import POSTS from '../_mocks_/blog';
import { useParams } from 'react-router-dom'
import {request_post, request_get, request_delete} from '../config'
import { useState } from 'react';
import Stat from "./Stat"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getOverlappingDaysInIntervals } from 'date-fns';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Bilan(props) {

    const {username } = useParams()

    const [orders, setOrder] = useState([])
    const [periode, setP] = useState("")
    const [loanding, setLoading] = useState(false)

    function getMonday(d) {
        d = new Date(d);
        const day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    console.log(firstDay.toString())
    console.log(lastDay.toString())

    const handleChange = (event) => {
        setP(event.target.value);
        const s = event.target.value
        if(s === "auj"){
            const event = new Date();
            console.log('timstamp1', event.getTime())
            event.setHours(0, 0, 0);
            console.log('timstamp1', event.getTime())
            const constraint = "timestamp[lte]="+event.getTime()
            return onLoadTyeOnWait(constraint)
        }
    };

    React.useEffect(function(){
        onLoadTyeOnWait()
    }, [])
    
    async function onLoadTyeOnWait(contranit){
        try {
            setLoading(true)
          const result =  await request_get('commandes?user.username='+username+"&"+contranit)
          if(result&&result['hydra:member']){
            setOrder(result['hydra:member'])
            setLoading(false)
          }
        } catch (error) {
          console.log('onLoadTyeOnWait', error)
        }
    }

    
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={9} md={9}>
               <Stat orders={orders} loanding={loanding} />
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
                <Typography variant="h4" gutterBottom>
                Statistiques
                </Typography>
                <Card style={{padding: '10px'}}>
                    <FormControl
                        style={{width: '90%',  marginTop: 15}}
                    >
                        <InputLabel id="demo-simple-select-label">Période</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={periode}
                        label="Période"
                        onChange={handleChange}
                        >
                            <MenuItem value="auj">Aujourd'hui </MenuItem>
                            <MenuItem value="sem"> Cette semaine</MenuItem>
                            <MenuItem value="mois"> Ce mois </MenuItem>
                            
                        </Select>
                    </FormControl>
                </Card>
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
