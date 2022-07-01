import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------




export default function ProductList({ products, ...other }) {

    const [visible, setVisible] = useState(8);
  
    const showMoreOrders = () => {
      setVisible((oldValue) => oldValue + 4);
    }

  

  return (
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
  );
}
