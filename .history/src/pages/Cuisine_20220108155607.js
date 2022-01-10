import * as React from 'react';
import { useFormik } from 'formik';
import { useState, useRef } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { useDispatch, useSelector } from 'react-redux';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { request_get } from 'src/config';

// material
import { Grid } from '@mui/material';
// ----------------------------------------------------------------------
import {imageBase} from '../config'
import { Box, Card, Link } from '@mui/material';
import Label from '../components/Label';
import { styled } from '@mui/material/styles';

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  });

export default function Cuisine() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const orders = useSelector(p => p.orders_caisse)
  const p = useSelector(p => p)

  console.log('***********************', p)

  React.useEffect(function(){
    onGetOrder()
    interval()
  }, [])

  async function onGetOrder(){
    try {
      const result =  await request_get('commandes?archived=false&status.task_name=valide')
      if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
        dispatch({type: 'CMD_CAISSE', orders: result['hydra:member']})
      }
    } catch (error) {
      console.log('onLoadTyeOnWait', error)
    }

  }

  function interval(){
      setInterval(() => {
          console.log('*****************************************')
          onGetOrder()
      }, 4000);
  }
  

  return (
    <div style={{backgroundColor: "#F0F0F0", height: "105%", padding: '30px'}}>
                
            <ProductList products={orders} />
    </div>
  );
}


function ProductList({ products, ...other }) {
    return (
      <Grid container spacing={3} {...other}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }


  function ShopProductCard({ product }) {
    const { cover, consommabes, status, quantity, price } = product;
  
    const object =  product.object ? JSON.parse(product.object) : {}
  
  
    const [showMore, setShowMore] = React.useState(false)
    let name = ""
    let description = ""
    console.log('consommabes&consommabes[0].picture', consommabes)
    consommabes&& consommabes.map(c => {
      if(name === ""){
        name = c.name + (' ('+ (object[c.id] ? 'X '+object[c.id] : 'X 1')+')')
        description = c.description
      }else{
        name = name + " + " +c.name + (' ('+ (object[c.id] ? 'X '+object[c.id] : 'X 1')+')')
        description = description + "\n" +c.description
      }
    })
  
    const colors = ['#00AB55']
    return (
      <Card>
        <Box sx={{ pt: '80%', position: 'relative' }}>
          <ProductImgStyle alt={name} src={consommabes&&consommabes.length>0&&(imageBase+consommabes[0].picture)} />
        </Box>
  
        <Stack spacing={2} sx={{ p: 3 }}>
  
          <Typography variant="subtitle2" noWrap>
            {consommabes&& consommabes.map(c => {
                return <h3>- {(object[c.id] ? object[c.id] : '1')+"  X "+c.name}</h3>
            })}
          </Typography>
          
                
  
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={colors} /> */}
              <Typography variant="subtitle1">
                  {"QUANTITE: "+quantity}
                </Typography>
                <span
                    style={{color: 'white', backgroundColor: '#FFCE33', padding: "5px", fontSize: "30px"}}
                >
                    {product.id}
                </span>
              
          </Stack>
        </Stack>
      </Card>
    );
  }
  
