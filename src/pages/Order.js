import * as React from 'react';
import { useFormik } from 'formik';
import { useState, useRef } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import AddOrder from '../components/AddOrder'
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

import { request_get } from 'src/config';
import Loading from 'src/components/loading/Loading';
// ----------------------------------------------------------------------

export default function Order() {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [cmds, setOrders] = useState([]);
  const dispatch = useDispatch() 
  const orders = useSelector(p => p.orders)
  const p = useSelector(p => p)

  console.log('***********************', p)

  const [search, setSearch] = useState('');


  React.useEffect(async function(){
    await onGetOrder()
  }, [])

  async function onGetOrder(){
    try {
      setLoading(true);
      const result =  await request_get('commandes?order[id]=desc')
      setLoading(false)

      if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
        const _orders = result['hydra:member'];
        dispatch({type: 'CMD', orders: _orders})
        // await onGetOrder()
        setOrders(_orders);
      }
    } catch (error) {
      console.log('onLoadTyeOnWait', error)
      // await onGetOrder()

    }

  }

  const handleSearch = event => {
    const value = event.currentTarget.value
    setSearch(value)
    const _orders = orders.filter(_order => _order.consommabes.filter(_c => _c.name.includes(value)).length > 0)
    // dispatch({type: 'CMD', orders: _orders});
    setOrders(_orders);
    
  }

    // const handleSearch = event => {
  //   setSearch({
  //     [event.target.name]: event.target.value
  //   })
  //   // console.log(setSearch)
  //   // if (event.target.value) {
  //   //   // const searchText = event.target.value;
  //   //   // const ordersCmd = orders.filter(order => order.consommabes.toLowerCase().includes(searchText.toLowerCase()))
  //   // }
  // }


  return (
    <Page title="Commandes">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Liste de Commandes

            <div class="col-md-6 mx-auto">
              <div class="input-group">
                <div className="input-group mb-3">
                    <input type="text" onChange={handleSearch} value={search} className="form-control dropdown-toggle" placeholder="Rechercher..." id="top-search" />
                    <button className="input-group-text btn-primary" type="submit">Rechercher</button>
                </div>
              </div>

            </div>
           
          <Fab variant="extended" size="small" color="primary" aria-label="add" style={{float: 'right'}} onClick={() => setOpen(true)} >
            <AddIcon sx={{ mr: 1 }} />
            Nouvelle commande
          </Fab>
        </Typography>
        {isLoading && ( <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-10 mx-auto col-md-6">
                <Loading />
              </div>
            </div>
          </div>
        </section>)}

       {!isLoading &&  <ProductList products={cmds} />}
      </Container>
      <AddOrder open={open} handleClose={setOpen} />
    </Page>
  );
}
