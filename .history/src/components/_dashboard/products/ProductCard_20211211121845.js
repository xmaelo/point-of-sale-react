import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {imageBase} from '../../../config'

//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

import { OrderMoreMenu } from '../user';
import React from 'react';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};


export default function ShopProductCard({ product }) {
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

  function renderDescript(consommabes){
    return(
      <Typography>
        {consommabes&&consommabes.map((c, i) => 
           <span key={c.id}>{"- "+c.description} <br/> </span>
        )}
        {consommabes.length > 1 &&
            <span onClick={() =>setShowMore(!showMore)} style={{color: "blue", cursor: 'pointer'}} >Voir moins</span>
          }
      </Typography>
    ) 
  }
  const colors = ['#00AB55']
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
          <Label
            variant="filled"
            color={(status.task_name === 'annuler' && 'error') || (status.task_name === 'livre' && 'success') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              left: 4,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status.name}
          </Label>

        {status && (
          <Label
            variant="filled"
            color={(status.task_name === 'annuler' && 'error') || (status.task_name === 'livre' && 'success') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status.name}
          </Label>
        )}
        <ProductImgStyle alt={name} src={consommabes&&consommabes.length>0&&(imageBase+consommabes[0].picture)} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>

        <Typography variant="subtitle2" noWrap>
          {name} {" ("+quantity+")"}
        </Typography>
        {!showMore?
          <Typography>
            {consommabes&&consommabes.length>0&&'- '+consommabes[0].description}
            <br/>
            {consommabes.length > 1 &&
              <span onClick={() =>setShowMore(!showMore)} style={{color: "blue", cursor: 'pointer'}} >Voir plus</span>
            }
          </Typography> 
          :
          renderDescript(consommabes)
        }
              

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  // textDecoration: 'line-through'
                }}
              >
                {price}
              </Typography>
              &nbsp;
              FCFA
            </Typography>
            <OrderMoreMenu order={product} />
        </Stack>
      </Stack>
    </Card>
  );
}
