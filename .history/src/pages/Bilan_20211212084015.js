import React from 'react';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import POSTS from '../_mocks_/blog';
import { useParams } from 'react-router-dom'
import {request_post, request_get, request_delete} from '../config'
import { useState } from 'react';
import Stat from "./Stat"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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

    const [value, setValue] = React.useState(new Date());

    const handleChangeDate = (newValue) => {
      setValue(newValue);
    };

    function getMonday(d) {
        d = new Date(d);
        const day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    

    const handleChange = (event) => {
        setP(event.target.value);
        const s = event.target.value
        if(s === "auj"){
            const event = value;
            const event2 = value;
            console.log('timstamp1', event.toISOString())
            event.setHours(0, 0, 0);
            event2.setHours(23, 59, 59);
            console.log('timstamp1', event.toISOString())
            const constraint = "time[after]="+event.toISOString()[0]+"time[before]="+event2.toISOString()[0]
            return onLoadTyeOnWait(constraint)
        }
        if(s === "sem"){
            const event = value;
        
            // const event = value;
            // const firstDay = getMonday(event)
            // console.log('timstamp1', firstDay.toISOString())
            // firstDay.setHours(0, 0, 0);
            // console.log('timstamp1', firstDay.toISOString())
            const constraint = "time[after]="+today.GetFirstDayOfWeek().toISOString()[0]+"time[before]="+today.GetLastDayOfWeek()[0]
            return onLoadTyeOnWait(constraint)
        }
        if(s === "mois"){
            const date = value, y = date.getFullYear(), m = date.getMonth();
            const firstDay = new Date(y, m, 1);
            //const lastDay = new Date(y, m + 1, 0);

            const lastdate = new Date(date.getFullYear(), date.getMonth() + 1, 0);


            // console.log('timstamp1', firstDay.toISOString())
            // firstDay.setHours(0, 0, 0);
            // console.log('timstamp1', firstDay.toISOString())
            const constraint = "time[after]="+firstDay.toISOString()[0]+"time[before]="+lastdate.toISOString()[0]
            return onLoadTyeOnWait(constraint)
        }
    };

    React.useEffect(function(){
        const target = {}
        target.value = 'auj'
        const event = {}
        event.target = target
        handleChange(event)
    }, [])
    
    async function onLoadTyeOnWait(contranit){
        try {
            setLoading(true)
            console.log('constraint constraint constraint', constraint)
          const result =  await request_get('commandes?user.username='+username+"&status.task_name=encaisse&"+contranit)
          if(result&&result['hydra:member']){
            setOrder(result['hydra:member'])
            setLoading(false)
          }
        } catch (error) {
          console.log('onLoadTyeOnWait', error)
        }
    }

    function renerPrice(){
        let price = 0
        orders.map(o => price = price + parseFloat(o.price))
        return price
    }

    
  return (
    <Page title={"Bilan "+username}>
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

                    <Tooltip title="Selectionner une date dans le picker et calculer la semaine où mois correspondante">
                      <Icon icon="mdi:help" />
                    </Tooltip>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="Date mobile"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                      />

                    </LocalizationProvider>

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
                            <MenuItem value="auj">Cet Jour </MenuItem>
                            <MenuItem value="sem"> Cette Semaine</MenuItem>
                            <MenuItem value="mois"> Ce Mois </MenuItem>
                            
                        </Select>
                    </FormControl>
                    
                    <br/>
                    <br/>
                    <span style={{fontSize: "14px", fontWeight: 'bold'}}>
                        Total des ventes: {renerPrice()} FCFA
                    </span>
                    <br/>
                    <span style={{fontSize: "14px", fontWeight: 'bold'}}>
                        Commission: {(renerPrice() * 0.1)} FCFA
                    </span>
                </Card>
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
