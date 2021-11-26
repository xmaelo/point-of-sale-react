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

//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

import { OrderMoreMenu } from '../user';

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

  let name = ""
  let description = ""
  console.log('consommabes&consommabes[0].picture', consommabes)
  consommabes&& consommabes.map(c => {
    if(name === ""){
      name = c.name
      description = c.description
    }else{
      name = name + " + " +c.name
      description = description + "\n" +c.description
    }
  })
  const colors = ['#00AB55']
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
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
        <ProductImgStyle alt={name} src={consommabes&&consommabes.length>0&&consommabes[0].picture} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography variant="subtitle2" noWrap>
          {name} {" (fois "+quantity+")"}
          </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {description}
            </Typography>
          </AccordionDetails>
        </Accordion>
            

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <OrderMoreMenu />
            {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)} */}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
