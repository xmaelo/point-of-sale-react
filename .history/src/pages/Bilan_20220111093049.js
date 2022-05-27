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
import { useSelector } from 'react-redux';
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

    const commission = useSelector(p =>p.commission)

    const [value, setValue] = React.useState(new Date());

    const handleChangeDate = (newValue) => {
      setValue(newValue);
      handleChange(null, newValue)
    };

    function getMonday(d) {
        d = new Date(d);
        const day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    

    const handleChange = (event, value2) => {
        let s;
        if(event){
          setP(event.target.value);
          s = event.target.value
        }else{
          s = periode
        }

        let value3;
        if(value2) {
          value3 = value2
        }
        else {
          value3 =new Date(value)
        }
        if(s === "auj"){
            const event = value3;
            const event2 = value3;
            console.log('timstamp1', event.toISOString())
            event.setHours(0, 0, 0);
            event2.setHours(23, 59, 59);
            console.log('timstamp1', event.toISOString())
            const constraint = "time[after]="+event.toISOString().split('T')[0]+"&time[before]="+event2.toISOString()
            return onLoadTyeOnWait(constraint)
        }
        if(s === "sem"){
            const event = new Date(value3);
        
            // const event = value3;
            // const firstDay = getMonday(event)
            // console.log('timstamp1', firstDay.toISOString())
            // firstDay.setHours(0, 0, 0);
            // console.log('timstamp1', firstDay.toISOString())
            const startDate = new Date(event.setDate(event.getDate() - event.getDay()+ (event.getDay() == 0 ? -6:1) ))
            const endDate = new Date(event.setDate(event.getDate() - (event.getDay() == 0 ? 7 : event.getDay()) + 7))

            console.log('startDate startDate', new Date(startDate).toISOString().split('T')[0], new Date())
            endDate.setHours(23, 59, 59);
            const constraint = "time[after]="+new Date(startDate).toISOString().split('T')[0]+"&time[before]="+new Date(endDate).toISOString()
            return onLoadTyeOnWait(constraint)
        }
        if(s === "mois"){
            const date = value3, y = date.getFullYear(), m = date.getMonth();
            const firstDay = new Date(y, m, 1);
            //const lastDay = new Date(y, m + 1, 0);

            const lastdate = new Date(date.getFullYear(), date.getMonth() + 1, 0);


            // console.log('timstamp1', firstDay.toISOString())
            lastdate.setHours(23, 59, 59);
            // console.log('timstamp1', firstDay.toISOString())
            const constraint = "time[after]="+firstDay.toISOString().split('T')[0]+"&time[before]="+lastdate.toISOString()
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
            console.log('constraint constraint constraint', contranit)
          const result =  await request_get('commandes?user.username='+username+"&status.task_name=valide&"+contranit)
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
        orders.map(o => {
          if(!o.nonfacturer) price = price + parseFloat(o.price)
        })
        return price
    }
    function renerPrice2(){
        let price = 0
        orders.map(o => {
          if(o.nonfacturer) price = price + parseFloat(o.price)
        })
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
                Statistiques <Tooltip title="Selectionner une date dans le picker et calculer la semaine où le mois correspondant">
                      <Icon icon="mdi:help" />
                    </Tooltip>
                </Typography>
                <Card style={{padding: '10px'}}>

                    
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
                        onChange={(e) => handleChange(e)}
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
                        Mes consommations: {renerPrice2()} FCFA
                    </span>
                    <br/>
                    <span style={{fontSize: "14px", fontWeight: 'bold'}}>
                        Commission sur les ventes: {(renerPrice() * commission)/100 } FCFA
                    </span>
                    <br/>
                    <span style={{fontSize: "14px", fontWeight: 'bold'}}>
                        Commission finale: {((renerPrice() * commission)/100) -  renerPrice2()} FCFA
                    </span>
                </Card>
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
