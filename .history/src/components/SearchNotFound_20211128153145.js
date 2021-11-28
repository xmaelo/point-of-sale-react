import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Aucune donnée
      </Typography>
      <Typography variant="body2" align="center">
        Aucun resultat trouvé pour &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Réessayer avec l'orthographe complète.
      </Typography>
    </Paper>
  );
}
