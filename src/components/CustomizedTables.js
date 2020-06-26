import React from 'react';
import { useSelector } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);





const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
    const roundToTwo = (num) => +(Math.round(num + "e+2") + "e-2");
    const invoices = useSelector(state => state)
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
                  <TableRow>
            <StyledTableCell>Invoice No:</StyledTableCell>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell align="right">Street&nbsp;address</StyledTableCell>
            <StyledTableCell align="right">Zip</StyledTableCell>
            <StyledTableCell align="right">City&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Due&nbsp;date</StyledTableCell>
            <StyledTableCell align="right">Total Amount&nbsp;€</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
              <StyledTableRow key={invoice.name}>
                  <StyledTableCell component="th" scope="row">
                {invoice.id}
              </StyledTableCell>
                  
              <StyledTableCell component="th" scope="row">
                {invoice.name}
              </StyledTableCell>
              <StyledTableCell align="right">{invoice.street}</StyledTableCell>
              <StyledTableCell align="right">{invoice.zip}</StyledTableCell>
              <StyledTableCell align="right">{invoice.city}</StyledTableCell>
                  <StyledTableCell align="right">{invoice.due_date}</StyledTableCell>
                 
              <StyledTableCell align="right">{roundToTwo(invoice.rows.map(row => row.quantity * row.unit_price).reduce((a,b) => a+b )) }</StyledTableCell>

                
               
             

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}