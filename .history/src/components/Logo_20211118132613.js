import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src="https://console.acesy.net/static/media/Primary%20Logo.cd936fd5.png" sx={{ width: 40, height: 40, ...sx }} />;
}
