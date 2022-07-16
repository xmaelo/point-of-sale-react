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

import Loading from 'src/components/loading/Loading';

// material
import { Grid } from '@mui/material';
// ----------------------------------------------------------------------
import { imageBase } from '../config'
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



  React.useEffect(function () {
    onGetOrder()
  }, [])

  async function onGetOrder() {
    try {
      console.log('started get order **')
      //&time[after]=+new Date().toISOString().split('T')[0]
      const result = await request_get('commandes?archived=false&status.task_name=valide')
      if (result && result['hydra:member'] && result['hydra:member'].length > 0) {
        dispatch({ type: 'CMD_CAISSE', orders: result['hydra:member'] })
        await onGetOrder()
      }
    } catch (error) {
      console.log('onLoadTyeOnWait', error)
      await onGetOrder()
    }

  }

  return (
    
    <div style={{ backgroundColor: "#F0F0F0", height: "105%", padding: '30px' }}>

      <ProductList products={orders.slice(0, 4)} />
    </div>
  );
}


function ProductList({ products, ...other }) {
    const [cmds, setOrders] = useState([]);


  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(4);

  const showMoreOrders = () => {
    setVisible((oldValue) => oldValue + 4);
  }


    // const handleSearch = event => {
  //   const value = event.currentTarget.value
  //   setSearch(value)
  //   const _orders = orders.filter(_order => _order.consommabes.filter(_c => _c.name.includes(value)).length > 0)
  //   // dispatch({type: 'CMD', orders: _orders});
  //   setOrders(_orders);
  return (
    <container>
      {/* <div class="col-md-6 mx-auto">
        <div class="input-group">
          <div className="input-group mb-3">
            <input type="text" className="form-control dropdown-toggle" placeholder="Rechercher..." id="top-search" />
            <button className="input-group-text btn-primary" type="submit">Rechercher</button>
          </div>
        </div>

      </div> */}
      <Grid container spacing={3} {...other}>
        {products.slice(0, visible).map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))}

        <div className='container'>
          <div className='row'>
            <div className='col text-center'>
              {visible === products.length ? null : (
                <div className='form-group mt-3'>
                  <button className="btn btn-primary text-white" onClick={showMoreOrders} >
                    Voir Plus
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>
      </Grid>

    </container>

  );
}


function ShopProductCard({ product }) {
  const { cover, consommabes, status, quantity, price } = product;

  const object = product.object ? JSON.parse(product.object) : {}


  const [showMore, setShowMore] = React.useState(false)
  let name = ""
  let description = ""
  consommabes && consommabes.map(c => {
    if (name === "") {
      name = c.name + (' (' + (object[c.id] ? 'X ' + object[c.id] : 'X 1') + ')')
      description = c.description
    } else {
      name = name + " + " + c.name + (' (' + (object[c.id] ? 'X ' + object[c.id] : 'X 1') + ')')
      description = description + "\n" + c.description
    }
  })

  const colors = ['#00AB55']
  return (

    <Card>
      <Box sx={{ pt: '80%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={consommabes && consommabes.length > 0 && (imageBase + consommabes.filter(c => c.typeConsommable?.task_name != "boisson")[0].picture)} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>

        <Typography variant="subtitle2" noWrap>
          {consommabes && consommabes.filter(c => c.typeConsommable?.task_name != "boisson").map(c => {
            return <h2>- {(object[c.id] ? object[c.id] : '1') + "  X " + c.name}</h2>
          })}
        </Typography>


        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            {"QUANTITE: "}
            <span style={{ fontSize: "35px" }}>{quantity}</span>
          </Typography>
          <span
            style={{
              color: 'red',
              paddingLeft: "5px",
              paddingRight: "5px",
              fontSize: "35px",
              fontWeight: "bold",
              borderRadius: 15
            }}
          >
            {product.id}
          </span>

        </Stack>
      </Stack>
    </Card>

  );
}




