'use client';
import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';


export default function TableNoData({ query, colSpan }: any) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan} sx={{ py: 10 }}>
        <Paper
          sx={{
            textAlign: 'center',
            boxShadow: 'none',
          }}
        >
          <Typography variant="h5" paragraph style={{ fontFamily: 'inherit'}}>
            Not data found!
          </Typography>

          {query !== '' && <Typography variant="body2" style={{ fontFamily: 'inherit'}}>
            No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
          </Typography>}
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
  colSpan: PropTypes.number
};
